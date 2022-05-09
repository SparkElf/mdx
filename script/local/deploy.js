import { execSync } from "child_process"
import { readFileSync } from "fs"


const exec = (cmd="") => execSync(cmd,{stdio:'inherit'})

const config=JSON.parse(readFileSync('config/config.json','utf-8'))

const cmds = [
    "git add .",
    `git commit -m "deploy"`,
    "git push -u origin master",
    `scp .env ${config.server.username}@${config.server.ip}:${config.server.projectDir}`,
    `scp config/config.json ${config.server.username}@${config.server.ip}:${config.server.projectDir}/config`
    //`ssh ${config.server.username}@${config.server.ip} "bash ${config.server.projectDir}/script/server/deploy.bash"`
]
for (let cmd of cmds)exec(cmd)