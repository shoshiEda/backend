import express from 'express'

import { requireAuth, requireAdmin } from '../../middlewares/requireAuth.middleware.js'
import { log } from '../../middlewares/logger.middleware.js'
import { getStations, getStationById, addStation, updateStation, removeStation, addStationSong, removeStationSong } from './station.controller.js'

export const stationRoutes = express.Router()

// middleware that is specific to this router
// router.use(requireAuth)

stationRoutes.get('/', log, getStations)
stationRoutes.get('/:id', getStationById)
stationRoutes.post('/', requireAuth, addStation)
stationRoutes.put('/:id', requireAuth, updateStation)
stationRoutes.delete('/:id', requireAuth, removeStation)

stationRoutes.post('/:id/song', requireAuth, addStationSong)
stationRoutes.delete('/:id/song/:songId', requireAuth, removeStationSong)