import { exec, execSync } from "child_process";
import { readFileSync } from "fs";
import { execX } from "src/util/cmd";
import { config } from "src/server/context/context";
export const deploy = () => {

    //https://blog.csdn.net/fangye1/article/details/115837301
    //https://unix.stackexchange.com/questions/17466/how-to-delete-a-file-on-remote-machine-via-ssh-by-using-a-shell-script
    //https://superuser.com/questions/434870/what-is-the-windows-equivalent-of-the-unix-command-cat
    execX(`ssh ${config.server.username}@${config.server.ip} "bash ${config.server.projectDir}/script/init.bash"`)
    execX(`scp -r ./static ${config.server.username}@${config.server.ip}:${config.server.projectDir}`)
    execX(`scp ./build/server.js ${config.server.username}@${config.server.ip}:${config.server.projectDir}`)
}



