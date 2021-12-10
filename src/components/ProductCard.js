import { Box, Text, LinkBox, LinkOverlay } from '@chakra-ui/layout';
import { Image } from '@chakra-ui/react';
import React from 'react';
import { Link as ReachLink } from 'react-router-dom';

function ProductCard(props) {
  const { product } = props;

  return (
    <LinkBox paddingTop='50%'>
      <Box position='absolute' w='100%' h='100%' left={0} top={0}>
        <Image
          src={product.images[0].src}
          position='absolute'
          left='0'
          top='0'
          w='100%'
          h='100%'
          objectFit='cover'
        />
        <LinkOverlay
          position='absolute'
          left='0'
          width='100%'
          top='0'
          height='100%'
          zIndex='5'
          fontSize={0}
          as={ReachLink}
          to={`/products/${product.handle}`}
        >
          {product.title}
        </LinkOverlay>
        <Text position='absolute' left='0' width='100%' bottom='0' padding='2rem'>
          {product.title}
        </Text>
      </Box>
    </LinkBox>
  );
}

export default ProductCard;
