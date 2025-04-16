const ditto = require('./assets/pokemon/ditto.json')

const express = require('express')
const app = express()

const PORT = process.env.PORT ?? 1234
app.disable('x-powered-by') // Disable the 'X-Powered-By' header for security reasons
app.use(express.json()) // Middleware to parse JSON bodies

// Middlewares
// app.use((req, res, next) => {
//   console.log('mi primer middleware')
//   if (req.method !== 'POST') return next()
//   if (req.headers['content-type'] !== 'application/json') return next()

//   // solo llegan los post con content-type application/json y que son post
//   let body = ''

//   // escuchar el evento data
//   req.on('data', (chunk) => {
//     body += chunk.toString()
//   })

//   req.on('end', () => {
//     const data = JSON.parse(body)
//     // mutar la request y pasarla al body
//     req.body = data
//     next() // siempre llamar a next() para pasar al siguiente middleware o ruta
//   })
// })

app.get('/', (req, res) => {
  res.json({ message: 'Hello World!' })
})

app.post('/pokemon', (req, res) => {
  const { body } = req
  console.log(body)
  // guardamos en base de datos
  res.status(201).json({ message: 'Pokemon created', body })
})

app.get('/pokemon/ditto', (req, res) => {
  res.json(ditto)
})

app.use((req, res) => {
  res.status(404).send('<h1>404 Not Found</h1>')
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
