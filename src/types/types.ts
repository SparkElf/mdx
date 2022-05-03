export interface Config {
    project: {
        workDir: string
    }
    server: {
        ip: string
        port: number
        username: string
        projectDir: string
    }
}