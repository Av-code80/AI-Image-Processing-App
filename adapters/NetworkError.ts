export default class NetworkError extends Error {
  public status: number;
  public cause: string;
  public params?: Record<string, string | null>;

  constructor(
    message: string,
    cause: string,
    status: number,
    params?: Record<string, string | null>
  ) {
    super(message);
    Object.setPrototypeOf(this, NetworkError.prototype);
    this.status = status;
    this.cause = cause;
    this.params = params;
  }
}
