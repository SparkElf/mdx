import axios from 'axios';
import FormData from 'form-data';
import { readFileSync, unlinkSync } from "fs";
import { delay } from '../../src/util/promise';
import { expect, test } from "vitest";
test('upload article', async () => {
    const file = readFileSync("./.env")
    const form = new FormData()
    form.append('file', file, {
        filename: `-1.js`
    })
    const res=await axios.post('http://localhost:6009/api/file/article/upload', form, {
        headers: {
            'Content-Type': `multipart/form-data;boundary=${form.getBoundary()}` ,//https://stackoverflow.com/questions/60629800/nodejs-handle-and-send-multipart-request formboundary
            'Content-Length':form.getLengthSync()//
        } 
    })
    console.log(res.data.src)
    expect(`http://localhost:6009/static/md/test/1.js`, res.data.src)
    await delay(()=> unlinkSync('./static/article/-1.js'),2000)
})