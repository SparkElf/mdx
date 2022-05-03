import Prisma from '@prisma/client'
import { readFileSync } from 'fs'
const { PrismaClient } = Prisma//https://github.com/prisma/prisma/pull/4920
export const prisma = new PrismaClient({
    log: ['query', 'info', 'warn', 'error'],
})
type Config = {
    project: {
        workDir: string//absolute path of project root ,stuff like cwd
    }
    server: {
        ip: string
        username: string
        projectDir: string//根目录为/home/username
        port:number
    }
}
const dir = process.cwd()
export let config: Config
export function initConfig(env: string) {
    config=JSON.parse(readFileSync(dir + '/config.json', 'utf-8'))
    if (env === '--dev') config.server.ip = 'localhost'
    global.config = config
}
export function serverURL() {
    return `http://${global.config.server.ip}:${global.config.server.port}`
}