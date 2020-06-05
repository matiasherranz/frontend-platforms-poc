import React from 'react'
import logo from '../logo.svg';
import { Helmet } from 'react-helmet';
import { gql } from 'apollo-boost';
import { Query } from 'react-apollo';
import { useParams } from 'react-router-dom';

export const Product = () => { 
  const { productId } = useParams();

  return (
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <Query query={
        gql`{
          product(productId: "${productId}") {
            id
            name
            brand
            description
            images {
              src
              alt
              layout
            }
          }
        }`
      }>
        {({ loading, error, data }) => (
          <>
            {loading && <p>Loading query...</p>}
            {data && data.product ? (
              <>
                <p>{data.product.name}</p>
                <p>{data.product.brand}</p>
                <div dangerouslySetInnerHTML={{__html: data.product.description}} />
                <p>
                  <img 
                    src={data.product.images[0].src}
                    alt={data.product.images[0].alt}
                  />
                </p>
              </>
            ) : <p>No product info</p>}
            {error && <p>{error.message}</p>}
          </>
        )}
      </Query>
    </header>
  );
}

export default Product;

export const ProductSeo = () => {
  const { productId } = useParams();

  return (
    <Query query={
      gql`{
        product(productId: "${productId}") {
          name
        }
      }`
    }>
      {({ loading, error, data }) => (
        <Helmet>
          {data && data.product && <title>{data.product.name}</title>}
        </Helmet>
      )}
    </Query>
  );
}