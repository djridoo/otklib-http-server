import express, { Express } from 'express'
import { ExpressHttpServer } from './express/express-http-server'
import { JsonExpressPlugin } from './express/plugin/json-express-plugin'
import { CorsExpressPlugin } from './express/plugin/cors-express-plugin'
import { FormExpressPlugin } from './express/plugin/form-express-plugin'
import { NotFoundExpressHandler } from './express/plugin/error/not-found-express-handler'
import { ErrorExpressHandler } from './express/plugin/error/error-express-handler'
import { HttpServer } from './http-server'

export class HttpServerFactory {
  public static createExpressServer(): HttpServer<Express> {
    const server = new ExpressHttpServer(express())
    server.addPlugin(new JsonExpressPlugin())
    server.addPlugin(new FormExpressPlugin())
    server.addPlugin(new CorsExpressPlugin())
    server.addErrorHandler(new NotFoundExpressHandler())
    server.addErrorHandler(new ErrorExpressHandler())

    return server
  }
}
