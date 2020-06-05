import React from 'react'
import logo from '../logo.svg';
import { Helmet } from 'react-helmet';

export const Content = () => (
  <header className="App-header">
    <img src={logo} className="App-logo" alt="logo" />
    <p>
      Home
    </p>
  </header>
)

export default Content;

export const ContentSeo = () => (
  <Helmet>
    <title>Home</title>
  </Helmet>
)