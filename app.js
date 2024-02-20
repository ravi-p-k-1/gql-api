import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import schema from './schema/Schema.js'
import { authenticateConnection, sequelize } from './db.js';
import { dbModels } from './models/index.js';

const app = express();

const PORT = 4000;

app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true,
}));

app.listen(PORT, ()=>{
    console.log(`running on ${PORT}`);
});

await sequelize.sync();

authenticateConnection();


