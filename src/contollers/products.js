const createProduct = async (req, res, next) => {
  res.status(200).json({
    success: true,
    data: {
      product: 'Keyboard',
    },
  });
  next();
};

module.exports = {
  createProduct,
};
