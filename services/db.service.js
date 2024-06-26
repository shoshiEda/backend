import { MongoClient } from 'mongodb'
import { logger } from './logger.service.js'

export const dbService = {
    getCollection
}

let config
if (process.env.NODE_ENV === 'production') {
    config = {
        dbURL: 'mongodb+srv://shoshi:shoshi123@cluster0.vqhqmms.mongodb.net/?retryWrites=true&w=majority',
        dbName: 'Tuby'
    }
  } else {
    config = {
        //dbURL: 'mongodb://127.0.0.1:27017',
        dbURL: 'mongodb+srv://shoshi:shoshi123@cluster0.vqhqmms.mongodb.net/?retryWrites=true&w=majority',
        dbName: 'Tuby',
    }
  }
  config.isGuestMode = true

var dbConn = null

async function getCollection(collectionName) {
    try {
        const db = await _connect()
        const collection = await db.collection(collectionName)
        return collection
    } catch (err) {
        logger.error('Failed to get Mongo collection', err)
        throw err
    }
}

async function _connect() {
    if (dbConn) return dbConn
    try {
        const client = await MongoClient.connect(config.dbURL)
        const db = client.db(config.dbName)
        dbConn = db
        return db
    } catch (err) {
        logger.error('Cannot Connect to DB', err)
        throw err
    }
}