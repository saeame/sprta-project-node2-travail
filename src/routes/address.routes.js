const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth.middleware");
const AddressController = require("../controllers/address.controller.js");
const addressController = new AddressController();

//회원 주소등록
router.post("/:userId/address/addnew/", authMiddleware, addressController.addnewAddress);

//회원 주소조회
router.get("/:userId/address", authMiddleware, addressController.getAddress);

//회원 주소 상세조회
router.get("/:userId/address/:addressId", authMiddleware, addressController.getthisAddress);

//회원 주소수정
router.patch("/:userId/address/:addressId", authMiddleware, addressController.editAddress);

//회원 주소삭제
router.delete("/:userId/address/:addressId", authMiddleware, addressController.deleteAddress);
////
console.log("----------------------------------------------");
module.exports = router;
