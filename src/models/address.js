"use strict";
const {Model} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Address extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    Address.init(
        {
            addressId: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.STRING,
            },
            address: {
                allowNull: false,
                unique: true,
                type: DataTypes.STRING,
            },

            addressName: {
                allowNull: false,
                unique: true,
                type: DataTypes.STRING,
            },

            name: {
                allowNull: false,
                type: DataTypes.STRING,
            },
        },
        {
            sequelize,
            modelName: "Address",
        }
    );
    return Address;
};
