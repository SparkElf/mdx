
import formidable, { File } from 'formidable'
import { existsSync, renameSync } from 'fs'
import koaBody from 'koa-body'
import Router from 'koa-router'
import { cwd } from 'process'
import { articleIndex, prisma, serverURL } from '../../context/context'

const ArticleAPI = new Router()
ArticleAPI
    .post('/article/add',
        async (ctx, next) => {
            const dir = cwd() + '/static/article/'
            const form = formidable({
                hashAlgorithm: 'md5',
                uploadDir: dir,
                multiples: true,
                filter: part => {
                    const fileName = part.originalFilename
                    console.log(fileName)
                    if (fileName.substring(fileName.indexOf('.')) !== '.js') {
                        ctx.body={ data: "file:" + fileName + " ext not supports" }
                        ctx.status = 415
                        return false
                    }
                    console.log(dir + fileName)
                    if (existsSync(dir + fileName)) {
                        ctx.body={ msg: "file already existsSync", src: `${serverURL()}/static/article/` + fileName }
                        return false
                    }
                    return true ////
                },
            })
            await new Promise((resolve, reject) => {
                form.parse(ctx.req, async (err, fields, files) => {//https://github.com/node-formidable/formidable/issues/600
                    if (err) {
                        console.log(err)
                        ctx.body = err
                        ctx.status = 500
                        return;
                    }
                    if (files.file) {
                        const file = files.file as File
                        const meta = JSON.parse(fields.meta as string)
                        file.newFilename = `${meta.directory}_${file.hash}.js`//NOTE:防止哈希伪造
                        renameSync(file.filepath, dir + file.newFilename)
                        const src = `${serverURL()}/static/article/${file.newFilename}`
                        ctx.body = { src }
                        const res=await prisma.article.create({//https://www.prisma.io/docs/reference/api-reference/prisma-client-reference#connectorcreate
                            data: {
                                title: meta.title,
                                tags: {
                                    connectOrCreate: meta.tags.map(item => {
                                        return {
                                            create: {
                                                name: item
                                            },
                                            where: {
                                                name: item
                                            }
                                        }
                                    })
                                },
                                content: src,
                                cover: meta.cover,
                                brief: meta.brief,
                                readTime: meta.readTime,
                                author: {
                                    connectOrCreate: {
                                        create: {
                                            name: meta.author.name,
                                            website: meta.author.website,
                                            profile: meta.author.profile,
                                            avatar: meta.author.avatar
                                        },
                                        where: {
                                            id: meta.author.id
                                        }
                                    }
                                }
                            }
                        })
                        articleIndex.saveObject({
                            objectID: meta.id,
                            title: meta.title,
                            readTime: meta.readTime,
                            brief: meta.brief,
                            tags: meta.tags,
                            author: {
                                id: meta.author.id,
                                name: meta.author.name,
                                avatar:meta.author.avatar
                            }
                        })
                    }
                    resolve(null)
                })
            })
            await next()
        })
    .post('/article/get', koaBody(), async (ctx, next) => {
        const { id } = ctx.body
        const res = await prisma.article.findUnique({
            include: {
                author: true,
                tags:true
            },
            where: {
                id
            }
        })
        return res
    })
export { ArticleAPI }

