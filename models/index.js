import { DataTypes } from "sequelize";
import { Author } from "./AuthorModel.js";
import { Book } from "./BookModel.js";

Author.hasMany(Book);
Book.belongsTo(Author, {
    foreignKey: {
        type: DataTypes.STRING,
        allowNull: false,
    }
});

export const dbModels = { Author, Book };