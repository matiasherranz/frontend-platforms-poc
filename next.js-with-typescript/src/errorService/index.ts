import axios, { AxiosResponse } from 'axios'
import { LogCountService } from './logCountService'
import { LOG_SERVER_URL } from '../utils/constants'

export class ErrorService {
  constructor(
    private logCountService: LogCountService = new LogCountService()
  ) {
    if (process.browser) {
      window.addEventListener('error', this.logError)
      window.addEventListener('unload', () =>
        window.removeEventListener('error', this.logError)
      )
    }
  }

  logError = (error: ErrorEvent | Error): boolean => {
    const errorMessage = error.message

    this.logCountService.trackException(errorMessage)
    if (!this.logCountService.shouldLogErrorToServer(errorMessage)) {
      return false
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const data: Record<string, any> = {
      browser: window.navigator.userAgent,
      errorUrl: window.location.href,
      errorMessage,
      errorCount: this.logCountService.getExceptionCount(errorMessage),
      appPlatformType: 'nextjs-spa',
    }

    if ('filename' in error) {
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

    this.logErrorToServer(data)

    // Just let default handler run.
    return false
  }

  private logErrorToServer = (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: Record<string, any>
  ): Promise<AxiosResponse<void>> => {
    return axios.post(LOG_SERVER_URL, data)
  }
}
