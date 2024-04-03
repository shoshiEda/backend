import { userService } from './user.service.js'
import { logger } from '../../services/logger.service.js'


export async function getUser(req, res) {
    try {
        const user = await userService.getById(req.params.id)
        res.send(user)
    } catch (err) {
        logger.error('Failed to get user', err)
        res.status(500).send({ err: 'Failed to get user' })
    }
}

export async function getUsers(req, res) {
    try {
        const filterBy = {
            txt: req.query?.txt || '',
            minBalance: +req.query?.minBalance || 0
        }
        const users = await userService.query(filterBy)
        res.send(users)
    } catch (err) {
        logger.error('Failed to get users', err)
        res.status(500).send({ err: 'Failed to get users' })
    }
}

export async function deleteUser(req, res) {
    try {
        await userService.remove(req.params.id)
        res.send({ msg: 'Deleted successfully' })
    } catch (err) {
        logger.error('Failed to delete user', err)
        res.status(500).send({ err: 'Failed to delete user' })
    }
}

export async function updateUser(req, res) {


    try {
        const user = req.body
        const savedUser = await userService.update(user)
        res.send(savedUser)
    } catch (err) {
        logger.error('Failed to update user', err)
        res.status(500).send({ err: 'Failed to update user' })
    }
}

export async function addUserLikedSong(req, res) {
    try {
        const userId = req.params.id
        const song = req.body
        const savedSong = await userService.addUserLikedSong(userId, song)
        res.json(savedSong)
    } catch (err) {
        logger.error('Failed to update user', err)
        res.status(500).send({ err: 'Failed to update user' })
    }
}

export async function removeUserLikedSong(req, res) {
    try {
        const userId = req.params.id
        const { trackId } = req.params

        const removedId = await userService.removeUserLikedSong(userId, trackId)
        res.send(removedId)
    } catch (err) {
        logger.error('Failed to remove user song', err)
        res.status(500).send({ err: 'Failed to remove user song' })
    }
}

export async function addUserStation(req, res) {
    try {
        const userId = req.params.id
        const station = req.body
        console.log('add:',userId, station)
        const savedStation = await userService.addUserStation(userId, station)
        res.json(savedStation)
    } catch (err) {
        logger.error('Failed to update user', err)
        res.status(500).send({ err: 'Failed to update user' })
    }
}

export async function editUserStation(req, res) {
    try {
        const userId = req.params.id
        const station = req.body
        console.log(userId,station)
        const savedStation = await userService.editUserStation(userId, station)
        res.json(savedStation)
    } catch (err) {
        logger.error('Failed to update user', err)
        res.status(500).send({ err: 'Failed to update user' })
    }
}

export async function removeUserStation(req, res) {
    try {
        const userId = req.params.id
        const { stationId } = req.params

        const removedId = await userService.removeUserStation(userId,stationId)
        res.send(removedId)
    } catch (err) {
        logger.error('Failed to remove user station', err)
        res.status(500).send({ err: 'Failed to remove user station' })
    }
}

export async function addUserLikedStation(req, res) {
    try {
        const userId = req.params.id
        const station = req.body
        const savedStation = await userService.addUserLikedStation(userId, station)
        res.json(savedStation)
    } catch (err) {
        logger.error('Failed to update user', err)
        res.status(500).send({ err: 'Failed to update user' })
    }
}

export async function removeUserLikedStation(req, res) {
    try {
        const userId = req.params.id
        const stationId = req.params.stationId
        const removedId = await userService.removeUserLikedStation(userId, stationId)
        res.send(removedId)
    } catch (err) {
        logger.error('Failed to remove user station', err)
        res.status(500).send({ err: 'Failed to remove user station' })
    }
}

