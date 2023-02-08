const router = require("express").Router();
const { authMiddleware, authAdmin } = require("../middleware/auth.middleware");
const ProductController = require("../controllers/product.controller");
const productController = new ProductController();

/* 전체 공개 */
//상품목록조회
router.get("/", productController.getAllProduct);

//상품상세조회
router.get("/:productId", productController.getProduct);

//상품등록
router.post("/admin", authMiddleware, authAdmin, productController.createProduct);

//상품수정
router.patch("/admin/:productId", authMiddleware, authAdmin, productController.updateProduct);

//상품삭제
router.delete("/admin/:productId", authMiddleware, authAdmin, productController.removeProduct);

module.exports = router;
