import Router from "koa-router";
import { prisma } from "src/server/context/context";

const Home = new Router()
Home
    .post('/home/article_board', async (ctx, next) => {
        const { take, skip } = ctx.request.body
        const res = await prisma.article.findMany({
            take: take,
            skip: skip,
            select: {
                id: true,
                title: true,
                tags: {
                    select: {
                        name:true
                    }
                },
                brief: true,
                content: true,
                cover:true,
                author: {
                    select: {
                        id: true,
                        name: true,
                        avatar: true
                    }
                },
                readTime: true,
            }
        })
        for (let i = 0; i < res.length; i++){
            res[i].tags=res[i].tags.map(item=>item.name)as any
        }
        ctx.body = res
    })
    .post('/home/image_board', async (ctx, next) => {
        const { take, skip, orderBy, where } = ctx.request.body
        const res = await prisma.image.findMany({
            take,
            skip,
            orderBy,
            where
        })
        console.log(res)
        ctx.body = res
    })
export default Home
