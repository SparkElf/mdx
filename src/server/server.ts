import Koa from 'koa'
import Logger from 'koa-logger'; //https://github.com/koajs/logger
import Mount from 'koa-mount'
import Static from 'koa-static'
import API from './api'
import { config, initConfig } from './context/context'

console.log(process.argv[2])
initConfig(process.argv[2])

const app = new Koa()//https://stackoverflow.com/questions/43160598/adding-properties-to-koa2s-context-in-typescript
app
    .use(Logger())
    .use(async (ctx, next) => {//cors
        ctx.set('Access-Control-Allow-Origin', '*');
        ctx.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
        ctx.set('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
        await next()//是必须的，不然中间件没来得及处理整个工作流就过早结束导致404
    })
    .use(API.routes())
    .use(API.allowedMethods())
    .use(Mount('/static', Static("./static")))//必须加.
    .use(Mount('/static/shiki',Static('./node_modules/shiki')))//https://github.com/shikijs/shiki/issues/216

await app.listen(config.server.port)//6000是x11端口被谷歌禁止

console.log(`server start at http://${config.server.ip}:${config.server.port}`)