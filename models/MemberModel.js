// import { Sequelize } from "sequelize";
// import db from "../config/Database.js";

// const { DataTypes } = Sequelize;

// const Anggota = db.define('anggota', {
//     uuid: {
//         type: DataTypes.STRING,
//         defaultValue: DataTypes.UUIDV4,
//         allowNull: false,
//         validate: {
//             notEmpty: true
//         }
//     },
//     kodeAnggota: {
//         type: DataTypes.STRING,
//         allowNull: false,
//         unique: true,
//         validate: {
//             notEmpty: true
//         }
//     },
//     nomorIndukSiswa: {
//         type: DataTypes.STRING,
//         allowNull: false,
//         unique: true,
//         validate: {
//             notEmpty: true
//         }
//     },
//     namaLengkap: {
//         type: DataTypes.STRING,
//         allowNull: false,
//         validate: {
//             notEmpty: true
//         }
//     },
//     namaPengguna: {
//         type: DataTypes.STRING,
//         allowNull: false,
//         unique: true,
//         validate: {
//             notEmpty: true
//         }
//     },
//     kataSandi: {
//         type: DataTypes.STRING,
//         allowNull: false,
//         validate: {
//             notEmpty: true
//         }
//     },
//     kelas: {
//         type: DataTypes.STRING,
//         allowNull: false,
//         validate: {
//             notEmpty: true
//         }
//     },
//     alamat: {
//         type: DataTypes.STRING,
//         allowNull: false,
//         validate: {
//             notEmpty: true
//         }
//     }
// }, {
//     freezeTableName: true
// });

// export default Anggota;
