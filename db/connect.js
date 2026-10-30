const { MongoClient } = require('mongodb');
require('dotenv').config();

const uri = process.env.MONGODB_URI;
let db;

const initDb = async () => {
  if (db) {
    return db;
  }

  if (!uri) {
    throw new Error('MONGODB_URI is not defined in environment variables.');
  }

  const client = new MongoClient(uri);
  await client.connect();
  db = client.db('launchpad');
  return db;
};

const getDb = () => {
  if (!db) {
    throw new Error('Database not initialized. Call initDb() first.');
  }

  return db;
};

module.exports = {
  initDb,
  getDb
};
