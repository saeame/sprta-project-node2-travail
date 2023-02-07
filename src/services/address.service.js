const AddressRepository = require("../repositories/address.repository.js");
const {User, Address} = require("../models/index.js");

class AddressService {
    //Repository
    addressRepository = new AddressRepository(User, Address);

    /// 주소등록
    createAddress = async (userId, address, addressName, name) => {
        try {
            //1. userId로 이미 존재하고 있는 주소들을 다 불러오기
            // -> 상세조회를 미들웨어로 쓸 순 없나?
            const existingAddress = await this.addressRepository.getAddress(userId);
            // const {address} = existingAddress.address

            for (let i = 0; i < existingAddress.length; i++) {
                console.log(existingAddress[i].address);
                if (existingAddress[i].address === address) {
                    const error = new Error("이미 등록된 주소입니다.");
                    error.name = "Already exist";
                    error.status = 412;
                    error.success = false;
                    throw error;
                }
            }
            const newAddress = await this.addressRepository.createthisAddress(
                userId,
                address,
                addressName,
                name
            );
        } catch (error) {
            throw error;
        }
    };

    getAddress = async (userId) => {
        const existingAddress = await this.addressRepository.getAddress(userId);
        // console.log(existingAddress);
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

    getThisAddress = async (userId, addressId) => {
        const thisAddress = await this.addressRepository.findAddress(userId, addressId);
        if (!thisAddress) {
            const error = new Error("해당 주소가 존재하지 않습니다.");
            error.name = "Address Not Found";
            error.status = 400;
            throw error;
        }

        return {
            address: thisAddress.address,
            addressName: thisAddress.addressName,
            name: thisAddress.name,
        };
    };

    editAddress = async (userId, addressId, address, addressName, name) => {
        try {
            const findAddress = await this.addressRepository.findAddress(userId, addressId);

            if (!findAddress) {
                const error = new Error("해당 유저의 주소가 존재하지 않습니다.");
                error.name = "Address Not Found";
                error.status = 400;
                throw error;
            }
            return await this.addressRepository.editAddress(
                userId,
                addressId,
                address,
                addressName,
                name
            );
        } catch (error) {
            throw error;
        }
    };
    deleteAddress = async (userId, addressId) => {
        try {
            const findAddress = await this.addressRepository.findAddress(userId, addressId);
            if (!findAddress) {
                const error = new Error("삭제할 주소가 존재하지 않습니다.");
                error.name = "Address Not Found";
                error.status = 400;
                throw error;
            }
            return await this.addressRepository.deleteAddress(userId, addressId);
        } catch (error) {
            error.name = "Database Error";
            // error.message = "요청을 처리하지 못하였습니다.";
            error.status = 400;
            throw error;
        }
    };
}

module.exports = AddressService;
