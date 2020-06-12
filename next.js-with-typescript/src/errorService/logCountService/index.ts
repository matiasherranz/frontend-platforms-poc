import { LIMIT_CLIENT_EXCEPTION_LOGGING } from '../../utils/constants'

export class LogCountService {
  private exceptionsMap: Record<string, number>
  private limitClientExceptionLogging: boolean

  constructor(
    limitClientExceptionLogging: boolean = LIMIT_CLIENT_EXCEPTION_LOGGING
  ) {
    this.limitClientExceptionLogging = limitClientExceptionLogging
    this.exceptionsMap = {}
  }

  /**
   * Tracks how many times an exceptionMessage has occurred.
   *
   * @param exceptionMessage
   */
  trackException = (exceptionMessage: string): void => {
    this.exceptionsMap[exceptionMessage] =
      this.getExceptionCount(exceptionMessage) + 1
  }

  /**
   * Checks number of times exceptionMessage has occurred.
   * Only log to server if the number of times is a power of 10 (i.e. the first, tenth, hundredth, so forth).
   *
   * @param exceptionMessage
   * @returns {boolean}
   */
  shouldLogErrorToServer = (exceptionMessage: string): boolean => {
    // should always log to server if LIMIT_CLIENT_EXCEPTION_LOGGING is off
    if (!this.limitClientExceptionLogging) {
      return true
    }

    const exceptionCount = this.exceptionsMap[exceptionMessage]
    const result = Math.log(exceptionCount) * Math.LOG10E
    return Math.floor(result) === result
  }

  getExceptionCount = (errorMessage: string): number => {
    return this.exceptionsMap[errorMessage] || 0
  }
}
