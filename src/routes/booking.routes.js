import { Router } from 'express'
import {
	createBooking,
	getAllBookings,
	getBookingsByDate,
} from '../controllers/booking.controller.js'

const router = Router()

router.get('/bookings', getAllBookings)
router.get('/bookings/date/:date', getBookingsByDate)
router.post('/bookings', createBooking)

export default router
