//给nodemon启动用
import nodemon from "nodemon";

import esbuild from 'esbuild'
import mdx from '@mdx-js/esbuild'
import { basename } from "path";
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
            "exec": "yarn server-build && node build/server.js "
        }
    )
}
