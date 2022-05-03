import koaBody from 'koa-body'
import Router from 'koa-router'
import Article from './Article'
import Home from './Home'


const PageAPI = new Router()

//嵌套路由 https://github.com/koajs/router/blob/master/API.md#nested-routers
PageAPI.use('/page',
    koaBody(),
    Home.routes(), Home.allowedMethods(),
    Article.routes(),Article.allowedMethods()
)
export { PageAPI }

