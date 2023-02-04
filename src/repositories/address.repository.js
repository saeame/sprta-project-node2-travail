const {Sequelize} = require("sequelize");
const {Review, sequelize} = require("../models/index.js");
class AddressRepository {
    constructor(UserModel, AddressModel) {
        this.userModel = UserModel;
        this.addressModel = AddressModel;
    }

    // 주소 등록에 필요한 정보
    // 어떤 사람의 정보에 저장하는지?
    // 해당 주소가 이미 저장되어 있는지? -> 문자열 대조
    // userId를 이용해서 어떤 사람의 정보를 뒤질것인지 선언
    // 같은 userId의 주소들 중에서 현재 body로 받은 address와 같은것이 있는지 확인

    // 주소정보 저장
    createAddress = async (userId, address, addressName, name) => {
        // console.log("nara");
        // console.log(userId, address, addressName, name);
        try {
            const newAddressData = await this.addressModel.create(
                {
                    userId,
                    address,
                    addressName,
                    name,
                },
                {raw: true}
            );
            console.log(newAddressData);
            return {
                status: 200,
                success: true,
                message: "주소가 성공적으로 등록되었습니다.",
            };
        } catch (error) {
            error.name = "Database Error";
            error.message = "요청을 처리하지 못했습니다.";
            error.status = 400;
            throw error;
        }
    };

    // 해당 userId의 주소 찾기
    findAddress = async (userId) => {
        try {
            const findAddress = await this.addressModel.findOne({where: {id: userId}});
            return findAddress;
        } catch (error) {
            // DB에서 발생한 Error
            error.name = "Database Error";
            // error.message = "요청을 처리하지 못하였습니다.";
            error.status = 400;
            throw error;
        }
    };

    getAddress = async (userId) => {
        // console.log(userId);
        try {
            const existingAddress = await this.addressModel.findAll({
                attributes: ["address", "addressName", "name"],
                where: {userId},
            });
            console.log(existingAddress);
            return {existingAddress};
        } catch (error) {
            error.name = "Database Error";
            // error.message = "요청을 처리하지 못하였습니다.";
            error.status = 400;
            throw error;
        }
    };

    editAddress = async (userId, address, addressName, name) => {
        //
        try {
            await this.addressModel.update({address}, {addressName}, {name}, {where: {userId}});
            return {status: 200, success: true, message: "주소가 수정되었습니다."};
        } catch (error) {
            error.name = "Database Error";
            // error.message = "요청을 처리하지 못하였습니다.";
            error.status = 400;
            throw error;
        }
    };
    deleteAddress = async (addressId) => {
        try {
            await addressModels.destroy({where: {id: addressId}});
            return {status: 200, success: true, message: "주소가 삭제되었습니다."};
        } catch (error) {
            error.name = "Database Error";
            // error.message = "요청을 처리하지 못하였습니다.";
            error.status = 400;
            throw error;
        }
    };
}

module.exports = AddressRepository;
