export interface HttpPlugin<T> {
  setup(server: T): void
}
