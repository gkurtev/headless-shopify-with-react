import { Flex, Text, Button, Box } from '@chakra-ui/react';
import React, { useContext } from 'react';
import { ShopContext } from '../contexts/ShopContextProvider';

function Header() {
  const { openCart } = useContext(ShopContext);

  return (
    <Box>
      <Flex marginBottom='4rem' justifyContent='center' flexWrap='wrap' textAlign='center'>
        <Text w='100%'>Header component</Text>
        <Button onClick={openCart}>Open cart</Button>
      </Flex>
    </Box>
  );
}

export default Header;
