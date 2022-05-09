export async function delay(f:()=>void,time) {
    return new Promise((resolve,reject) => {
        try {
            setTimeout(() => {
                resolve(f())
            },time)
        } catch (err) {
            reject(err)
        }
    })
}