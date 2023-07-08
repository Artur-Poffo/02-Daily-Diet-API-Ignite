import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { prisma } from '../lib/prisma'

type GetMealParams = {
  id: string
}

type CreateMealBody = {
  name: string
  description: string
  isInDiet: boolean
}

const validateGetMealParams = (params: GetMealParams): GetMealParams => {
  const schema = z.object({
    id: z.string().uuid(),
  })

  return schema.parse(params)
}

const validateCreateMealBody = (body: CreateMealBody): CreateMealBody => {
  const schema = z.object({
    name: z.string(),
    description: z.string(),
    isInDiet: z.boolean(),
  })

  return schema.parse(body)
}

export async function mealsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', async (req, res) => {
    try {
      await req.jwtVerify()
    } catch (err) {
      res.send(err)
    }
  })

  app.get('/', async (req, res) => {
    const meals = await prisma.meal.findMany({
      where: {
        user_id: req.user.id,
      },
    })

    return res.status(200).send({ meals })
  })

  app.get<{ Params: GetMealParams }>('/:id', async (req, res) => {
    const { id } = validateGetMealParams(req.params)

    const meal = await prisma.meal.findUniqueOrThrow({
      where: { id },
    })

    if (req.user.id !== meal.user_id) {
      return res.status(404).send({ message: `Meal with ID ${id} not found` })
    }

    return res.status(200).send({ meal })
  })

  app.post<{ Body: CreateMealBody }>('/', async (req, res) => {
    const { isInDiet, description, name } = validateCreateMealBody(req.body)

    await prisma.meal.create({
      data: {
        name,
        description,
        is_in_diet: isInDiet,
        user_id: req.user.id,
      },
    })

    return res.status(201).send()
  })

  app.patch<{ Params: GetMealParams }>('/:id', async (req, res) => {
    const createMealBodySchema = z.object({
      name: z.string().optional(),
      description: z.string().optional(),
      isInDiet: z.boolean().optional(),
    })

    const { id } = validateGetMealParams(req.params)
    const { name, description, isInDiet } = createMealBodySchema.parse(req.body)

    const meal = await prisma.meal.findUniqueOrThrow({
      where: { id },
    })

    if (req.user.id !== meal.user_id) {
      return res.status(404).send({ message: `Meal with ID ${id} not found` })
    }

    const updatedMeal = await prisma.meal.update({
      where: { id },
      data: { name, description, is_in_diet: isInDiet },
    })

    return res.status(200).send({ updatedMeal })
  })

  app.delete<{ Params: GetMealParams }>('/:id', async (req, res) => {
    const { id } = validateGetMealParams(req.params)

    const meal = await prisma.meal.findUniqueOrThrow({
      where: { id },
    })

    if (req.user.id !== meal.user_id) {
      return res.status(404).send({ message: `Meal with ID ${id} not found` })
    }

    await prisma.meal.delete({ where: { id } })

    return res.status(204).send()
  })
}
