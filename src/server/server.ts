import Koa from 'koa'
import Static from 'koa-static'
import Logger from 'koa-logger'//https://github.com/koajs/logger
import Mount from 'koa-mount'
import Body from 'koa-body'
import { API } from './api'

const app = new Koa()//https://stackoverflow.com/questions/43160598/adding-properties-to-koa2s-context-in-typescript
app
    .use(Logger())
    .use(Body())//如果不使用则需要自己捕获流 已经提供内容协商和自动序列化
    .use(async (ctx, next) => {//cors
        ctx.set('Access-Control-Allow-Origin', '*');
        ctx.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
        ctx.set('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
        await next()//是必须的，不然中间件没来得及处理整个工作流就过早结束导致404
    })
    .use(API.routes())
    .use(API.allowedMethods())
    .use(Mount('/static', Static("/static")))


await app.listen(6000)

console.log('server start at http://localhost:6000')