import { logger } from '../../services/logger.service.js'
import { userService } from '../user/user.service.js'
import { stationService } from './station.service.js'

export async function getStations(req, res) {
    try {
        const type = req.query.type || ''

        console.log(type)
        
        logger.debug('Getting Stations', type)
        const stations = await stationService.query(type)
        res.json(stations)
    } catch (err) {
        logger.error('Failed to get Stations', err)
        res.status(500).send({ err: 'Failed to get Stations' })
    }
}

export async function getStationById(req, res) {
    try {
        const stationId = req.params.id
        const station = await stationService.getById(stationId)
        res.json(station)
    } catch (err) {
        logger.error('Failed to get station', err)
        res.status(500).send({ err: 'Failed to get station' })
    }
}

export async function addStation(req, res) {
    const { loggedinUser } = req
    try {
        const station = req.body
        const user = await userService.getById(loggedinUser._id)
        station.createdBy = {username: user.username,_id:loggedinUser._id}
        station.createdAt = Date.now()      
        const addedStation = await stationService.add(station)
        res.json(addedStation)
    } catch (err) {
        logger.error('Failed to add station', err)
        res.status(500).send({ err: 'Failed to add station' })
    }
}

export async function updateStation(req, res) {
    try {
        const station = req.body
        const updatedStation = await stationService.update(station)
        res.json(updatedStation)
    } catch (err) {
        logger.error('Failed to update station', err)
        res.status(500).send({ err: 'Failed to update station' })
    }
}

export async function removeStation(req, res) {
    try {
        const stationId = req.params.id
        await carService.remove(carId)
        res.send()
    } catch (err) {
        logger.error('Failed to remove car', err)
        res.status(500).send({ err: 'Failed to remove car' })
    }
}

export async function addStationSong(req, res) {
    try {
        const stationId = req.params.id
        const song = req.body
        const savedSong = await stationService.addStationSong(stationId, song)
        res.json(savedSong)
    } catch (err) {
        logger.error('Failed to update station', err)
        res.status(500).send({ err: 'Failed to update station' })
    }
}

export async function removeStationSong(req, res) {
    try {
        const stationId = req.params.id
        const { trackId } = req.params

        const removedId = await stationService.removeStationSong(stationId, trackId)
        res.send(removedId)
    } catch (err) {
        logger.error('Failed to remove station msg', err)
        res.status(500).send({ err: 'Failed to remove station msg' })
    }
}