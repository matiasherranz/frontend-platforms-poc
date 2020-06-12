import React, { ReactElement } from 'react'

export const ErroneousComponent = (): ReactElement => {
  const raiseError = true

  if (raiseError) throw 'Error'

  return <div>Something</div>
}
