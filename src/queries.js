export const productQuery = (product) => {
  product.add('title');
  product.add('handle');
  product.add('id');
  product.add('description');
  product.add('tags');
  product.addConnection('collections', { args: { first: 99 } }, (collection) => {
    collection.add('id');
    collection.add('handle');
  });
  product.addConnection('images', { args: { first: 99 } }, (image) => {
    image.add('src');
  });
  product.addConnection('variants', { args: { first: 99 } }, (variant) => {
    variant.add('id');
    variant.add('price');
    variant.add('compareAtPrice');
    variant.add('title');
    variant.add('availableForSale');
    variant.add('quantityAvailable');
  });
};
