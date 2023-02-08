const ProductService = require("../services/product.service");

class ProductController {
    productService = new ProductService();

    getAllProduct = async (req, res, next) => {
        const products = await this.productService.getAllProduct();
        res.status(200).json({products});
    };

    getProduct = async (req, res, next) => {
        try {
            let {productId} = req.params;
            const productDetail = await this.productService.getProduct(productId);
            res.json({data: productDetail});
        } catch (err) {
            next(err);
        }
    };
    createProduct = async (req, res) => {
        try {
            const {userData} = req;
            const {name, photo, price, quantity, active, description} = req.body;
            await this.productService.createProduct(
                userData.admin,
                name,
                photo,
                price,
                quantity,
                active,
                description
            );
            return res.status(201).json({message: "상품이 정상적으로 등록되었습니다."});
        } catch (error) {
            return res.status(error.status).json({success: error.success, message: error.message});
        }
    };
    editProduct = async (req, res) => {
        try {
            const {userData} = req;
            const {productId} = req.params;
            const {name, photo, price, quantity, active, description} = req.body;
            const editProductResult = await this.productService.editProduct(
                userData.admin,
                productId,
                name,
                photo,
                price,
                quantity,
                active,
                description
            );
            return res.status(200).json({editProductResult});
        } catch (error) {
            return res.status(405).json({message: error.message});
        }
    };

    removeProduct = async (req, res, next) => {
        try {
            const productId = +req.params.productId;
            await this.productService.removeProduct(productId);

            res.status(200).json({message: "상품이 정상적으로 삭제되었습니다."});
        } catch (err) {
            next(err);
        }
    };
}

module.exports = ProductController;
