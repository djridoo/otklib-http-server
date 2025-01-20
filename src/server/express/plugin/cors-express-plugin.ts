import cors from 'cors'
import { Express } from 'express'
import { HttpPlugin } from '../../http-plugin'

export class CorsExpressPlugin implements HttpPlugin<Express> {
  public setup(server: Express) {
    if (process.env.ORIGIN) {
      server.use(
        cors({
          origin: String(process.env.ORIGIN || '').split(','),
          optionsSuccessStatus: 200,
        }),
      )
    }
  }
}
