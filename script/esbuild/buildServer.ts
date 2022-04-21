import esbuild from 'esbuild'


/*
//获取目录下所有mdx文件的文件名
import { readdirSync, statSync } from "fs";
import path from 'path'
function getAllMDXFileName(filePath: string) {//缺点是不允许重名
    const names = readdirSync(filePath)
    let mdxNames = []
    names.forEach(name => {
        let stat = statSync(path.join(filePath, name))

        if (stat.isFile()) {
            //从最后一个点开始截取文件名
            let index = name.length - 1
            while (name[index] !== '.' && index >= 0) index--
            //获取后缀名
            if (name.substring(index, name.length) === '.mdx')
                mdxNames.push(name.substring(0, index))
        }
        else {
            mdxNames.concat(mdxNames, getAllMDXFileName(path.join(filePath, name)))
        }
    })
    return mdxNames
}
let names = getAllMDXFileName('src')
*/
export const buildServer = () => {
    esbuild.build({
        entryPoints: [`src/server/server.ts`],
        outfile: `build/server.js`,
        "bundle": true,//打包import而不是只编译单个文件
        "minify": true,
        legalComments: "none",
        format: 'esm',
        loader: {
            '.ts': 'ts'
        },
        platform: 'node',
        logLevel: 'info',
        external: ['./node_modules/*']
    })
}
