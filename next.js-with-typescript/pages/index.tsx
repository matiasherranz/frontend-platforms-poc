import { ReactElement } from 'react'
import Head from 'next/head'
import App from 'shared/pages/app'

export default function Home(): ReactElement {
  return (
    <div className="container">
      <Head>
        <title>Front-end Platform with Next.js and TypeScript</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <App />
    </div>
  )
}
