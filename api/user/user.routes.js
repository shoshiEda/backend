import express from 'express'

import { requireAuth, requireAdmin } from '../../middlewares/requireAuth.middleware.js'
import { getUser, getUsers, deleteUser, updateUser,addUserLikedSong, removeUserLikedSong,addUserStation,removeUserStation,addUserLikedStation,removeUserLikedStation,editUserStation} from './user.controller.js'

export const userRoutes= express.Router()

// middleware that is specific to this router
// userRoutes.use(requireAuth)

userRoutes.get('/', getUsers)
userRoutes.get('/:id', getUser)
userRoutes.put('/:id',  updateUser)

// userRoutes.put('/:id',  requireAuth, updateUser)
userRoutes.delete('/:id',  requireAuth, requireAdmin, deleteUser)

userRoutes.post('/:id/song', requireAuth, addUserLikedSong)
userRoutes.delete('/:id/song/:trackId', requireAuth, removeUserLikedSong)
userRoutes.post('/:id/station', requireAuth, addUserStation)
userRoutes.post('/:id/station/:stationId', requireAuth, editUserStation)
userRoutes.delete('/:id/station/:stationId', requireAuth, removeUserStation)
userRoutes.post('/:id/liked-station', requireAuth, addUserLikedStation)
userRoutes.delete('/:id/liked-station/:id', requireAuth, removeUserLikedStation)
