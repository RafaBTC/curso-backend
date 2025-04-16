const fs = require('node:fs/promises')
const path = require('node:path')
const pico = require('picocolors')

const folder = process.argv[2] ?? '.' // Si no se pasa un argumento, se usa el directorio actual

async function ls (directory) {
  let files = []
  try {
    files = await fs.readdir(directory)
  } catch {
    console.error(pico.red(`No se pudo leer el directorio ${directory}`))
    process.exit(1)
  }

  const filesPromises = files.map(async file => {
    const filePath = path.join(directory, file)
    let stats
    try {
      stats = await fs.stat(filePath) // información del archivo
    } catch {
      console.error(`No se pudo leer el archivo ${filePath}`)
      process.exit(1)
    }

    const isDirectory = stats.isDirectory()
    const fileType = isDirectory ? pico.yellow('D:') : pico.cyan('A:')
    const fileSize = stats.size.toString()
    const fileModified = stats.mtime.toLocaleString()

    return `${fileType} ${pico.blue(file.padEnd(30))} ${pico.magenta(
      fileSize.padStart(10)
    )} ${pico.green(fileModified)}`
  })

  const filesInfo = await Promise.all(filesPromises)
  console.log(pico.bgGreen(`\nContenido del directorio "${directory}":\n`))
  console.log(pico.red('----------------------------------'))
  filesInfo.forEach(info => {
    console.log(info)
  })
  console.log(pico.red('----------------------------------'))
}

ls(folder)
