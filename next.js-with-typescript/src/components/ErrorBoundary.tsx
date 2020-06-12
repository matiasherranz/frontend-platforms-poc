import React, { ReactNode, ErrorInfo } from 'react'
import { ErrorService } from '../errorService'
import { LogCountService } from '../errorService/logCountService'

type ErrorBoundaryProps = {
  children: ReactNode
  fallback?: ReactNode
}

type ErrorBoundaryState = {
  hasError: boolean
}

class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  state = { hasError: false }

  logCountService = new LogCountService()

  errorService = new ErrorService(this.logCountService)

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    this.errorService.logBoundaryError(error, errorInfo)
    console.log(error)
  }

  render(): ReactNode {
    const { fallback = null, children } = this.props
    const { hasError } = this.state

    return hasError ? fallback : children
  }
}

export default ErrorBoundary
