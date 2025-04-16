// solo en los modulos nativos que no tienen promesas
// const { promisify } = require('node:util')
// const readFilePromise = promisify(fs.readFile);
const fs = require('node:fs/promises')

console.log('Leyendo archivo...')
fs.readFile('./archivo.txt', 'utf-8')
  .then(text => {
    console.log(text)
  })
  .catch(err => {
    console.log('Error leyendo archivo', err)
  })

console.log('haciendo otra cosa...')

console.log('Leyendo archivo 2...')
fs.readFile('./archivo2.txt', 'utf-8')
  .then(text => {
    console.log(text)
  })
  .catch(err => {
    console.log('Error leyendo archivo 2', err)
  })
