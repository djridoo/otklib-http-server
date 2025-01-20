import { Express, urlencoded } from 'express'
import { HttpPlugin } from '../../http-plugin'

export class FormExpressPlugin implements HttpPlugin<Express> {
  public setup(server: Express) {
    server.use(
      urlencoded({
        extended: true,
      }),
    )
  }
}
