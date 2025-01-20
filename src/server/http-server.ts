import { HttpPlugin } from './http-plugin'
import { HttpRequest } from './http-request'

export type HttpEndpoint = string

export type HttpRequestHandler = (req: HttpRequest) => Promise<any> | any

export interface HttpServer<T> {
  isStarted: boolean
  start(port: number): void
  stop(): void
  addPlugin(plugin: HttpPlugin<T>): void
  addErrorHandler(plugin: HttpPlugin<T>): void
  get(path: HttpEndpoint, action: HttpRequestHandler): void
  post(path: HttpEndpoint, action: HttpRequestHandler): void
  put(path: HttpEndpoint, action: HttpRequestHandler): void
  patch(path: HttpEndpoint, action: HttpRequestHandler): void
  delete(path: HttpEndpoint, action: HttpRequestHandler): void
}
