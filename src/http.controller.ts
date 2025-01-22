import { HttpRequest } from './server/http-request'

export interface HttpController<ResponseData> {
  handle(request: HttpRequest): Promise<ResponseData>
}
