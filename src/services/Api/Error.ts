export class ApiError extends Error {
  constructor(
    message: string,
    public status?: number,
    public url?: string,
    public data?: unknown,
    public originalError?: unknown
  ) {
    super(message);
    this.name = "ApiError";
    Object.setPrototypeOf(this, ApiError.prototype);
  }
}
