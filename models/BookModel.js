import { DataTypes, Model } from "sequelize";
import { sequelize } from "../db.js";

// export const Book = sequelize.define("Book",{
//     id: {
//         type: DataTypes.UUID, 
//         defaultValue: DataTypes.UUIDV4,
//         primaryKey: true,
//         allowNull: false,
//     },
//     name: {
//         type: DataTypes.STRING,
//         allowNull: false,
//     },
//     genre: {
//         type: DataTypes.STRING,
//         allowNull: false,
//     }
// },{
//     freezeTableName: true,
// });

export class Book extends Model{}

Book.init({
    id: {
        type: DataTypes.UUID, 
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    genre: {
        type: DataTypes.STRING,
        allowNull: false,
    }
},{
    sequelize: sequelize,
    modelName: "Book",
    freezeTableName: true,
})
