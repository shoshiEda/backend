import { dbService } from '../../services/db.service.js'
import { logger } from '../../services/logger.service.js'

import mongodb from 'mongodb'
const { ObjectId } = mongodb

export const userService = {
    query,
    getById,
    getByUsername,
    remove,
    update,
    add,
    addUserLikedSong,
    removeUserLikedSong,
    addUserStation,
    removeUserStation,
    addUserLikedStation,
    removeUserLikedStation,
    editUserStation
}

async function query() {
    try {
        const collection = await dbService.getCollection('user')
        var users = await collection.toArray()
        return users
    } catch (err) {
        logger.error('cannot find users', err)
        throw err
    }
}

async function getById(userId) {
    try {
        const collection = await dbService.getCollection('user')
        const user = await collection.findOne({ _id: new ObjectId(userId) })
        delete user.password
        return user
    } catch (err) {
        logger.error(`while finding user ${userId}`, err)
        throw err
    }
}
async function getByUsername(username) {
    try {
        const collection = await dbService.getCollection('user')
        const user = await collection.findOne({ username })
        return user
    } catch (err) {
        logger.error(`while finding user ${username}`, err)
        throw err
    }
}

async function remove(userId) {
    try {
        const collection = await dbService.getCollection('user')
        await collection.deleteOne({ _id: ObjectId(userId) })
    } catch (err) {
        logger.error(`cannot remove user ${userId}`, err)
        throw err
    }
}

async function update(user) {
    console.log(user)
    try {
        const userToSave = {
            username: user.username,
            imgUrl: user.imgUrl,
        }
        if(user.currSong) userToSave.currSong = user.currSong
        if(user.currStation) userToSave.currStation = user.currStation


        const collection = await dbService.getCollection('user')
        await collection.updateOne({ _id: new ObjectId(user._id) }, { $set: userToSave })
        return user
    } catch (err) {
        logger.error(`cannot update user ${user._id}`, err)
        throw err
    }
}

async function add(user) {
    try {
        // Validate that there are no such user:
        const existUser = await getByUsername(user.username)
        if (existUser) throw new Error('Username taken')

        // peek only updatable fields!
        const userToAdd = {
            username: user.username,
            password: user.password,
            email: user.email,
            imgUrl: user.imgUrl,
        }
        const collection = await dbService.getCollection('user')
        await collection.insertOne(userToAdd)
        return userToAdd
    } catch (err) {
        logger.error('cannot insert user', err)
        throw err
    }
}

async function addUserLikedSong(userId, song) {
    try {
        const collection = await dbService.getCollection('user')
        await collection.updateOne({ _id: new ObjectId(userId) }, { $push: { likedSongs: song } })
        return song
    } catch (err) {
        logger.error(`cannot add user song ${userId}`, err)
        throw err
    }
}

async function removeUserLikedSong(userId, songId) {
    try {
        const collection = await dbService.getCollection('user')
        await collection.updateOne({ _id: new ObjectId(userId) }, { $pull: { likedSongs: {trackId: songId} } })
        return songId
    } catch (err) {
        logger.error(`cannot remove station song ${songId}`, err)
        throw err
    }
}

async function addUserStation(userId, station) {
    console.log(station)
    
    try {
        const user = await getById(userId)
        const collection = await dbService.getCollection('user')
        if (user.stations) {
            await collection.updateOne(
                { _id: new ObjectId(userId) },
                { $push: { stations: { $each: [station], $position: 0 } } }
            )
        } else {
            await collection.updateOne(
                { _id: new ObjectId(userId) },
                { $set: { stations: [station] } }
            )
        }        
        return station
    } catch (err) {
        logger.error(`cannot add user station ${userId}`, err)
        throw err
    }
}

async function editUserStation(userId, station) {
    try {
        const collection = await dbService.getCollection('user')
        await collection.updateOne(
            { _id: new ObjectId(userId), "stations._id": station._id },
            { $set: { "stations.$": station } }
        )
        return station
    } catch (err) {
        logger.error(`cannot add user station ${userId}`, err)
        throw err
    }
}


async function removeUserStation(userId, stationId) {
    try {
        const collection = await dbService.getCollection('user')
        await collection.updateOne({ _id: new ObjectId(userId) }, { $pull: { stations: {_id: stationId} } })
        return stationId
    } catch (err) {
        logger.error(`cannot remove station station ${userId}`, err)
        throw err
    }
}

async function addUserLikedStation(userId, station) {
    try {
        const collection = await dbService.getCollection('user')
        await collection.updateOne({ _id: new ObjectId(userId) }, { $push: { likedStations: station } })
        return station
    } catch (err) {
        logger.error(`cannot add user station ${userId}`, err)
        throw err
    }
}

async function removeUserLikedStation(userId, stationId) {
    try {
        const collection = await dbService.getCollection('user')
        await collection.updateOne({ _id: new ObjectId(userId) }, { $pull: { likedStations: {_id: stationId} } })
        return stationId
    } catch (err) {
        logger.error(`cannot remove station station ${userId}`, err)
        throw err
    }
}



