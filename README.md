# @otklib/http-server

## Install

```bash
$ npm install -S @otklib/http-server
```

## Setup
On the main layer (main file, module, factory, etc)

```ts
const server = HttpServerFactory.createExpressServer()

server.addPlugin(new AuthExpressPlugin(authorizer))
server.addPlugin(new LogExpressPlugin(logger))

server.start(Number(process.env.PORT) || 3000)
```

## AuthExpressPlugin implementation example

```ts
export class AuthExpressPlugin implements HttpPlugin<Express> {
  private authorizer: AuthorizerPort

  constructor(authorizer: AuthorizerPort) {
    this.authorizer = authorizer
  }

  public setup(server: Express) {
    server.use(this.auth.bind(this))
  }

  private auth(req, res, next) {
    const token = this.makeToken(req)
    this.authorizer.authorize(token).then((user) => {
      // write in res.locals
      next()
    })
  }

  private makeToken(req: Request): string {
    // TODO implement using req.query.token, req.headers.authorization, etc
  }
}
```

## LogExpressPlugin implementation example

```ts
export class LogExpressPlugin implements HttpPlugin<Express> {
  constructor(private logger: LoggerPort) {}

  public setup(server: Express) {
    server.use(this.auth.bind(this))
  }

  private auth(req: ExpressRequest, res: ExpressResponse, next: () => void) {
    const startAt = Date.now()
    const { ip, method, path: url, body } = req

    res.on('close', () => {
      const endAt = Date.now()
      const { statusCode } = res
      // const { some props } = res.locals

      this.logger.log({
        ip,
        method,
        url,
        statusCode,
        // some props from res.locals
        body,
        startAt,
        endAt,
        time: endAt - startAt,
      })
    })

    next()
  }
}
```

## Run tests

```bash
# unit tests
$ npm run test
```
