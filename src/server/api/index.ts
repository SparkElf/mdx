import Router from "koa-router";
import { AssetsAPI } from "./assets";
import { ModleAPI } from "./model";
import { PageAPI } from "./page";
/**
 *  NOTE:路径都小写，因为反射用到的框架，实体名称默认小写
 */
const API = new Router()
API.use('/api',
    AssetsAPI.routes(), AssetsAPI.allowedMethods(),
    PageAPI.routes(), PageAPI.allowedMethods(),
    ModleAPI.routes(), ModleAPI.allowedMethods(),

)
export default API