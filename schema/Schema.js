import graphql from "graphql";
import { dbModels } from "../models/index.js";
import { where } from "sequelize";

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
} = graphql;

const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve: (parent, args) => {
        return dbModels.Author.findOne({where: {id: parent.AuthorId}});
      },
    },
  }),
});

const AuthorType = new GraphQLObjectType({
  name: "Author",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    books: {
      type: new GraphQLList(BookType),
      resolve: async (parent, args) => {
        return await dbModels.Book.findAll({where:{AuthorId: parent.id}});
      },
    },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    book: {
      type: BookType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve: async (parent, args)=> {
        return await dbModels.Book.findOne({where:{id: args.id}});
      },
    },
    author: {
      type: AuthorType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve: async (parent, args)=> {
        return await dbModels.Author.findOne({where:{id: args.id}});
      },
    },
    books: {
      type: new GraphQLList(BookType),
      resolve: async () => {
        return await dbModels.Book.findAll();
      },
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve: async () => {
        return await dbModels.Author.findAll();
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: "mutation",
  fields: {
    addAuthor: {
      type: AuthorType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: new GraphQLNonNull(GraphQLInt) },
      },
      resolve: async (parent, args) => {
        return await dbModels.Author.create({
          ...args,
        });
      },
    },
    addBook: {
      type: BookType,
      args: {
        name: {type: new GraphQLNonNull(GraphQLString)},
        genre: {type: new GraphQLNonNull(GraphQLString)},
        AuthorId: {type: new GraphQLNonNull(GraphQLID)},
      },
      resolve: async(parent, args)=>{
        return await dbModels.Book.create({
          ...args,
        })
      }
    }
  },
});

export default new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
