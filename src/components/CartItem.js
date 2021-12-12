import { Box, Flex, Image, Text } from '@chakra-ui/react';
import React from 'react';
function CartItem(props) {
  const { item } = props;
  return (
    <Box marginBottom='2rem'>
      <Flex>
        <Box w='50%' paddingRight='1.5rem'>
          <Image src={item.variant.image.src} />
        </Box>

        <Box w='50%'>
          <Text>{item.title}</Text>
          <Text>{item.quantity}</Text>
          <Text>{item.variant.title}</Text>
        </Box>
      </Flex>
    </Box>
  );
}

export default CartItem;
