const express = require("express");
const router = express.Router();

const AddressController = require("../controllers/address.controller.js");
const addressController = new AddressController();

//회원 주소등록
router.post("/address/addnew/:userId", addressController.addnewAddress);

//회원 주소조회
router.get("/address/:userId", addressController.getAddress);

//회원 주소수정
router.patch("/address/:userId", addressController.editAddress);

//회원 주소삭제
router.delete("/address/:userId", addressController.deleteAddress);
module.exports = router;
