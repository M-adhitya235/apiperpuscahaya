import { Sequelize } from "sequelize";
import mysql2 from 'mysql2';
import dotenv from "dotenv";

dotenv.config();

const db = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    dialectModule: mysql2 
});

export default db;
