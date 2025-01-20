import { Express, json } from 'express'
import { HttpPlugin } from '../../http-plugin'

export class JsonExpressPlugin implements HttpPlugin<Express> {
  public setup(server: Express) {
    server.use(json())
  }
}
