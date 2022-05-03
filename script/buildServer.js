import esbuild from 'esbuild'

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
        external:['/node_modules/*'],
        platform: 'node',
        logLevel: 'info',
    })
}
buildServer()
