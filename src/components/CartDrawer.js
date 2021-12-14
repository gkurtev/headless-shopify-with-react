import React, { useContext } from 'react';
import {
  Drawer,
  Link,
  DrawerBody,
  Box,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from '@chakra-ui/react';
import { ShopContext } from '../contexts/ShopContextProvider';
import CartItem from './CartItem';

function CartDrawer() {
  const { checkout, cartOpened, closeCart } = useContext(ShopContext);

  const cartCount = () => {
    const bool = checkout && checkout.lineItems && checkout.lineItems.length > 0;

    return bool
      ? `(${checkout.lineItems.reduce((previousValue, currentValue) => {
          return previousValue + currentValue.quantity;
        }, 0)})`
      : '';
  };

  return (
    <Drawer isOpen={cartOpened} placement='right' onClose={closeCart} size='md'>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Your Cart {cartCount()}</DrawerHeader>

        <DrawerBody>
          {checkout && checkout.lineItems && checkout.lineItems.length > 0 ? (
            checkout.lineItems.map((lineItem) => (
              <Box key={lineItem.id}>
                <CartItem item={lineItem} />
              </Box>
            ))
          ) : (
            <Box>Your cart is currently empty</Box>
          )}
        </DrawerBody>

        <DrawerFooter>
          <Link
            width='100%'
            bg='black'
            color='white'
            variant='outline'
            mr={3}
            textAlign='center'
            cursor='pointer'
            padding='1rem 2rem'
            href={checkout.webUrl}
          >
            Checkout
          </Link>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

export default CartDrawer;
