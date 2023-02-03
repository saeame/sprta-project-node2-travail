"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    User.init(
        {
            userId: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER,
            },
            email: {
                allowNull: false,
                unique: true,
                type: DataTypes.STRING,
            },
            password: {
                allowNull: false,
                type: DataTypes.STRING,
            },
            phone: {
                allowNull: false,
                unique: true,
                type: DataTypes.INTEGER,
            },
            admin: {
                allowNull: true,
                type: DataTypes.BOOLEAN,
                defaultValue: false,
            },
            salt: {
                allowNull: false,
                type: DataTypes.STRING,
                unique: true,
            },
            name: {
                allowNull: false,
                type:DataTypes.STRING,
            }
        },
        {
            sequelize,
            tableName: "User",
            modelName: "User",
            timestamps: false,
        }
    );
    return User;
};
