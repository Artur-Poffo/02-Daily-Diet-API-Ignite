/* eslint-disable no-unused-vars */
import '@fastify/jwt'

declare module '@fastify/jwt' {
  interface FastifyJWT {
    payload: { id: string } // payload type is used for signing and verifying
    user: {
      id: string
    } // user type is return type of `request.user` object
  }
}
