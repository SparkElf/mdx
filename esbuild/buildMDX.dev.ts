import esbuild from 'esbuild'
import mdx from '@mdx-js/esbuild'
const entryName = process.argv[2]
await esbuild.build({
    entryPoints: [`src/${entryName}.mdx`],
    outfile: `static/${entryName}.js`,
    "bundle": true,//打包外部依赖,
    //"external": ["react/jsx-runtime"],//不打包的依赖
    //"minify": true,
    legalComments: "none",
    format: 'esm',
    plugins: [mdx({

    })]
})