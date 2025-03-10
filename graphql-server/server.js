require('dotenv')
const resolvers = require('./graphql/resolvers')
const typeDefs = require('./graphql/typeDefs')
const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const configMongoose = require('./configs/mongoose')

const startServer = async() => {
    await configMongoose()

    const server = new ApolloServer({
        resolvers,
        typeDefs
    })

    const { url } = await startStandaloneServer(server, {
        listen: { port: 4000 }
    })
    console.log(`Graphql server has started at ${url}`)
}

startServer();