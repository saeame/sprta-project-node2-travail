const {addNewAddressValidation} = require("../../validations");
const AddressService = require("../services/address.service.js");

class AddressController {
    // Service
    addressService = new AddressService();

    // 새 주소 등록
    addnewAddress = async (req, res) => {
        try {
            const {userData} = req;
            const {address, addressName, name} = await addNewAddressValidation.validateAsync(
                req.body
            );

            const user_address = await this.addressService.createAddress(
                userData.userId,
                address,
                addressName,
                name
            );
            return res
                .status(user_address.status)
                .json({success: user_address, message: user_address.message});
        } catch (error) {
            if (error.isJoi) {
                return res.status(422).json({message: error.details[0].message});
            }
            res.status(500).json({message: error.message});
        }
    };

    // 회원 주소 조회 [완료]
    getAddress = async (req, res) => {
        // auth Middleware에서 인증후 넘어오게 한다면?
        // const {userId} = res.locals.user
        try {
            const {userId} = req.params;
            // console.log(userId);
            const user_address = await this.addressService.getAddress(userId);
            // console.log(theirAddress);
            return res.status(200).json({user_address});
        } catch (error) {
            return res.status(error.status).json({success: error.success, message: error.message});
        }
    };

    // 회원주소 상세정보조회
    getthisAddress = async (req, res) => {
        try {
            const {userId, addressId} = req.params;
            const user_address_detail = await this.addressService.getThisAddress(userId, addressId);
            return res.status(200).json({user_address_detail});
        } catch (error) {
            return res.status(error.status).json({success: error.success, message: error.message});
        }
    };

    // 회원 주소 수정
    editAddress = async (req, res) => {
        try {
            const {userId, addressId} = req.params;
            const {address, addressName, name} = await addNewAddressValidation.validateAsync(
                req.body
            );

            const editAddressResult = await this.addressService.editAddress(
                userId,
                addressId,
                address,
                addressName,
                name
            );
            return res.status(200).json({editAddressResult});
        } catch (error) {
            if (error.name === "ValidationError") {
                error.status = 412;
                error.success = false;
                error.message = "데이터 형식이 올바르지 않습니다.";
            }
            return res.status(error.status).json({success: error.success, message: error.message});
        }
    };
    // 회원정보삭제 //
    deleteAddress = async (req, res) => {
        try {
            const {userId, addressId} = req.params;
            const destoyAddress = await this.addressService.deleteAddress(userId, addressId);
            return res.status(200).json({success: destoyAddress, message: destoyAddress.message});
        } catch (error) {
            if (error.name === "ValidationError") {
                error.status = 412;
                error.success = false;
                error.message = "데이터 형식이 올바르지 않습니다.";
            }
            return res.status(error.status).json({success: error.success, message: error.message});
        }
    };
}

module.exports = AddressController;
