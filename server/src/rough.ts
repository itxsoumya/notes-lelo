import fs from 'fs'


const fileBuffer = fs.readFileSync('./utils/pdf-test.pdf')
const filestr = fileBuffer.toString('base64url')
console.log(filestr)