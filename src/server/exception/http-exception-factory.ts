import { AccessException, NotFoundException, ValidationException } from '@otklib/core'
import { HttpRequest } from '../http-request'
import { HttpException } from './http-exception'
import { HttpAccessException } from './http-access-exception'
import { HttpNotFoundException } from './http-not-found-exception'
import { HttpValidationException } from './http-validation-exception'
import { HttpDefaultException } from './http-default-exception'

export class HttpExceptionFactory {
  public static create(request: HttpRequest, error: Error): HttpException {
    if (error instanceof AccessException) return new HttpAccessException(request, error)
    if (error instanceof NotFoundException) return new HttpNotFoundException(request, error)
    if (error instanceof ValidationException) return new HttpValidationException(request, error)
    return new HttpDefaultException(request, error)
  }
}
