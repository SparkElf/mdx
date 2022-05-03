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
                "src/mdx",
                "src/components"
            ],
            "exec": "yarn server-build && node ./build/server.js --dev"
        }
    )
}
watchServer()