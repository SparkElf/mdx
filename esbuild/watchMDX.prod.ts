//给nodemon启动用
import nodemon from "nodemon";

import esbuild from 'esbuild'
import mdx from '@mdx-js/esbuild'
import { basename } from "path";
nodemon(
    {
        "watch": [
            "src"
        ],
        "ext": "mdx"
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
        loader: {
            '.tsx': 'tsx'
        },
        absWorkingDir: process.cwd(),
        jsxFactory: 'React.createElement',
        jsxFragment: 'React.Fragment',
        plugins: [mdx({})]
    })
})//不要从命令行启动nodemon，yarn nodemon会运行package.json中指定的入口文件main:index.js