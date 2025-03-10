const Prompt = require('../models/prompt')

const resolvers = {
    Query: {
        prompts: async() => {
            try {
                const prompts = await Prompt.find()
                return prompts.map((prompt) => ({
                    id: prompt._id.toString(),
                    ...prompt.toObject()
                }))
            } catch(error) {
                console.error("Error fetching prompts", error)
                throw new Error('Failed to fetch prompts')
            }
        }
    },

    Mutation: {
        addPrompt: async(_, args) => {
            try {
                const prompt = new Prompt(args)
                const newPrompt = await prompt.save()
                return {
                    id: newPrompt._id.toString(),
                    ...newPrompt.toObject()
                }
            } catch(error) {
                console.error("Error adding prompts", error)
                throw new Error(`Failed to add prompt for id: ${id}`)
            }
        },

        deletePrompt: async(_, { id }) => {
            try {
                const deletedPrompt = await Prompt.findByIdAndDelete(id)
                if(!deletedPrompt){
                    throw new Error(`Prompt with id: ${id} not found`)
                }
                return {
                    id: deletedPrompt._id.toString(),
                    ...deletedPrompt.toObject()
                }
            } catch(error) {
                console.error("Error deleting prompts", error)
                throw new Error(`Failed to delete prompt for id: ${id}`)
            }
        }
    }

}

module.exports = resolvers;