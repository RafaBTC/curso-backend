// solo en los modulos nativos que no tienen promesas
// const { promisify } = require('node:util')
// const readFilePromise = promisify(fs.readFile);
import { readFile } from 'node:fs/promises'

console.log('Leyendo archivo...')
const text = await readFile('./archivo.txt', 'utf-8')
console.log('primer texto:', text)

console.log('haciendo otra cosa...')

console.log('Leyendo archivo 2...')
const secondText = await readFile('./archivo2.txt', 'utf-8')
console.log('segundo texto:', secondText)
