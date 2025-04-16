import { platform, version, arch, cpus, totalmem, freemem, uptime } from 'node:os'

console.log('Información del sistema operativo:')
console.log('-------------------------------\n')

console.log('Nombre del sistema operativo: ', platform())
console.log('Versión del sistema operativo: ', version())
console.log('Arquitectura: ', arch())
console.log('CPUs:', cpus().length)
console.log('Memoria total: ', totalmem() / 1024 / 1024 / 1024, 'GB')
console.log('Memoria libre: ', freemem() / 1024 / 1024 / 1024, 'GB')
console.log('Tiempo activo', uptime() / 60 / 60, 'horas')
console.log('\n-------------------------------\n')
