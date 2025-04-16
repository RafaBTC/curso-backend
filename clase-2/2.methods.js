const http = require('node:http')
const ditto = require('./assets/pokemon/ditto.json')

const processRequest = (req, res) => {
  const { method, url } = req
  res.setHeader('Content-Type', 'text/plain; charset=utf-8')

  switch (method) {
    case 'GET':
      switch (url) {
        case '/pokemon/ditto':
          res.setHeader('Content-Type', 'application/json')
          return res.end(JSON.stringify(ditto))

        default:
          res.writeHead(404, { 'Content-Type': 'text/plain' })
          return res.end('404 Not Found')
      }

    case 'POST':
      switch (url) {
        case '/pokemon': {
          // escuchar el evento data
          let body = ''
          req.on('data', (chunk) => {
            body += chunk.toString()
          })

          req.on('end', () => {
            const data = JSON.parse(body)
            console.log('cuerpo', body)
            console.log('data', data)
            res.writeHead(201, { 'Content-Type': 'application/json; charset-utf' })
          })
          return
        }
        default:
          res.writeHead(404, { 'Content-Type': 'text/plain' })
          return res.end('404 Not Found')
      }

    default:
      res.writeHead(404, { 'Content-Type': 'text/plain' })
      return res.end('404 Not Found')
  }
}

const server = http.createServer(processRequest)

server.listen(3000, () => {
  console.log('Server is running on port http://localhost:3000')
})
