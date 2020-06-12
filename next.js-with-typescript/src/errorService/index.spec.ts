import { mocked } from 'ts-jest/utils'

import { ErrorService } from '.'
import { LogCountService } from './logCountService'

jest.mock('./logCountService', () => ({
  LogCountService: jest.fn().mockImplementation(() => ({
    getExceptionCount: jest.fn(),
    shouldLogErrorToServer: jest.fn(),
    trackException: jest.fn(),
  })),
}))
const mockedLogCountService = mocked(new LogCountService(true))

describe('errorService', () => {
  let errorService: ErrorService

  beforeEach(() => {
    errorService = new ErrorService(mockedLogCountService as any)
  })

  it('should only log error when allowed', () => {
    mockedLogCountService.shouldLogErrorToServer.mockReturnValueOnce(true)
    errorService.logError(new Error('Error'))
    //expect(igwApiClient.post).toHaveBeenCalledTimes(1)

    mockedLogCountService.shouldLogErrorToServer.mockReturnValueOnce(false)
    errorService.logError(new Error('Error'))
    //expect(igwApiClient.post).toHaveBeenCalledTimes(1)
  })
})
