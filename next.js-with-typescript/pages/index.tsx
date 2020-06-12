import { ReactElement } from 'react'
import Head from 'next/head'
import Layout from '../components/Layout'
import AddressForm from 'react-common/dist/es5/forms/AddressForm'

export default function Home(): ReactElement {
  return (
    <>
      <Head>
        <title>Front-end Platform with Next.js and TypeScript</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>
        <div className="container padding-v">
          <div className="h1">This is a react-common components test</div>
          <AddressForm />
        </div>
      </Layout>
    </>
  )
}
