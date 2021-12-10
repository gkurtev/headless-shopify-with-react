import React, { Component } from 'react';
import Client from 'shopify-buy/index.unoptimized.umd';
import { productQuery } from '../queries';
import { graphQlRequestProducts, graphQlRequestProductSingle } from '../graphRequests';

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
    graphQlRequestProducts(client.graphQLClient, productQuery).then((graphProducts) => {
      const { products } = graphProducts.attrs;
      this.setState({ products });
    });
  };

  fetchProductByHandle = async (handle) => {
    // Fetch a single product by Handle
    graphQlRequestProductSingle(client.graphQLClient, handle, productQuery).then((graphProduct) => {
      const { productByHandle: product } = graphProduct.attrs;
      this.setState({ product });
    });
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
        }}
      >
        {this.props.children}
      </ShopContext.Provider>
    );
  }
}
