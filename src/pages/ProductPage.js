import { Image } from '@chakra-ui/image';
import { Flex, Box, Text } from '@chakra-ui/layout';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import VariantOptions from '../components/VariantOptions';
import { ShopContext } from '../contexts/ShopContextProvider';

function ProductPage() {
  const { handle } = useParams();

  const [selectedVariant, setSelectedVariant] = useState();

  const { product, fetchProductByHandle } = useContext(ShopContext);

  useEffect(() => {
    fetchProductByHandle(handle).then(() => {
      if (product.handle) {
        setSelectedVariant(product.variants.find((variant) => variant.available));
      }
    });
  }, [fetchProductByHandle, handle, product.handle]);

  const renderVariantOptions = () => {
    return <VariantOptions activeVariant={selectedVariant} options={product.options} />;
  };

  if (!product.handle) return <p>...Loading</p>;

  return (
    <div className='product-page'>
      <div className='breadcrumbs'>
        <Link to='/'>Homepage</Link>/<span>{product.title}</span>
      </div>

      <Flex>
        <Box w='50%'>
          <Image objectFit='cover' src={product.variants[0].image.src} />
        </Box>

        <Box w='50%'>
          <Text mb='1rem' fontWeight='bold' fontSize='2.4rem'>
            {product.title}
          </Text>

          {product.description && <Text>{product.description}</Text>}

          {product.variants.length > 1 && renderVariantOptions()}
        </Box>
      </Flex>
    </div>
  );
}

export default ProductPage;
