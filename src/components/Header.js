import { Flex, Text, Button, Box } from '@chakra-ui/react';
import React from 'react';

function Header() {
  const openCart = () => {
    console.log('opened cart');
  };

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
