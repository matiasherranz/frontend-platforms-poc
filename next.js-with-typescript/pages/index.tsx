import { ReactElement } from 'react'
import Head from 'next/head'
import Layout from '../components/Layout'

export default function Home(): ReactElement {
  return (
    <>
      <Head>
        <title>Front-end Platform with Next.js and TypeScript</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout />
    </>
  )
}
