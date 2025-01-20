import { Express, Request as ExpRequest, Response as ExpResponse, NextFunction } from 'express'
import { ExpressRequest } from '../../express-request'
import { HttpPlugin } from '../../../http-plugin'
import { HttpExceptionFactory } from '../../../exception/http-exception-factory'

export class ErrorExpressHandler implements HttpPlugin<Express> {
  public setup(server: Express) {
    server.use((error: Error, req: ExpRequest, res: ExpResponse, _next: NextFunction) => {
      // todo log error
      const request = new ExpressRequest(req, res)
      HttpExceptionFactory.create(request, error).send()
    })
  }
}
