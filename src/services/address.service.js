const AddressRepository = require("../repositories/address.repository.js");
const {User, Address} = require("../models/index.js");
class AddressService {
    //Repository
    addressRepository = new AddressRepository(User, Address);
    createAddress = async (userId, address, addressName, name) => {
        //1. userId로 이미 존재하고 있는 주소들을 다 불러오기
        // -> 상세조회를 미들웨어로 쓸 순 없나?
        // const {existingAddress} = await this.addressRepository.getAddress(userId)
        // -> {addressId, userId, address, addressname, name} 이렇게 있을건데.. 객체를 배열로 뽑아보기..?
        //const thisAddress = existingAddress.map((obj) => obj.userId);
        // 윗줄로 배열 완성! /
        // 하나하나 배열을 돌면서 현재 들어와있는 바디값이랑 비교해보기
        //

        // ---------------------------------------------------------------------

        //2. 그 주소들과 현재값을 비교해서 이미 존재하는 주소, 주소이름이 없을 때만 아래 함수 실행
        // const

        //if (!)

        try {
            // console.log(userId, address, addressName, name);
            const newAddress = await this.addressRepository.createAddress(
                userId,
                address,
                addressName,
                name
            );

            return newAddress;
        } catch (error) {
            throw error;
        }
    };

    getAddress = async (userId) => {
        const existingAddress = await this.addressRepository.getAddress(userId);
        console.log(existingAddress);
        const theirAddress = existingAddress.map((address) => {
            return {
                address: address.address,
                addressName: address.addressName,
                name: address.name,
            };
        });
        if (theirAddress.length === 0) {
            const error = new Error("등록된 주소가 없습니다.");
            error.name = "Address does not exist";
            error.status = 404;
            error.success = false;
            throw error;
        }
        return theirAddress;
    };
    editAddress = async (userId, address, addressName, name) => {
        try {
            const findAddress = await this.addressRepository.findAddress(userId);

            if (!findAddress) {
                const error = new Error("해당 유저의 주소가 존재하지 않습니다.");
                error.name = "Address Not Found";
                error.status = 400;
                throw error;
            }
            return await this.addressRepository.editAddress(userId, address, addressName, name);
        } catch (error) {
            throw error;
        }
    };
    deleteAddress = async (addressId) => {
        try {
            const findAddress = await this.addressRepository.findAddress(addressId);
            if (!findAddress) {
                const error = new Error("삭제할 주소가 존재하지 않습니다.");
                error.name = "Address Not Found";
                error.status = 400;
                throw error;
            }
            return await this.addressRepository.deleteAddress(addressId);
        } catch (error) {
            error.name = "Database Error";
            // error.message = "요청을 처리하지 못하였습니다.";
            error.status = 400;
            throw error;
        }
    };
}

module.exports = AddressService;
