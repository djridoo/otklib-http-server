import { HttpException } from './http-exception'

export class HttpNotFoundException extends HttpException {
  protected code: number = 404
  protected name: string = 'Not Found'
}
