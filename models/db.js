// db.js
require('dotenv').config();
const { MongoClient } = require('mongodb');

const uri = process.env.MONGO_URI;
const dbName = process.env.DB_NAME;
let db;
let client;

async function connectDB() {
  if (db) return db;
  client = new MongoClient(uri, { useUnifiedTopology: true });
  await client.connect();
  db = client.db(dbName);
  await db.collection('donors').createIndex({ location: "2dsphere" });
  await db.collection('receiver').createIndex({ location: "2dsphere" });
  return db;
}

async function insertLocation(userId, name, latitude, longitude, collectionName = 'receiver') {
  const database = await connectDB();
  const collection = database.collection(collectionName);
  await collection.insertOne({
    userId,
    name,
    location: {
      type: "Point",
      coordinates: [longitude, latitude]
    }
  });
}

async function findNearby(collectionName, latitude, longitude, maxDistanceKm = 10) {
  const database = await connectDB();
  const collection = database.collection(collectionName);
  const results = await collection.find({
    location: {
      $nearSphere: {
        $geometry: { type: "Point", coordinates: [longitude, latitude] },
        $maxDistance: maxDistanceKm * 1000
      }
    }
  }).toArray();
  return results;
}

module.exports = {
  connectDB,
  insertLocation,
  findNearby,
  closeClient: () => client?.close()
};
