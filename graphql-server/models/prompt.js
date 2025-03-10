const mongoose = require('mongoose')

const PromptSchema = new mongoose.Schema({
    chatId: { type: String, unique: true, require: true },
    prompt: String,
    response: String,
    createdAt: String,
    chatTitle: String,
    upVotes: Number,
    downVotes: Number
})

const Prompt = mongoose.model('Prompt', PromptSchema)
module.exports = Prompt;