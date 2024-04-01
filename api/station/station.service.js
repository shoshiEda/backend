import { ObjectId } from 'mongodb'
import { logger } from '../../services/logger.service.js'
import { dbService } from '../../services/db.service.js'

export const stationService = {
    //remove,
    query,
    getById,
    add,
    update,
    addStationSong,
    removeStationSong
}

async function query(type='') {

    const criteria = {type }
    const sortCriteria={createdAt:-1}

    const MAX_STATIONS_ON_PAGE=7
    const MAX_STATIONS_OF_TYPE=30
    const types =  ['Mixed','Pop','Hip-Hop','Rock','Electronic','Meditation']

    try {
        const collection = await dbService.getCollection('station');
        if (type) {
            const stations = await collection.find({ type }).sort(sortCriteria).limit(MAX_STATIONS_OF_TYPE).toArray();
            return stations;
        } else {
            const promises = types.map(async type => {
                const stationsOfType = await collection.find({ type }).sort(sortCriteria).limit(MAX_STATIONS_ON_PAGE).toArray();
                return stationsOfType;
            });
            const stations = await Promise.all(promises);
            //return stations;
            return []
        }
    } catch (err) {
        logger.error('cannot find stations', err);
        throw err;
    }
}


async function getById(stationId) {
    try {
        const collection = await dbService.getCollection('station')
        const station = await collection.findOne({ _id: new ObjectId(stationId) })
        return station
    } catch (err) {
        logger.error(`while finding station ${stationId}`, err)
        throw err
    }
}

/*async function remove(stationId) {
    try {
        const collection = await dbService.getCollection('station')
        await collection.deleteOne({ _id: new ObjectId(carId) })
    } catch (err) {
        logger.error(`cannot remove car ${carId}`, err)
        throw err
    }
}*/

async function add(station) {
    try {
        const collection = await dbService.getCollection('station')
        await collection.insertOne(station)
        return station
    } catch (err) {
        logger.error('cannot insert station', err)
        throw err
    }
}

async function update(station) {
    try {
        const stationToSave = {
            name: station.name,
            imgUrl: station.imgUrl,
            description:station.description
        }
        const collection = await dbService.getCollection('station')
        await collection.updateOne({ _id: new ObjectId(station._id) }, { $set: stationToSave })
        return station
    } catch (err) {
        logger.error(`cannot update station ${station._id}`, err)
        throw err
    }
}

async function addStationSong(stationId, song) {
    try {
        const collection = await dbService.getCollection('station')
        await collection.updateOne({ _id: new ObjectId(stationId) }, { $push: { songs: song } })
        return song
    } catch (err) {
        logger.error(`cannot add station song ${stationId}`, err)
        throw err
    }
}

async function removeStationSong(stationId, songId) {
    try {
        const collection = await dbService.getCollection('station')
        await collection.updateOne({ _id: new ObjectId(stationId) }, { $pull: { songs: {id: songId} } })
        return songId
    } catch (err) {
        logger.error(`cannot remove station song ${carId}`, err)
        throw err
    }
}