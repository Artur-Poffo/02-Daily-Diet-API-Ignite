import fastifyJwt from '@fastify/jwt'
import fastify from 'fastify'
import { env } from './env'
import { mealsRoutes } from './routes/meals'
import { usersRoutes } from './routes/users'

const app = fastify()

const PORT = env.PORT || 3333

app.register(fastifyJwt, {
  secret: env.SECRET,
})

app.register(usersRoutes, {
  prefix: 'users',
})
app.register(mealsRoutes, {
  prefix: 'meals',
})

app.listen(
  {
    port: PORT,
  },
  () => console.log(`listening on port ${PORT}!!!`),
)
