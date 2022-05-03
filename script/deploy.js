import { execSync } from "child_process";
import { readFileSync } from "fs";
const config=JSON.parse(readFileSync('config.json','utf-8'))
export const deploy = () => {
    //https://blog.csdn.net/fangye1/article/details/115837301
    //https://unix.stackexchange.com/questions/17466/how-to-delete-a-file-on-remote-machine-via-ssh-by-using-a-shell-script
    //https://superuser.com/questions/434870/what-is-the-windows-equivalent-of-the-unix-command-cat
    execSync(`ssh ${config.server.username}@${config.server.ip} "bash ${config.server.projectDir}/script/init.bash"`,{stdio:'inherit'})
    execSync(`scp -r ./static ${config.server.username}@${config.server.ip}:${config.server.projectDir}`,{stdio:'inherit'})
    execSync(`scp ./build/server.js ${config.server.username}@${config.server.ip}:${config.server.projectDir}`,{stdio:'inherit'})
}
deploy()
