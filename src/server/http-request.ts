import { HttpMethod } from './http-method'

export interface ParsedQueryString {
  [key: string]: undefined | string | string[] | ParsedQueryString | ParsedQueryString[]
}

export interface HttpRequestParams {
  [key: string]: string
}

export interface HttpRequestHeaders {
  [key: string]: string | string[] | undefined
}

export interface HttpRequestData {
  token: string
  user: any
  headers: HttpRequestHeaders
  params: HttpRequestParams
  method: HttpMethod
  url: string
  query: ParsedQueryString
  body: any
}

export interface HttpRequest extends HttpRequestData {
  send: (any) => this
  status(code: number): this
  contentType(type: string): this
  header(field: string, value: string): this
  redirect(url: string, status: number): void
}
