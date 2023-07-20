const ItemModel = require('../Model/itemModel');
const dbConfig = require('../../Config/database.config')
const {MongoClient} = require('mongodb');
const {ObjectId} = require('mongodb')
const items = {}


let connectToDB = async () => {
  const client = new MongoClient(dbConfig.url, {serverSelectionTimeoutMS:5000});
  await client.connect();
  const db = client.db(dbConfig.dbName);
  return db;
}

items.list = async (req, res) => {
  let dbCollectionInfo = await connectToDB();
  dbCollectionInfo.collection(dbConfig.collectionName).find().toArray().then(function (docs) {
    res.send(docs);
  })
}

items.save = async (req, res) => {
  let data = req.body.data;
  let validationResponse = ItemModel.validateItem(data);
  if(!validationResponse) {
    let dbCollectionInfo = await connectToDB();
    dbCollectionInfo.collection(dbConfig.collectionName).insertOne(data).then(() => {
      res.send("Record Inserted!!")
    })
  } else {
    res.send(validationResponse);
  }
}

items.edit = async (req, res) => {
  let id = req.params.id
  let dbCollectionInfo = await connectToDB();
  dbCollectionInfo.collection(dbConfig.collectionName).find({ '_id': new ObjectId(id) }).toArray().then(function (docs) {
    res.send(docs);
  })
}

items.update = async (req, res) => {
  let data = req.body.data
  let id = req.params.id

  let dbCollectionInfo = await connectToDB();
  let whereQuery = { _id: new ObjectId(id) }

  let setData = { $set: data }
  dbCollectionInfo.collection(dbConfig.collectionName).updateOne(whereQuery, setData).then(function() {
    res.send(data);
  });
   
}

items.delete = async (req, res) => {
  let id = req.params.id

  let dbCollectionInfo = await connectToDB();
  let whereQuery = { _id: new ObjectId(id) }

  dbCollectionInfo.collection(dbConfig.collectionName).deleteOne(whereQuery).then(() => {
    res.send("Record Deleted!");
  });
  
}

module.exports = items
