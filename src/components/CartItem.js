import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Box,
  Flex,
  Image,
  Text,
  CloseButton,
} from '@chakra-ui/react';

import React, { useContext } from 'react';
import { ShopContext } from '../contexts/ShopContextProvider';
function CartItem(props) {
  const { item } = props;

  const { updateCartItems, removeCartItem } = useContext(ShopContext);

  return (
    <Box marginBottom='2rem'>
      <Flex>
        <Box w='50%' paddingRight='1.5rem'>
          <Image src={item.variant.image.src} />
        </Box>

        <Box w='50%'>
          <Text fontWeight='bold' fontSize='1.2rem'>
            {item.title}
          </Text>

          <Text>Quantity: {item.quantity}</Text>

          <Text>{item.variant.title}</Text>

          <Flex>
            <NumberInput
              onChange={(quantity) => updateCartItems(item.id, parseInt(quantity, 10))}
              min={0}
              defaultValue={item.quantity}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>

            <CloseButton onClick={() => removeCartItem(item.id)} />
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
}

export default CartItem;
