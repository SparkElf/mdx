import Koa from 'koa'
import Static from 'koa-static'
import Logger from 'koa-logger'//https://github.com/koajs/logger
import Mount from 'koa-mount'
import Body from 'koa-body'
import API from './api'
import { readFileSync } from 'fs'
import { Config } from 'src/types/types'

const config: Config = JSON.parse(readFileSync(process.cwd() + '/config.json', 'utf-8'))
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

console.log('server start at http://localhost:' + config.server.port)