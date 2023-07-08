import bcrypt from 'bcrypt'
import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { prisma } from '../lib/prisma'

export async function usersRoutes(app: FastifyInstance) {
  app.post('/', async (req, res) => {
    const createUserBodySchema = z.object({
      email: z.string().email(),
      password: z.string(),
    })

    const { email, password } = createUserBodySchema.parse(req.body)

    const hash = bcrypt.hashSync(password, 10)

    await prisma.user.create({
      data: {
        email,
        password: hash,
      },
    })

    res.status(201).send()
  })

  app.post('/signin', async (req, res) => {
    const createUserBodySchema = z.object({
      email: z.string().email(),
      password: z.string(),
    })

    const { email, password } = createUserBodySchema.parse(req.body)

    const user = await prisma.user.findUnique({
      where: { email },
    })

    if (!user) {
      return res.status(404).send({ message: 'User not found' })
    }

    const passwordIsCorrect = bcrypt.compareSync(password, user.password)

    if (!passwordIsCorrect) {
      return res.status(401).send({ message: 'Unauthorized' })
    }

    const token = app.jwt.sign({ id: user.id })

    res.status(200).send({ message: 'Success authenticated', token })
  })

  app.get(
    '/metrics',
    {
      onRequest: async (req, res) => {
        try {
          await req.jwtVerify()
        } catch (err) {
          res.send(err)
        }
      },
    },
    async (req, res) => {
      const { id } = req.user

      const allMeals = await prisma.meal.findMany({
        where: { user_id: id },
        orderBy: {
          updated_at: 'desc',
        },
      })

      const inDietMeals = allMeals.filter((meal) => meal.is_in_diet === true)
      const overDietMeals = allMeals.filter((meal) => meal.is_in_diet === false)

      const bestSequenceFollowingDiet = 0

      return res.status(200).send({
        allMeals,
        inDietMeals,
        overDietMeals,
        bestSequenceFollowingDiet,
      })
    },
  )
}
