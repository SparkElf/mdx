import Koa from 'koa'
import serve from 'koa-static'
import path from 'path'
import Cabin from 'cabin'
import mount from 'koa-mount'
const app = new Koa()
const cabin = new Cabin()
app.use(mount('/static', serve(path.resolve() + "\\static", {
    setHeaders(res) {
        res.setHeader('Access-Control-Allow-Origin', "http://localhost:9999")
    }
})))


app.use(cabin.middleware)
await app.listen(3000)

console.log('server start at http://localhost:3000')