const {Sequelize} = require("sequelize");
const Op = Sequelize.Op;
const {Review, sequelize} = require("../models/index.js");
class AddressRepository {
    constructor(UserModel, AddressModel) {
        this.userModel = UserModel;
        // console.log(AddressModel);
        this.addressModel = AddressModel;
    }

    // 주소 등록에 필요한 정보
    // 어떤 사람의 정보에 저장하는지?
    // 해당 주소가 이미 저장되어 있는지? -> 문자열 대조
    // userId를 이용해서 어떤 사람의 정보를 뒤질것인지 선언
    // 같은 userId의 주소들 중에서 현재 body로 받은 address와 같은것이 있는지 확인

    // 주소정보 저장
    createthisAddress = async (userId, address, name, addressName) => {
        console.log("---------------------------------");
        try {
            const newAddressData = await this.addressModel.create(
                {
                    userId,
                    address,
                    name,
                    addressName,
                },
                {raw: true}
            );
            return {
                status: 200,
                success: true,
                message: "주소가 성공적으로 등록되었습니다.",
            };
        } catch (error) {
            error.name = "Database Error";
            error.status = 400;
            throw error;
        }
    };

    getAddress = async (userId) => {
        try {
            const existingAddress = await this.addressModel.findAll({
                attributes: ["address", "addressName", "name"],
                where: {userId: userId},
                raw: true,
            });
            return existingAddress;
        } catch (error) {
            console.log(error);
            error.name = "Database Error";
            error.status = 400;
            throw error;
        }
    };

    // 해당 userId/addressId의 주소 찾기
    findAddress = async (userId, addressId) => {
        try {
            const findAddress = await this.addressModel.findOne({
                where: {userId: userId, addressId: addressId},
                raw: true,
            });
            return findAddress;
        } catch (error) {
            console.log(error);
            error.name = "Database Error";
            error.status = 400;
            throw error;
        }
    };

    editAddress = async (userId, addressId, address, addressName, name) => {
        try {
            await this.addressModel.update(
                {address, addressName, name},
                {
                    where: {userId, addressId},
                }
            );
            return {status: 200, success: true, message: "주소가 수정되었습니다."};
        } catch (error) {
            error.name = "Database Error";

            error.status = 400;
            throw error;
        }
    };
    deleteAddress = async (userId, addressId) => {
        try {
            await this.addressModel.destroy({where: {userId, addressId}});
            return {status: 200, success: true, message: "주소가 삭제되었습니다."};
        } catch (error) {
            error.name = "Database Error";
            error.status = 400;
            throw error;
        }
    };
}

module.exports = AddressRepository;
