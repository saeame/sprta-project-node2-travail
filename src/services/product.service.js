const ProductRepository = require("../repositories/product.repository");
const {Product} = require("../models/index");

class ProductService {
    productRepository = new ProductRepository();

    async getAllProduct() {
        try {
            const data = await this.productRepository.getAllProduct();

            return data;
        } catch (error) {
            throw error;
        }
    }

    async getProduct(productId) {
        try {
            const data = await this.productRepository.getProduct(productId);

            return data;
        } catch (error) {
            throw error;
        }
    }

    async createProduct(admin, name, photo, price, quantity, active, description) {
        try {
            if (admin !== true) {
                const error = new Error("상품을 등록할 권한이 없습니다.");
                error.name = "";
                error.status = 412;
                error.success = false;
                throw error;
            }
            await this.productRepository.createProduct(
                name,
                photo,
                price,
                quantity,
                active,
                description
            );
        } catch (error) {
            throw error;
        }
    }
    async editProduct(admin, productId, name, photo, price, quantity, active, description) {
        try {
            const findProduct = await this.productRepository.getProduct(productId);
            if (!findProduct) {
                const error = new Error("해당 상품이 존재하지 않습니다.");
                error.name = "Product Not Found";
                error.status = 400;
                throw error;
            } else if (admin === true) {
                const error = new Error("상품을 수정할 권한이 없습니다.");
                error.name = "Authorization Error";
                error.status = 412;
                error.success = false;
                throw error;
            }
            await this.productRepository.editProduct(
                productId,
                name,
                photo,
                price,
                quantity,
                active,
                description
            );
        } catch (err) {
            throw err;
        }
    }

    async removeProduct(productId) {
        try {
            await this.productRepository.removeProduct(productId);
        } catch (err) {
            throw err;
        }
    }
}

module.exports = ProductService;
