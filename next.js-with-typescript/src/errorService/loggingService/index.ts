import * as SentryServer from '@sentry/node'
import * as SentryBrowser from '@sentry/browser'
import { SENTRY_DSN } from '../../utils/constants'

export interface LoggingService {
  logError(data: any): void
}

const sentryClient = process.browser ? SentryBrowser : SentryServer

sentryClient.init({
  dsn: SENTRY_DSN,
  integrations: (integrations) => {
    // integrations will be all default integrations
    return integrations.filter((integration) => {
      return integration.name !== 'Console'
    })
  },
})

export class SentryLoggingService implements LoggingService {
  public logError = async (data: any): Promise<any> => {
    sentryClient.captureException(data)
    return await sentryClient.flush(2000)
  }
}
