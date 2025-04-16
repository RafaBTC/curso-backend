const fs = require('node:fs')

console.log('Leyendo archivo...')

fs.readFile('./archivo.txt', 'utf-8', (err, text) => {
  if (err) {
    console.log('Error leyendo archivo 2', err)
    return
  }
  console.log(text)
})

console.log('haciendo otra cosa...')

console.log('Leyendo archivo 2...')

fs.readFile('./archivo2.txt', 'utf-8', (err, text) => {
  if (err) {
    console.log('Error leyendo archivo 2', err)
    return
  }
  console.log(text)
})
