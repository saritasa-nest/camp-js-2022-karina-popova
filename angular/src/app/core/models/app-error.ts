/**
 * Common application error.
 */
export class AppError extends Error {
  /**
   * Error message.
   */
  public override readonly message: string;

  /**
   * @param message Message of error.
   */
  public constructor(message: string) {
    super(message);
    this.message = message;
  }
}
