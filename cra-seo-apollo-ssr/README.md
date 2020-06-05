# SEO SSR on CRA

## Motivation

We need to render SEO information on the server side in order to provide it to Search Engines without loading any scripts on the client. Also, no content from the client side will be rendered on server.

## How to Run it

`yarn build`

`yarn start:ssr`

## How to add SSR SEO to a route

You have to define a prop called seo and assign there the component you want to render in the server, for example:

```
{
  exact: true,
  path: '/product/:productId',
  content: Product,
  seo: ProductSeo
},
```

As you can note in `App.js` we avoid rendering all the tree inside the component provided in `content` field using the library `react-prerendered-component`.

This allows us to integrate it with `GraphQL` and run fastest and lightweight queries for SEO and then run heaviest ones in the client to get all the data for that particular page. You can see an example in `/src/pages/Product.jsx`

## Further work

This approach should be extended in the case of nested routes.