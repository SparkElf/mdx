import koaBody from 'koa-body'
import Router from 'koa-router'
import { prisma } from 'src/server/context/context'

const GraphAPI = new Router()
const Post = new Router()//嵌套路由 https://github.com/koajs/router/blob/master/API.md#nested-routers

Post
    .post('get/post', async (ctx, next) => {
        const body = ctx.request.body
        const res = await prisma.article.findMany(body)
        ctx.body = res
    })
    .post('add/post', async (ctx, next) => {
        const body = ctx.request.body
        const res = await prisma.article.create(body)
        ctx.body = res
    })

GraphAPI.use('graph',
    koaBody(),
    Post.routes(), Post.allowedMethods()
)
export { GraphAPI }

