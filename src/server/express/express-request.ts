import { Request as ExpRequest, Response as ExpResponse } from 'express'
import { ParsedQueryString, HttpRequest, HttpRequestParams, HttpRequestHeaders } from '../http-request'
import { HttpMethod } from '../http-method'

export class ExpressRequest implements HttpRequest {
  private req: ExpRequest
  private res: ExpResponse

  public token: string
  public user: any
  public body: any
  public query: ParsedQueryString
  public params: HttpRequestParams
  public headers: HttpRequestHeaders
  public method: HttpMethod
  public url: string

  constructor(req: ExpRequest, res: ExpResponse) {
    this.req = req
    this.res = res
    this.token = res.locals.token || ''
    this.user = res.locals.user
    this.body = req.body
    this.query = req.query as ParsedQueryString
    this.params = req.params
    this.headers = req.headers
    this.method = req.method as HttpMethod
    this.url = req.url
  }

  send(data: any): this {
    this.res.send(data)
    return this
  }

  contentType(type: string): this {
    this.res.contentType(type)
    return this
  }

  header(field: string, value: string): this {
    this.res.header(field, value)
    return this
  }

  redirect(url: string, status: number): void {
    this.res.redirect(status, url)
  }

  status(code: number): this {
    this.res.status(code)
    return this
  }
}
