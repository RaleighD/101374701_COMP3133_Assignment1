const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('./schemas/schema');
const resolvers = require('./resolvers/resolvers');
const connectDB = require('./utils/db');

async function startServer() {
    const app = express();
    const apolloServer = new ApolloServer({
        typeDefs,
        resolvers,
        context: ({ req }) => ({ req }),
    });

    await apolloServer.start();
    apolloServer.applyMiddleware({ app });

    await connectDB();

    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => {
        console.log(`🪿Server ready at http://localhost:${PORT}${apolloServer.graphqlPath}`);
    });
}



startServer().catch(error => {
    console.error('Failed to start the server', error);
});

