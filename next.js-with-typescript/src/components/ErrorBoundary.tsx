import React, { ReactNode } from 'react'
import { ErrorService } from '../errorService'
import { ErrorServiceContext } from '../errorService/context'
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
    // Update state so the next render will show the fallback UI.
    return { hasError: true }
  }

  componentDidCatch(error: Error): void {
    // this.errorService.logError(error)
    console.log(error)
  }

  render(): ReactNode {
    const { fallback = null, children } = this.props
    const { hasError } = this.state

    return hasError ? fallback : children
  }
}

export default ErrorBoundary
