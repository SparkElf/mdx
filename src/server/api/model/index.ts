import koaBody from 'koa-body'
import Router from 'koa-router'
import { ArticleAPI } from './article'
import { GraphAPI } from './graph'
import { SimpleAPI } from './simple'

const ModleAPI = new Router()

//嵌套路由 https://github.com/koajs/router/blob/master/API.md#nested-routers
ModleAPI.use('/model',
    ArticleAPI.routes(),ArticleAPI.allowedMethods(),
    GraphAPI.routes(), GraphAPI.allowedMethods(),
    SimpleAPI.routes(), SimpleAPI.allowedMethods()
)
export { ModleAPI }

