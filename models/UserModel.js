import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Users = db.define('users', {
    uuid: {
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [3, 100]
        }
    },
    user_class: {
        type: DataTypes.STRING,
        allowNull: true, 
        validate: {
            len: [1, 50]
        }
    },
    address: {
        type: DataTypes.STRING,
        allowNull: true, 
        validate: {
            len: [1, 255] 
        }
    },
    phone_number: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            isNumeric: true, 
            len: [6, 20]
        }
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            isEmail: true
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    } 
}, {
    freezeTableName: true
});

export default Users;
