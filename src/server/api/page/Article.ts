import Router from "koa-router";
import { prisma } from "src/server/context/context";

const Article = new Router()
Article
    .post('/article/article', async (ctx, next) => {
        const { id } = ctx.request.body
        const res = await prisma.article.findUnique({
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
            },
            where: {
                id
            }
        })
        res.tags=res.tags.map(item=>item.name) as any
        ctx.body = res
    })
export default Article
