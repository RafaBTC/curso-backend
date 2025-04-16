const http = require('http')
const { findAvailablePort } = require('./10.free-port')

const desiredPort = process.env.PORT ?? 3000
const server = http.createServer((req, res) => {
  console.log('Request received')
  console.log(req.url)

  res.writeHead(200, { 'content-type': 'text/plain' })
  res.end('Hello from the server!')
})

const executeServer = async port => {
  try {
    const availablePort = await findAvailablePort(port)
    console.log('port encontrado:', availablePort)
    server.listen(availablePort, () => {
      console.log(`Server is running on port http://localhost:${availablePort}`)
    })
  } catch (err) {
    console.error('Error al encontrar puerto:', err)
  }
}

executeServer(desiredPort)
