import formidable from "formidable";
import IncomingForm from "formidable/Formidable";
import { IncomingMessage } from "http";

export async function parseForm(req:IncomingMessage,form:IncomingForm):Promise<{fields:formidable.Fields,files:formidable.Files}> {
    return new Promise((resolve, reject) => {
        form.parse(req, async (err, fields, files) => {//https://github.com/node-formidable/formidable/issues/600
            if (err) reject(err)
            resolve({fields,files})
        })
    })
}