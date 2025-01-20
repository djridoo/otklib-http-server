import { Express } from 'express'
import { NotFoundException } from '@otklib/core'
import { HttpPlugin } from '../../../http-plugin'

export class NotFoundExpressHandler implements HttpPlugin<Express> {
  public setup(server: Express) {
    server.use('*', () => {
      throw new NotFoundException()
    })
  }
}
