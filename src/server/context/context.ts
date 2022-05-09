import Prisma from '@prisma/client'
import { readFileSync } from 'fs'
const { PrismaClient } = Prisma//https://github.com/prisma/prisma/pull/4920
import algoliasearch, { SearchClient, SearchIndex } from 'algoliasearch'
//base
type Config = {
    server: {
        ip: string
        username: string
        projectDir: string//根目录为/home/username
        port:number
    },
    algolia:{
    appID: string
    adminKey:string
    }
}
export let config: Config
export function initConfig(env: string) {
    config = JSON.parse(readFileSync(process.cwd() + '/config/config.json', 'utf-8'))
    if (env === '--dev') config.server.ip = 'localhost'
    global.config = config
    algoliaClient = algoliasearch(config.algolia.appID, config.algolia.adminKey)
    articleIndex=algoliaClient.initIndex('article')
}
export function serverURL() {
    return `http://${global.config.server.ip}:${global.config.server.port}`
}

//prisma
export const prisma = new PrismaClient({
    log: ['query', 'info', 'warn', 'error'],
})

//algolia
export let algoliaClient:SearchClient
export let articleIndex:SearchIndex








