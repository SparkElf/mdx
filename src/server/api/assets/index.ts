import formidable, { File } from 'formidable'
import { existsSync, renameSync } from 'fs'
import Router from 'koa-router'
import { extname } from 'path'
import { cwd } from 'process'
import { prisma, serverURL } from 'src/server/context/context'

const AssetsAPI = new Router<{
    fields: formidable.Fields
    files: formidable.Files
    count: number
}>()

//嵌套路由 https://github.com/koajs/router/blob/master/API.md#nested-routers
AssetsAPI.//NOTE -  multipart的支持不友好，所以控制参数只能写在url中 或者用文件名控制
    post('/upload/image',
        async (ctx, next) => {
            console.log(ctx.header['content-type'])
            const dir = process.cwd() + '/static/image/raw/'
            ctx.body = []
            const form = formidable({
                hashAlgorithm: 'md5',
                uploadDir: dir,
                filter: part => {
                    const fileName = part.originalFilename
                    let ext=fileName.substring(fileName.indexOf('.'))
                    if ( ext!== '.jpeg'&& ext!== '.jpg' &&ext!=='.png' && ext!=='.webp') {
                        ctx.body.push({ data: "file:" + fileName + " ext not supports" })
                        ctx.status=415
                        return false

                    }
                    console.log(dir + fileName)
                    if (existsSync(dir + fileName)) {
                        ctx.body.push({ msg: "file already existsSync",src:`${serverURL()}/static/image/raw/`+fileName})
                        return false
                    }
                    return true
                },
            })
            await new Promise((resolve, reject) => {
                form.parse(ctx.req, async (err, fields, files) => {//https://github.com/node-formidable/formidable/issues/600
                    if (err) {
                        console.log(err)
                        return;
                    }
                    ctx.state.fields = fields
                    ctx.state.files = files
                    if (Array.isArray(files.file)) {
                        for (let i = 0; i < files.file.length; i++) {
                            const file = files.file[i]
                            file.newFilename = file.hash + extname(file.originalFilename)
                            renameSync(file.filepath, dir + file.newFilename)
                            ctx.state.count++
                            ctx.body.push({ src: `${serverURL()}/static/image/raw/` + file.newFilename })
                            await prisma.image.create({
                                data: {
                                    src: `${serverURL()}/static/image/raw/` + file.newFilename
                                }
                            })
                        }
                    } else if (files.file) {
                        const file = files.file
                        file.newFilename = file.hash + extname(file.originalFilename)
                        renameSync(file.filepath, dir + file.newFilename)
                        ctx.state.count++
                        ctx.body.push({ src: `${serverURL()}/static/image/raw/` + file.newFilename })
                        await prisma.image.create({
                            data: {
                                src: `${serverURL()}/static/image/raw/`+ file.newFilename
                            }
                        })

                    }
                    resolve(null)
                })
            })
            await next()
        })
    .post('/upload/article',
        async (ctx, next) => {
            const dir =cwd() + '/static/article/'
            const form = formidable({
                hashAlgorithm: 'md5',
                uploadDir: dir,
                multiples:true,
                filter: part => {
                    const fileName = part.originalFilename
                    console.log(fileName)
                    if (fileName.substring(fileName.indexOf('.')) !== '.js') {
                        ctx.body.push({ data: "file:" + fileName + " ext not supports" })
                        ctx.status=415
                        return false
                    }
                    console.log(dir + fileName)
                    if (existsSync(dir + fileName)) {
                        ctx.body.push({ msg: "file already existsSync",src:`${serverURL()}/static/article/`+fileName})
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
                        ctx.status=500
                        return;
                    }
                    if (files.file) {
                        const file = files.file as File
                        const meta = JSON.parse(fields.meta as string)
                        file.newFilename = `${meta.directory}_${file.hash}.js`//NOTE:防止哈希伪造
                        renameSync(file.filepath, dir + file.newFilename)
                        const src = `${serverURL()}/static/article/${file.newFilename}`
                        ctx.body = { src }
                        await prisma.article.create({//https://www.prisma.io/docs/reference/api-reference/prisma-client-reference#connectorcreate
                            data: {
                                title: meta.title,
                                tags: {
                                    connectOrCreate: meta.tags.map(item => {
                                        return {
                                            create: {
                                                name:item
                                            },
                                            where: {
                                                name:item
                                            }
                                       }
                                    })
                                },
                                content: src,
                                cover:meta.cover,
                                brief: meta.brief,
                                readTime:meta.readTime,
                                author: {
                                    create: {
                                        name:meta.name,
                                        website: meta.website,
                                        profile:meta.profile
                                    }
                                }
                            }
                        })

                    }
                    resolve(null)
                })
            })
            await next()
        })

export { AssetsAPI }

