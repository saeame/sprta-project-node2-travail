const {addNewAddressValidation} = require("../../validations");
const AddressService = require("../services/address.service.js");

class AddressController {
    // Service
    addressService = new AddressService();

    // 새 주소 등록 [미완료 - 기존 주소와 대조하는 로직 짜야함]
    addnewAddress = async (req, res) => {
        // auth Middleware에서 인증후 넘어오게 한다면?
        // const {userId} = res.locals.user

        try {
            const {userId} = req.params;
            // console.log(req.body);
            const {address, addressName, name} = await addNewAddressValidation.validateAsync(
                req.body
            );
            // const
            const user_address = await this.addressService.createAddress(
                userId,
                address,
                addressName,
                name
            );
            // console.log(user_address);
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
            const theirAddress = await this.addressService.getAddress(userId);
            // console.log(theirAddress);
            return res.status(200).json({theirAddress});
        } catch (error) {
            return res.status(error.status).json({success: error.success, message: error.message});
        }
    };

    // 회원주소 상세정보조회 - 미완료
    getthisAddress = async (req, res) => {
        try {
            const {userId} = req.params;
            console.log(req.query);
            const {addressId} = req.query;
            // console.log({addressId});
        } catch (error) {}
    };

    // 회원정보 수정// 미완료
    editAddress = async (req, res) => {
        try {
            const userId = req.params;
            const {address, addressName, name} = await addNewAddressValidation.validateAsync(
                req.body
            );
            // console.log(userId);
            // console.log(req.body);
            const editAddressResult = await this.addressService.editAddress(
                userId,
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
    // 회원정보삭제 // 미완료
    deleteAddress = async (req, res) => {
        try {
            const addressId = req.params;
            const destoyAddress = await this.addressService.deleteAddress(addressId);
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
