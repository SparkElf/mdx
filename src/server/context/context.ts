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
    }
}
const dir = process.cwd()
export const config: Config = JSON.parse(readFileSync(dir + '/config.json', 'utf-8'))