import React from 'react'
import { Helmet } from 'react-helmet';
import { StaticRouter } from 'react-router-dom';
import { renderToStringWithData } from "@apollo/react-ssr";
import { ApolloProvider } from 'react-apollo';
import { ApolloClient, InMemoryCache } from 'apollo-boost';

import App from '../src/App';
import manifest from '../build/asset-manifest.json';
import { getGQLLink } from '../src/graphql/config';
import fetch from 'node-fetch';

const path = require("path");
const fs = require("fs");

const injectHTML = (data, { html, title, meta, body, scripts, state }) => {
  data = data.replace('<html>', `<html ${html}>`);
  data = data.replace(/<title>.*?<\/title>/g, title);
  data = data.replace('</head>', `${meta}</head>`);
  data = data.replace(
    '<div id="root"></div>',
    `<div id="root">${body}</div>`
  );
  data = data.replace('</body>', scripts.join('') + state + '</body>');

  return data;
};

export default (req, res, next) => {
  const filePath = path.resolve(__dirname, '..', 'build', 'index.html');

  const client = new ApolloClient({
    ssrMode: true,
    link: getGQLLink(fetch, req.header('Cookie')),
    cache: new InMemoryCache(),
  });

  const context = {};
  const app = (
    <ApolloProvider client={client}>
      <StaticRouter location={req.url} context={context}>
        <App />
      </StaticRouter>
    </ApolloProvider>
  );

  fs.readFile(filePath, 'utf8', (err, htmlData) => {
    if (err) {
      console.error('err', err);
      return res.status(404).end()
    }

    const extractAssets = (assets, chunks) =>
      Object.keys(assets)
        .filter(asset => chunks.indexOf(asset.replace('.js', '')) > -1)
        .map(k => assets[k]);

    const extraChunks = extractAssets(manifest, []).map(
      c => `<script type="text/javascript" src="/${c.replace(/^\//, '')}"></script>`
    );
    
    renderToStringWithData(app)
      .then(content => {
        const helmet = Helmet.renderStatic();
        const initialState = client.extract();
        const html = injectHTML(
          htmlData, 
          {
            html: helmet.htmlAttributes.toString(),
            title: helmet.title.toString(),
            meta: helmet.meta.toString(),
            body: content,
            scripts: extraChunks,
            state: `
              <script>
                window.__APOLLO_STATE__=${JSON.stringify(initialState).replace(/</g, '\\u003c')}
              </script>
            `
          }
        );
        res.status(200);
        res.send(html);
        res.end();
      });
  });
}