import { LogCountService } from './logCountService'
import { LoggingService, SentryLoggingService } from './loggingService'
import { ErrorInfo } from 'react'

export class ErrorService {
  constructor(
    private logCountService: LogCountService = new LogCountService(),
    private loggingService: LoggingService = new SentryLoggingService()
  ) {
    if (process.browser) {
      window.addEventListener('error', this.logWindowError)
      window.addEventListener('unload', () =>
        window.removeEventListener('error', this.logWindowError)
      )
    }
  }

  private prepareData = (error: ErrorEvent | Error) => {
    const errorMessage = error.message
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const data: Record<string, any> = {
      browser: window.navigator.userAgent,
      errorUrl: window.location.href,
      errorMessage,
      errorCount: this.logCountService.getExceptionCount(errorMessage),
      appPlatformType: 'nextjs-spa',
    }

    if (typeof error !== 'string' && 'filename' in error) {
      // ErrorEvent type
      console.debug(
        '[ErrorService] Error caught:',
        errorMessage,
        error.error.stack
      )
      data.cause = `${error.filename}:${error.lineno}:${error.colno}`
      data.stackTrace = error.error?.stack
    } else {
      // Error type
      console.debug('[ErrorService] Error caught:', errorMessage, error.stack)
      data.stackTrace = error.stack
    }
  }

  logWindowError = (error: ErrorEvent): boolean => {
    const shouldLogErrorToService = this.logError(error)

    if (shouldLogErrorToService) {
      this.logErrorWithExternalService(this.prepareData(error))
    }

    return false
  }

  logBoundaryError = (
    error: ErrorEvent | Error,
    errorInfo: ErrorInfo
  ): boolean => {
    const shouldLogErrorToService = this.logError(error)

    if (shouldLogErrorToService) {
      this.logErrorWithExternalService({ error, errorInfo })
    }

    return false
  }

  logError = (error: ErrorEvent | Error): boolean => {
    const errorMessage = error.message

    this.logCountService.trackException(errorMessage)
    if (!this.logCountService.shouldLogErrorToServer(errorMessage)) {
      return false
    }

    // Just let default handler run.
    return false
  }

  private logErrorWithExternalService = async (data: any) => {
    try {
      this.loggingService.logError(data)
    } catch (e) {
      console.error(e)
    }
  }
}
