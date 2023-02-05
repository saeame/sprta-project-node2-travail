const router = require('express').Router();

const ProductController = require('../controllers/product.controller');
const productController = new ProductController();

/* 전체 공개 */
//상품목록조회
router.get('/', productController.getAllProduct);
//상품상세조회
router.get('/:productId', productController.getProduct);
//상품등록
router.post('/admin/:productId', productController.createProduct);
//상품수정 (check)
// router.patch('/admin/:productId', ProductController.editProduct);
//상품삭제
router.delete('/admin/:productId', productController.removeProduct);

module.exports = router;
