//编码相关，解决nodejs exec 中文乱码问题 https://stackoverflow.com/questions/20731785/wrong-encoding-when-using-child-process-spawn-or-exec-under-windows
import { ChildProcess, exec, ExecException } from 'child_process';
import iconv from 'iconv-lite'
const encoding = 'cp936';
const binaryEncoding = 'binary';

function iconvDecode(str) {
    if (str == null) return null
    return iconv.decode(Buffer.from(str, binaryEncoding), encoding);
}
//TODO - 优化参数
export function execX(command: string, callback?: (error: ExecException | null, stdout: string, stderr: string) => void): ChildProcess {
    return exec(command, {
        encoding: 'binary',
        shell: 'powershell.exe'
    }, (err, out) => {
        console.log(err)
        if (err)
            console.log(iconvDecode(err.message))
        console.log(iconvDecode(out))
    })
}