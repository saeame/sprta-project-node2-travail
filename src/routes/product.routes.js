const router = require("express").Router();
const authMiddleware = require("../middleware/auth.middleware");
const ProductController = require("../controllers/product.controller");
const productController = new ProductController();

/* 전체 공개 */
//상품목록조회
router.get("/", productController.getAllProduct);

//상품상세조회
router.get("/:productId", productController.getProduct);

//상품등록
router.post("/admin", authMiddleware, productController.createProduct);

//상품수정
router.patch("/admin/:productId", authMiddleware, productController.editProduct);

//상품삭제
router.delete("/admin/:productId", authMiddleware, productController.removeProduct);

module.exports = router;
