import Router from 'koa-router'
import { GraphAPI } from './graph'
import { SimpleAPI } from './simple'

const API = new Router()

//嵌套路由 https://github.com/koajs/router/blob/master/API.md#nested-routers
API.use('/',
    GraphAPI.routes(), GraphAPI.allowedMethods(),
    SimpleAPI.routes(), SimpleAPI.allowedMethods()
)
export { API }

