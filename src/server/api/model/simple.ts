import koaBody from 'koa-body'
import Router from 'koa-router'
import { Int } from 'src/util/number'
import { prisma } from '../../context/context'
//TODO - 为前端接口提供良好的prisma scheme支持 当然过分开放API能力会导致安全问题
const SimpleAPI = new Router()
const BaseRoute = new Router()
const FormatParams: (ReturnType<typeof BaseRoute.middleware>) = async (ctx, next) => {
    if (prisma[ctx.params.type] === undefined) {
        ctx.status = 400
        return {}
    }

    await next()//把当前的ctx传递
}
BaseRoute
    .post('/get/:id', async (ctx, next) => {
        const { type, id } = ctx.params
        const { select } = ctx.request.body
        const db = prisma[type] as typeof prisma.virtualTable
        const res = await db.findUnique({
            where: {
                id: Int(id)
            },
            select: select
        })
        ctx.body = res
    })
    //TODO - 权限管理
    .post('/add', async (ctx, next) => {
        console.log(ctx)
        const { type } = ctx.params
        const db = prisma[type] as typeof prisma.virtualTable
        const data = ctx.request.body
        ctx.body = `add ${ctx.params.type} successfully`
        try {
            if (Array.isArray(data))
                await db.createMany({
                    data: ctx.request.body,
                    skipDuplicates: true
                })
            else
                await db.create({ data: data })
        }
        catch (err) {
            ctx.body = err
            ctx.status = 500
        }
    })
    .post('/update/:id', async (ctx, next) => {
        const { type, id } = ctx.params
        const db = prisma[type] as typeof prisma.virtualTable
        ctx.body = `update ${ctx.params.type} ${ctx.params.id} successfully`
        await db.update({
            where: {
                id: Int(id)
            },
            data: ctx.request.body
        }).catch(err => {
            ctx.body = err
            ctx.status = 500
        })
    })
    .post('/delete/:id', async (ctx, next) => {
        const { type, id } = ctx.params
        const db = prisma[type] as typeof prisma.virtualTable
        ctx.body = `delete ${ctx.params.type} ${ctx.params.id} successfully`
        await db
            .delete({
                where: {
                    id: Int(id)
                }
            })
            .catch(err => {
                ctx.body = err
                ctx.status = 500
            })
    })
SimpleAPI
    .use(koaBody())
    .use('simple/:type',
        FormatParams,
        BaseRoute.routes(), BaseRoute.allowedMethods()
    )

export { SimpleAPI }

