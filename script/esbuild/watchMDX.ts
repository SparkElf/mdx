//给nodemon启动用
import nodemon from "nodemon";

import esbuild from 'esbuild'
import mdx from '@mdx-js/esbuild'
import { basename } from "path";
//https://github.com/remy/nodemon/blob/main/doc/events.md#Using_nodemon_as_child_process
export const watchMDX = () => {
    nodemon(
        {
            "watch": [
                "src"
            ],
            "ext": "mdx,tsx,json",
            "ignore": [
                "src/server"
            ]
        }
    ).on('restart', (paths) => {
        console.log(paths)
        let filename = basename(paths[0])
        let index = filename.length - 1
        while (filename[index] !== '.' && index >= 0) index--
        esbuild.build({
            entryPoints: [`src/${filename}`],
            outfile: `static/${filename.substring(0, index)}.js`,
            "bundle": true,//打包外部依赖,
            //"external": ["react/jsx-runtime"],//不打包的依赖
            "minify": true,
            legalComments: "none",
            format: 'esm',
            plugins: [mdx({
            })]
        })
    })
}
