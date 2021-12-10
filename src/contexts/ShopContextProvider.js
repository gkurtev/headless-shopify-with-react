import React, { Component } from 'react';
import Client from 'shopify-buy/index.unoptimized.umd';
import { productQuery } from '../queries';
import {
  graphQlRequestCollectionByHandle,
  graphQlRequestProducts,
  graphQlRequestProductSingle,
} from '../graphRequests';

const { REACT_APP_DOMAIN, REACT_APP_SHOPIFY_API } = process.env;

// Initializing a client to return content in the store's primary language
const client = Client.buildClient({
  domain: REACT_APP_DOMAIN,
  storefrontAccessToken: REACT_APP_SHOPIFY_API,
});

export const ShopContext = React.createContext();

export default class ShopContextProvider extends Component {
  state = {
    products: [],
    product: {},
  };

  fetchAllProducts = async () => {
    const res = await graphQlRequestProducts(client.graphQLClient, productQuery);
    const productsData = await res;

    this.setState({ products: productsData.attrs.products });
  };

  fetchProductByHandle = async (handle) => {
    const res = await graphQlRequestProductSingle(client.graphQLClient, handle, productQuery);
    const productData = await res;

    this.setState({ product: productData.attrs.productByHandle });
  };

  fetchCollectionByHandle = async (handle) => {
    const res = await graphQlRequestCollectionByHandle(client.graphQLClient, handle, productQuery);
    const products = await res;

    return products.attrs.collectionByHandle.products;
  };

  updateProducts = (product) => {
    this.setState({
      products: this.state.products.concat(product),
    });
  };

  render() {
    return (
      <ShopContext.Provider
        value={{
          ...this.state,
          fetchAllProducts: this.fetchAllProducts,
          fetchProductByHandle: this.fetchProductByHandle,
          updateProducts: this.updateProducts,
          fetchCollectionByHandle: this.fetchCollectionByHandle,
        }}
      >
        {this.props.children}
      </ShopContext.Provider>
    );
  }
}
