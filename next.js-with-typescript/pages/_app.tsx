import { AppProps } from 'next/app'
import { ReactElement } from 'react'

import './global-styles.scss'

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({
  Component,
  pageProps,
}: AppProps): ReactElement {
  return <Component {...pageProps} />
}
