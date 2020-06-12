import { LogCountService } from '.'

describe('logCountService', () => {
  let logCountService: LogCountService

  describe('trackException', () => {
    beforeEach(() => {
      logCountService = new LogCountService(true)
    })

    it('works correctly', () => {
      expect(logCountService.getExceptionCount('error')).toBe(0)
      logCountService.trackException('error')
      expect(logCountService.getExceptionCount('error')).toBe(1)
    })
  })

  describe('shouldLogErrorToServer', () => {
    beforeEach(() => {
      logCountService = new LogCountService(true)
    })

    it('returns true if check is disabled', () => {
      logCountService = new LogCountService(false)
      expect(logCountService.shouldLogErrorToServer('error')).toBe(true)
    })

    it('logs on every power of 10 when enabled', () => {
      for (let i = 1; i <= 10; i += 1) {
        logCountService.trackException('error')
        expect(logCountService.shouldLogErrorToServer('error')).toBe(
          i === 1 || i === 10
        )
      }
    })
  })

  describe('getExceptionCount', () => {
    beforeEach(() => {
      logCountService = new LogCountService(true)
    })

    it('works correctly', () => {
      expect(logCountService.getExceptionCount('error')).toBe(0)
      logCountService.trackException('error')
      expect(logCountService.getExceptionCount('error')).toBe(1)
    })
  })
})
