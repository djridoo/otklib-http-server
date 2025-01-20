import { HttpException } from './http-exception'

export class HttpDefaultException extends HttpException {
  protected code: number = 500
  protected name: string = 'Internal Server Error'

  public send() {
    const message = this.error.message || ''
    const data = (this.error as any).data || {}

    this.request.status(this.code).send({
      code: this.code,
      name: this.name,
      message,
      data,
    })
  }
}
