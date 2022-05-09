//给nodemon启动用
import nodemon from "nodemon";

export const watchServer = () => {
    nodemon(
        {
            "watch": [
                "src"
            ],
            "ext": "ts,json",
            "ignore": [
                "test"
            ],
            "exec": "yarn build --dev && node ./build/server.js --dev"
        }
    )
}
watchServer()