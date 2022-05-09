import Router from "koa-router";
import { prisma } from "src/server/context/context";

const Article = new Router()
Article
    .post('/article/getArticle', async (ctx, next) => {
        const { id } = ctx.request.body
        const res = await prisma.article.findUnique({
            include: {
                author: true,
                tags:true
            },
            where: {
                id
            },
        })//记录不存在返回null
        if (res) {
            prisma.article.update({//异步，不使用await,结果无关紧要
                where: {
                    id
                },
                data: {
                    views:res.views+1
                }
            })
        }
        res.tags=res.tags.map(item=>item.name) as any
        ctx.body = res
    })
export default Article
