var config = {};

// Database configuration
const db = {
  host: process.env.DB_HOST,
  cluster: process.env.DB_CLUSTER,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  dbName: process.env.DB_NAME
}

console.log(db);
config.DB = 'mongodb+srv://mihiru:mihiru@cluster0-2vea0.mongodb.net/test?retryWrites=true&w=majority'

// Secrets
config.SECRET = process.env.SECRET;

module.exports = config;