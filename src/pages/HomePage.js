import React, { useContext, useEffect } from 'react';
import { ShopContext } from '../contexts/ShopContextProvider';

function HomePage() {
  const { products, fetchAllProducts } = useContext(ShopContext);

  useEffect(() => {
    fetchAllProducts();
  }, [fetchAllProducts]);

  if (!products.length) return <p>...Loading</p>;

  return (
    <div>
      <ul className='products-list'>
        {products.map((product) => (
          <h2 key={product.id}>{product.title}</h2>
        ))}
      </ul>
    </div>
  );
}

export default HomePage;
