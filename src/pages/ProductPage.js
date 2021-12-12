import { Button } from '@chakra-ui/button';
import { Image } from '@chakra-ui/image';
import { Flex, Box, Text } from '@chakra-ui/layout';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { ShopContext } from '../contexts/ShopContextProvider';

function ProductPage() {
  const { handle } = useParams();

  const [currentProduct, setCurrentProduct] = useState();

  const [colorGroupProducts, setColorGroupProducts] = useState([]);

  const [selectedVariant, setSelectedVariant] = useState({});

  const {
    addToCart,
    fetchCollectionByHandle,
    product,
    openCart,
    products,
    updateProducts,
    fetchProductByHandle,
  } = useContext(ShopContext);

  useEffect(() => {
    const hasMatchingProduct = products.find((x) => x.handle === handle);

    if (hasMatchingProduct) {
      const selectedVariant = hasMatchingProduct.variants.find(
        (variant) => variant.availableForSale
      );

      setCurrentProduct(hasMatchingProduct);
      setSelectedVariant(selectedVariant ? selectedVariant : hasMatchingProduct.variants[0]);
      colorGroups(hasMatchingProduct);
    } else {
      fetchProductByHandle(handle).then(() => {
        if (product.handle) {
          const selectedVariant = product.variants.find((variant) => variant.availableForSale);
          setCurrentProduct(product);
          setSelectedVariant(selectedVariant ? selectedVariant : product.variants[0]);
          updateProducts(product);
          colorGroups(product);
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product.handle]);

  const colorGroups = (product) => {
    const hasColorGroups = product.collections.find((collection) =>
      collection.handle.includes('color')
    );

    if (hasColorGroups) {
      fetchCollectionByHandle(hasColorGroups.handle).then((productsData) => {
        setColorGroupProducts(productsData);
      });
    }
  };

  const changeColor = (handle) => {
    const selectedProduct = colorGroupProducts.find((x) => x.handle === handle);
    const selectedVariant = selectedProduct.variants.find((x) => x.availableForSale);
    const sourceUrl = window.location.href;
    const lastIndex = sourceUrl.lastIndexOf('/');
    const filteredUrl = sourceUrl.slice(0, lastIndex + 1);

    window.history.pushState({}, null, filteredUrl + handle);

    setCurrentProduct(selectedProduct);
    setSelectedVariant(selectedVariant ? selectedVariant : selectedProduct.variants[0]);
  };

  const renderColorGroups = () => {
    return (
      <Box marginTop='1rem'>
        <Box marginBottom='1rem'>
          <Text>Color: {currentProduct.variants[0].title.split('/')[0].trim()}</Text>
        </Box>

        <Box>
          <Flex margin='-0.5rem'>
            {colorGroupProducts.map((colorGroup) => {
              const color = colorGroup.variants[0].title.split('/')[0].trim();
              const isActive = colorGroup.handle === currentProduct.handle;
              return (
                <Box padding='0.5rem' key={colorGroup.handle}>
                  <Button
                    color='white'
                    isActive={isActive}
                    backgroundColor={color}
                    onClick={() => changeColor(colorGroup.handle)}
                  >
                    {color}
                  </Button>
                </Box>
              );
            })}
          </Flex>
        </Box>
      </Box>
    );
  };

  const variantTitle = (title) => {
    return title.includes('/') ? title.split('/')[1].trim() : title;
  };

  const changeVariant = (variantId) => {
    setSelectedVariant(currentProduct.variants.find((x) => x.id === variantId));
  };

  const selectedSizeText = () => {
    return selectedVariant?.title?.includes('/')
      ? selectedVariant.title?.split('/')[1].trim()
      : selectedVariant.title;
  };

  const handleAddToCart = () => {
    addToCart(selectedVariant.id).then(() => {
      openCart();
    });
  };

  if (!currentProduct) return <p>...Loading</p>;

  return (
    <div className='product-page'>
      <div className='breadcrumbs'>
        <Link to='/'>Homepage</Link>/<span>{currentProduct.title}</span>
      </div>

      <Flex>
        <Box w='50%'>
          <Image objectFit='cover' src={currentProduct.images[0].src} />
        </Box>

        <Box w='50%'>
          <Text mb='1rem' fontWeight='bold' fontSize='2.4rem'>
            {currentProduct.title}
          </Text>

          {currentProduct.description && <Text>{currentProduct.description}</Text>}

          {colorGroupProducts.length > 0 && renderColorGroups()}

          {currentProduct.variants.length > 1 && (
            <Box marginTop='1rem'>
              <Box marginBottom='1rem'>
                <Text>Size: {selectedSizeText()}</Text>
              </Box>

              <Flex margin='-0.5rem' flexWrap='wrap'>
                {currentProduct.variants.map((variant) => {
                  const isActiveVariant = variant.id === selectedVariant.id;
                  const isDisabled = !variant.availableForSale;
                  return (
                    <Box key={variant.id} padding='0.5rem'>
                      <Button
                        onClick={() => changeVariant(variant.id)}
                        disabled={isDisabled}
                        isActive={isActiveVariant}
                      >
                        {variantTitle(variant.title)}
                      </Button>
                    </Box>
                  );
                })}
              </Flex>
            </Box>
          )}

          <Box marginTop='2rem'>
            <Button
              bg='black'
              color='white'
              onClick={() => handleAddToCart()}
              disabled={!selectedVariant.availableForSale}
            >
              {selectedVariant.availableForSale ? 'Add to cart' : 'Sold out'}
            </Button>
          </Box>
        </Box>
      </Flex>
    </div>
  );
}

export default ProductPage;
