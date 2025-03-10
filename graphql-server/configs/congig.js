const dotenv = require('dotenv')

dotenv.config()

env=process.env.NODE_ENV || 'development'

const config = {
    development: {
        db: process.env.MONGO_URI || 'mongodb://localhost:27017/tasdidkabiradil-prompt-db'
    }
}

module.exports = config[env]