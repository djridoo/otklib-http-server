import { HttpException } from './http-exception'

export class HttpAccessException extends HttpException {
  protected code: number = 403
  protected name: string = 'Forbidden'
}
