// argumentos de entrada a la hora de ejecutar nuestro proceso

console.log(process.argv)

// directorio de trabajo actual
console.log(process.cwd())

// controlar el proceso y su salida
// process.exit(1);

// controlar eventos del proceso
process.on('exit', () => {
  // limpiar los recursos
})

// platform
console.log(process.platform)

// version
console.log(process.version)

// memoria
console.log(process.memoryUsage())

// variables de entorno
console.log(process.env)
