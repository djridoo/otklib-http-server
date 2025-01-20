import { Server } from 'http'
import { Express, RequestHandler, Request, Response, NextFunction } from 'express'
import { ExpressRequest } from './express-request'
import { HttpEndpoint, HttpRequestHandler, HttpServer } from '../http-server'
import { HttpPlugin } from '../http-plugin'
import { HttpMethod } from '../http-method'

type HttpRoute = {
  method: HttpMethod
  path: HttpEndpoint
  action: HttpRequestHandler
}

export class ExpressHttpServer implements HttpServer<Express> {
  private readonly server: Express
  private listener: Server
  private plugins: HttpPlugin<Express>[] = []
  private routes: HttpRoute[] = []
  private errorHandlers: HttpPlugin<Express>[] = []

  public isStarted: boolean = false

  constructor(server: Express) {
    this.server = server
  }

  public addPlugin(plugin: HttpPlugin<Express>): void {
    if (this.isStarted) throw Error('You can not use HttpServer.addPlugin() if server is started')
    this.plugins.push(plugin)
  }

  public addErrorHandler(handler: HttpPlugin<Express>): void {
    if (this.isStarted) throw Error('You can not use HttpServer.addErrorHandler() if server is started')
    this.errorHandlers.push(handler)
  }

  public start(port: number): void {
    if (this.isStarted) throw Error('You can not use HttpServer.start() if server is started')
    this.setupPlugins()
    this.setupRoutes()
    this.setupErrorHandlers()
    this.server.listen(port)
    this.isStarted = true
    console.log(`Server started on port: ${port}`)
  }

  public stop(): void {
    if (!this.isStarted) throw Error('You can not use HttpServer.stop() if server is not started')
    this.listener.close()
  }

  private setupPlugins(): void {
    for (const plugin of this.plugins) {
      plugin.setup(this.server)
    }
  }

  private setupErrorHandlers(): void {
    for (const handler of this.errorHandlers) {
      handler.setup(this.server)
    }
  }

  private setupRoutes(): void {
    for (const route of this.routes) {
      this.setupRoute(route)
    }
  }

  private setupRoute(route: HttpRoute): void {
    this.server[route.method](route.path, this.wrapControllerAction(route.action))
  }

  private wrapControllerAction(action: HttpRequestHandler): RequestHandler {
    return (req: Request, res: Response, next: NextFunction) => {
      const request = new ExpressRequest(req, res)

      action(request)
        .then((result: any) => {
          res.send(result)
        })
        .catch((error: Error) => {
          next(error)
        })
    }
  }

  public get(path: HttpEndpoint, action: HttpRequestHandler): void {
    if (this.isStarted) throw Error('You can not use HttpServer.get() if server is started')
    this.routes.push({ method: HttpMethod.GET, path, action })
  }

  public post(path: HttpEndpoint, action: HttpRequestHandler): void {
    if (this.isStarted) throw Error('You can not use HttpServer.post() if server is started')
    this.routes.push({ method: HttpMethod.POST, path, action })
  }

  public patch(path: HttpEndpoint, action: HttpRequestHandler): void {
    if (this.isStarted) throw Error('You can not use HttpServer.patch() if server is started')
    this.routes.push({ method: HttpMethod.PATCH, path, action })
  }

  public put(path: HttpEndpoint, action: HttpRequestHandler): void {
    if (this.isStarted) throw Error('You can not use HttpServer.put() if server is started')
    this.routes.push({ method: HttpMethod.PUT, path, action })
  }

  public delete(path: HttpEndpoint, action: HttpRequestHandler): void {
    if (this.isStarted) throw Error('You can not use HttpServer.delete() if server is started')
    this.routes.push({ method: HttpMethod.DELETE, path, action })
  }
}
