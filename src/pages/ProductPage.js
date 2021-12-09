import { Image } from '@chakra-ui/image';
import { Flex, Box, Text } from '@chakra-ui/layout';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { ShopContext } from '../contexts/ShopContextProvider';

function ProductPage() {
  const { handle } = useParams();

  const [currentProduct, setCurrentProduct] = useState();

  const [selectedVariant, setSelectedVariant] = useState();

  const { product, products, updateProducts, fetchProductByHandle } = useContext(ShopContext);

  useEffect(() => {
    const hasMatchingProduct = products.find((x) => x.handle === handle);

    if (hasMatchingProduct) {
      setCurrentProduct(hasMatchingProduct);
      setSelectedVariant(hasMatchingProduct.variants.find((variant) => variant.available));
    } else {
      fetchProductByHandle(handle).then(() => {
        if (product.handle) {
          setCurrentProduct(product);
          setSelectedVariant(product.variants.find((variant) => variant.available));
          updateProducts(product);
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product.handle]);

  if (!currentProduct) return <p>...Loading</p>;

  return (
    <div className='product-page'>
      <div className='breadcrumbs'>
        <Link to='/'>Homepage</Link>/<span>{currentProduct.title}</span>
      </div>

      <Flex>
        <Box w='50%'>
          <Image objectFit='cover' src={currentProduct.variants[0].image.src} />
        </Box>

        <Box w='50%'>
          <Text mb='1rem' fontWeight='bold' fontSize='2.4rem'>
            {currentProduct.title}
          </Text>

          {currentProduct.description && <Text>{currentProduct.description}</Text>}
        </Box>
      </Flex>
    </div>
  );
}

export default ProductPage;
