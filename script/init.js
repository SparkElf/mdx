import esbuild from 'esbuild'
//esbuild代替tsc会更快
esbuild.buildSync({
    entryPoints: ['script/index.ts'],
    outdir: 'build/script',
    bundle: true,
    format: 'esm',
    minify: true,
    platform: 'node',
    logLevel: 'info',
    loader: {
        '.sh': 'file',
        '.bash': 'file',
        '.ps1': 'file'
    },
    publicPath: 'C:/Users/37465/Desktop/project/mdx/build/script',
    external: ['./node_modules/*']//https://esbuild.github.io/getting-started/#bundling-for-node
})