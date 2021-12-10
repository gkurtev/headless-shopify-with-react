export const graphQlRequestProducts = async (client, queryCallback) => {
  const query = client.query((root) => {
    root.addConnection('products', { args: { first: 99 } }, (product) => {
      queryCallback(product);
    });
  });

  const response = await client.send(query);

  const what = await response;

  return what.model;
};

export const graphQlRequestProductSingle = async (client, handle, queryCallback) => {
  const query = client.query((root) => {
    root.add('productByHandle', { args: { handle } }, (product) => {
      queryCallback(product);
    });
  });

  const response = await client.send(query);

  const what = await response;

  return what.model;
};
