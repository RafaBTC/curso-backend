const path = require('node:path')

// barra separadora segun el OS
console.log(path.sep)

// unir rutas con path.join
const filePath = path.join('content', 'subfolder', 'test.txt')
console.log(filePath)

// obtener el nombre del fichero con path.basename
const file = path.basename('/tmp/carpeta/archivo.txt')
console.log(file)

// obtener extension del archivi

const extension = path.extname('/tmp/carpeta/archivo.txt')
console.log(extension)
