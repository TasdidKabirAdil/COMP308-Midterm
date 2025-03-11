const typeDefs = `#graphql
    type Prompt {
        id: ID!
        chatId: String!
        prompt: String!
        response: String!
        createdAt: String!
        chatTitle: String!
        upVotes: Int!
        downVotes: Int!
    }

    type Query {
        prompts: [Prompt]
    }

    type Mutation {
        addPrompt(
            chatId: String!
            prompt: String!
            response: String!
            createdAt: String!
            chatTitle: String!
            upVotes: Int
            downVotes: Int
        ): Prompt

        deletePrompt(id: ID!): Prompt
    }
`

module.exports = typeDefs;