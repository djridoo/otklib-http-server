import { HttpRequest } from '../http-request'

export abstract class HttpException {
  protected readonly request: HttpRequest
  protected readonly error: Error

  public constructor(request: HttpRequest, error: Error) {
    this.request = request
    this.error = error
  }

  protected abstract code: number

  protected abstract name: string

  public send() {
    const message = this.error.message || ''
    const data = (this.error as any).data || {}
    const errors = (this.error as any).errors

    this.request.status(this.code).send({
      code: this.code,
      name: this.name,
      message,
      data,
      errors,
    })
  }
}
