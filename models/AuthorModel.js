import { DataTypes, Model } from "sequelize";
import { sequelize } from "../db.js";

// export const Author = sequelize.define("Author",{
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
//     age: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//     }
// },{
//     freezeTableName: true,
// });

export class Author extends Model {}

Author. init({
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
    age: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
},{
    sequelize: sequelize,
    modelName: "Author",
    freezeTableName: true,
})

