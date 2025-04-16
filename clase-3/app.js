const express = require('express')
const movies = require('./movies.json')
const crypto = require('node:crypto')
const cors = require('cors')
const { validateMovie, validatePartialMovie } = require('./schemas/movies')

const app = express()
app.use(express.json())
app.use(cors({
  origin: (origin, callback) => {
    const ACCEPTED_ORIGINS = [
      'http://localhost:3000',
      'http://localhost:5173',
      'http://localhost:8080',
      'https://movies.com'
    ]

    if (ACCEPTED_ORIGINS.includes(origin)) {
      return callback(null, true)
    }

    if (!origin) {
      return callback(null, true) // permitir peticiones sin origen (ej: Postman)
    }

    return callback(new Error('Not allowed by CORS'))
  }

})) // habilitar CORS para todas las rutas y métodos
app.disable('x-powered-by') // deshabilitar X-Powered-By para mayor seguridad

// metodos normales: GET/HEAD/POST
// metodos complejos: PUT/PATCH/DELETE

// CORS: Cross-Origin Resource Sharing
// permite que el navegador haga peticiones a otro dominio diferente al de la página web
// CORS PRE-Flight
// OPTIONS

const PORT = process.env.PORT ?? 3000

app.get('/movies', (req, res) => {
  const origin = req.header('origin')
  console.log(origin)
  if (ACCEPTED_ORIGINS.includes(origin) || !origin) {
    res.header('Access-Control-Allow-Origin', origin)
  }
  console.log(req.query)
  const { genre } = req.query
  if (genre) {
    const filteredMovies = movies.filter(movie =>
      movie.genre.some(g => g.toLowerCase() === genre.toLowerCase())
    )
    return res.json(filteredMovies)
  }
  res.json(movies)
})

app.get('/movies/:id', (req, res) => {
  const { id } = req.params
  const movie = movies.find(movie => movie.id === id)
  if (movie) return res.json(movie)

  res.status(404).json({ error: 'Movie not found' })
})

app.post('/movies', (req, res) => {
  const result = validateMovie(req.body)

  if (!result.success) {
    // 400 Bad Request o 422 Unprocessable Entity
    return res.status(400).json({
      error: 'Invalid data',
      xd: JSON.parse(result.error.message),
      details: result.error.format()
    })
  }

  const newMovie = {
    id: crypto.randomUUID(), // id único UUDI v4
    ...result.data
  }

  // esto no sería REST, porque estamos guardando el estado de la aplicación en Memoria
  movies.push(newMovie)

  res.status(201).json(newMovie) // 201 Created se devuelve el recurso para actualizar la caché del cliente
})

app.patch('/movies/:id', (req, res) => {
  console.log('ENTRA')

  const result = validatePartialMovie(req.body)
  console.log('RESULTADO', result)
  if (!result.success) {
    return res.status(400).json({
      error: 'Invalid data',
      details: JSON.parse(result.error.message)
    })
  }

  const { id } = req.params
  const movieIndex = movies.findIndex(movie => movie.id === id)
  if (!movieIndex === -1) return res.status(404).json({ error: 'Movie not found' })

  const updatedMovie = {
    ...movies[movieIndex],
    ...result.data
  }

  movies[movieIndex] = updatedMovie
  console.log('PELICULAS ACTUALIZADAS', movies)
  res.json(updatedMovie)
})

app.delete('/movies/:id', (req, res) => {
  const { id } = req.params
  const movieIndex = movies.findIndex(movie => movie.id === id)
  if (movieIndex === -1) return res.status(404).json({ error: 'Movie not found' })

  movies.splice(movieIndex, 1)
  res.status(204).send() // 204 No Content
})

app.use((req, res) => {
  res.status(404).json({ error: 'Not Found' })
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
