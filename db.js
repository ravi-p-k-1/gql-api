import { DataTypes, Sequelize } from "sequelize";

const USER = 'postgres';
const PASSWORD = 'ravikth';
const URL = 'localhost';
const PORT = 5432;
const DATABASE = 'graphql';

export const sequelize = new Sequelize(`postgres://${USER}:${PASSWORD}@${URL}:${PORT}/${DATABASE}`);

export async function authenticateConnection(){
    try {
        await sequelize.authenticate();
        console.log('Connection Successfull');
    } catch (error) {
        console.log('Connection Failed',error);
    }
}

