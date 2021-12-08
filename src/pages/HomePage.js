import { Grid } from '@chakra-ui/layout';
import React, { useContext, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import { ShopContext } from '../contexts/ShopContextProvider';

function HomePage() {
  const { products, fetchAllProducts } = useContext(ShopContext);

  useEffect(() => {
    fetchAllProducts();
  }, [fetchAllProducts]);

  if (!products.length) return <p>...Loading</p>;

  return (
    <div>
      <Grid templateColumns='repeat(3,1fr)'>
        {products.map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </Grid>
    </div>
  );
}

export default HomePage;
