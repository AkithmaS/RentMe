import express from 'express';
import { checkCarAvailability, createBooking, getOwnerBookings, getUserBookings, changeBookingStatus } from '../controllers/bookingController.js';
import {protect} from '../middleware/auth.js';

const bookingRouter = express.Router();

bookingRouter.post("/check-availability", checkCarAvailability)
bookingRouter.post("/create-booking", protect, createBooking)
bookingRouter.get("/my-bookings", protect, getUserBookings)
bookingRouter.get("/owner-bookings", protect, getOwnerBookings)
bookingRouter.post("/change-status", protect, changeBookingStatus)

export default bookingRouter;
