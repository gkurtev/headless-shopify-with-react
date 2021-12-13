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
    checkout: {},
    products: [],
    product: {},
    cartOpened: false,
  };

  openCart = () => {
    this.setState({ cartOpened: true });
  };

  closeCart = () => {
    this.setState({ cartOpened: false });
  };

  createCheckout = async () => {
    let checkoutLocalStorage = localStorage.getItem('shopify_checkout');

    if (checkoutLocalStorage) {
      this.setState({ checkout: JSON.parse(checkoutLocalStorage) });

      return;
    }

    client.checkout.create().then((checkout) => {
      this.setState({ checkout });
      this.setLocalStorageCheckout(checkout);
    });
  };

  addToCart = async (variantId, quantity = 1) => {
    const shopifyCheckout = JSON.parse(localStorage.getItem('shopify_checkout'));
    const checkoutId = shopifyCheckout.id;
    const lineItemsToAdd = [
      {
        variantId,
        quantity,
      },
    ];

    const checkout = await client.checkout.addLineItems(checkoutId, lineItemsToAdd);

    this.setState({ checkout });

    this.setLocalStorageCheckout(checkout);
  };

  setLocalStorageCheckout = (checkout) => {
    localStorage.setItem('shopify_checkout', JSON.stringify(checkout));
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

  componentDidMount() {
    this.createCheckout();
  }

  render() {
    return (
      <ShopContext.Provider
        value={{
          ...this.state,
          fetchAllProducts: this.fetchAllProducts,
          fetchProductByHandle: this.fetchProductByHandle,
          updateProducts: this.updateProducts,
          fetchCollectionByHandle: this.fetchCollectionByHandle,
          addToCart: this.addToCart,
          closeCart: this.closeCart,
          openCart: this.openCart,
        }}
      >
        {this.props.children}
      </ShopContext.Provider>
    );
  }
}
