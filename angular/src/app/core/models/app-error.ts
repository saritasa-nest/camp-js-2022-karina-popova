/**
 * Common application error.
 */
export class AppError extends Error {
  /**
   * Error message.
   */
  public override readonly message: string;

  /**
   * Error code.
   */
  public readonly code: string;

  /**
   * @param message Message of error.
   * @param code Code of error.
   */
  public constructor(message: string, code: string) {
    super(message);
    this.message = message;
    this.code = code;
  }
}
