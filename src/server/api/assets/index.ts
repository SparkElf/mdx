import formidable, { File } from 'formidable'
import { existsSync, renameSync } from 'fs'
import Router from 'koa-router'
import { extname } from 'path'
import { cwd } from 'process'
import { prisma, serverURL } from '../../context/context'
import { parseForm } from '../../lib/formidable'


const AssetsAPI = new Router<{
    fields: formidable.Fields
    files: formidable.Files
    count: number
}>()

//嵌套路由 https://github.com/koajs/router/blob/master/API.md#nested-routers
AssetsAPI
    .post('/file/image/upload',
        async (ctx, next) => {
            console.log(ctx.header['content-type'])
            const dir = process.cwd() + '/static/image/raw/'
            ctx.body = []
            const form = formidable({
                hashAlgorithm: 'md5',
                uploadDir: dir,
                filter: part => {
                    const fileName = part.originalFilename
                    let ext = fileName.substring(fileName.indexOf('.'))
                    if (ext !== '.jpeg' && ext !== '.jpg' && ext !== '.png' && ext !== '.webp') {
                        ctx.body.push({ data: "file:" + fileName + " ext not supports" })
                        ctx.status = 415
                        return false

                    }
                    console.log(dir + fileName)
                    if (existsSync(dir + fileName)) {
                        ctx.body.push({ msg: "file already existsSync", src: `${serverURL()}/static/image/raw/` + fileName })
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
                                src: `${serverURL()}/static/image/raw/` + file.newFilename
                            }
                        })

                    }
                    resolve(null)
                })
            })
            await next()
    })
    .post('/file/article/upload', async (ctx, next) => {
        //TODO - 引入MD5 约定：multipart只上传文件，其他字段在param中传递
        const dir = cwd() + '/static/article/'
        const form = formidable({//哈希只在客户端做，服务端只定期清理非法文件
            uploadDir: dir,
            multiples: true,
            filename: (name, ext, part, form) => {
                return part.originalFilename
            }
        })
        await parseForm(ctx.req, form)
            .then(({ files }) => {
                if (files.file) {
                    const file = files.file as File
                    const src = `${serverURL()}/static/article/${file.originalFilename}`
                    ctx.body = { src }
                }
            })
            .catch(err => {
                ctx.body = err
                ctx.status = 500
            })
        await next()
    })


export { AssetsAPI }

