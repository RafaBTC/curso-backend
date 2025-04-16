const http = require('http')
const fs = require('fs')
const desiredPort = process.env.PORT ?? 3000

const server = http.createServer((req, res) => {
  console.log('Request received:', req.url)
  res.setHeader('Content-Type', 'text/plain; charset=utf-8')

  if (req.url === '/') {
    res.end('Bienvenido a mi página de Inicio!')
  } else if (req.url === '/ratchet.png') {
    fs.readFile('./assets/ratchet.jpg', (err, data) => {
      if (err) {
        res.statusCode = 500
        res.end('<h1>Internal Server Error</h1>')
      } else {
        res.setHeader('Content-Type', 'image/jpg')
        console.log('Image:', data)
        res.end(data)
      }
    })
  } else if (req.url === '/contacto') {
    res.end('Bienvenido a mi página de contacto!')
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' })
    res.end('404 Not Found')
  }
})

server.listen(desiredPort, () => {
  console.log(`Server is running on port http://localhost:${desiredPort}`)
})
