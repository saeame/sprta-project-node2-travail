const db = require('../models');
const { Item } = require('../models');

class ProductRepository {
  getAllProduct = async () => {
    try {
      const data = await Item.findAll({
        order: [['createdAt', 'DESC']],
      });

      const productData = data.map((data) => {
        const { productId, name, photo, price, active } = data;

        return {
          productId,
          name,
          photo,
          price,
          active,
        };
      });

      return productData;
    } catch (error) {
      error.status = 500;
      throw error;
    }
  };

  getProduct = async (productId) => {
    try {
      const data = await Item.findOne({
        where: { id: productId },
      });

      return data;
    } catch (error) {
      error.status = 500;
      throw error;
    }
  };
}

module.exports = ProductRepository;
