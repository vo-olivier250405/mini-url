import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import urlsRoute from './routes/index.routes.js'
import { logger } from 'hono/logger'
import { cors } from 'hono/cors'

const app = new Hono()

app.use(logger())
app.use(cors())

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.route("/urls/", urlsRoute)

serve({
  fetch: app.fetch,
  port: 3000
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`)
})
