import { HttpException } from './http-exception'

export class HttpValidationException extends HttpException {
  protected code: number = 400
  protected name = 'Bad Request'
}
