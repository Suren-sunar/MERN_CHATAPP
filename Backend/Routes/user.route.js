import Express from 'express'
import protectRoute from '../Middleware/protectRoute.js'
import { getUserForSlidebar } from '../Controller/user.controller.js'

const router = Express.Router()


router.get("/",protectRoute,getUserForSlidebar)

export default router