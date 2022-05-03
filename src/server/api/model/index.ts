import koaBody from 'koa-body'
import Router from 'koa-router'
import { GraphAPI } from './graph'
import { SimpleAPI } from './simple'

const ModleAPI = new Router()

//嵌套路由 https://github.com/koajs/router/blob/master/API.md#nested-routers
ModleAPI.use('/model',
    koaBody(),
    GraphAPI.routes(), GraphAPI.allowedMethods(),
    SimpleAPI.routes(), SimpleAPI.allowedMethods()
)
export { ModleAPI }

