import { render } from '@testing-library/react'
import React, { FC } from 'react'
import { mocked } from 'ts-jest/utils'
import ErrorBoundary from './ErrorBoundary'
import { LogCountService } from '../errorService/logCountService'
import { ErrorService } from '../errorService'
import { ErrorServiceContext } from '../errorService/context'

jest.mock('../../../services/logging/errorService/logCountService')
const mockedLogCountService = mocked(new LogCountService(true))

jest.mock('../../../services/logging/errorService', () => ({
  ErrorService: jest.fn().mockImplementation(() => ({
    logError: jest.fn(),
  })),
}))
const mockedErrorService = mocked(
  new ErrorService(mockedLogCountService as any)
)

describe('ErrorBoundary', () => {
  const fallback = <div>Fallback</div>

  const ThrowError: FC = () => {
    throw new Error('Error')
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const error = jest.spyOn(console, 'error').mockImplementation(() => {})

  afterAll(() => {
    error.mockRestore()
  })

  it('does not display fallback when there is no error', () => {
    const { queryByText } = render(
      <ErrorServiceContext.Provider value={mockedErrorService}>
        <ErrorBoundary fallback={fallback}>Content</ErrorBoundary>
      </ErrorServiceContext.Provider>
    )

    expect(queryByText('Content')).not.toBeNull()
    expect(queryByText('Fallback')).toBeNull()
  })

  it('displays fallback upon catching error', () => {
    const { queryByText } = render(
      <ErrorServiceContext.Provider value={mockedErrorService}>
        <ErrorBoundary fallback={fallback}>
          <ThrowError />
        </ErrorBoundary>
      </ErrorServiceContext.Provider>
    )

    expect(queryByText('Content')).toBeNull()
    expect(queryByText('Fallback')).not.toBeNull()
  })

  it('logs error upon catching it', () => {
    render(
      <ErrorServiceContext.Provider value={mockedErrorService}>
        <ErrorBoundary fallback={fallback}>
          <ThrowError />
        </ErrorBoundary>
      </ErrorServiceContext.Provider>
    )

    expect(mockedErrorService.logError).toHaveBeenCalled()
  })
})
