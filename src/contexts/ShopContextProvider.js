import React, { Component } from 'react';
import Client from 'shopify-buy/index.umd';

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
    // Fetch all products in your shop
    const products = await client.product.fetchAll();

    this.setState({ products });
  };

  fetchProductByHandle = async (handle) => {
    // Fetch a single product by Handle
    const product = await client.product.fetchByHandle(handle);

    this.setState({ product });
  };

  render() {
    return (
      <ShopContext.Provider
        value={{
          ...this.state,
          fetchAllProducts: this.fetchAllProducts,
          fetchProductByHandle: this.fetchProductByHandle,
        }}
      >
        {this.props.children}
      </ShopContext.Provider>
    );
  }
}
