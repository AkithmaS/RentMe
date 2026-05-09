import Booking from "../models/Booking.js";
import Car from "../models/Car.js";


//fuction to check availability of car for given dates

const checkAvailability = async(car, pickupDate, returnDate) => {
    const pickup = new Date(pickupDate)
    const returnAt = new Date(returnDate)

    if (Number.isNaN(pickup.getTime()) || Number.isNaN(returnAt.getTime())) {
        return false
    }

    const overlappingBooking = await Booking.findOne({ 
        car,
        status: { $ne: 'cancelled' },
        pickupDate: { $lte: returnAt },
        returnDate: { $gte: pickup }
     })

     return !overlappingBooking;
     }
     
     //api to check availability of cars for the given date and location// 
     
export const checkCarAvailability = async(req, res) => {
    try {
        const { pickupDate, returnDate, location } = req.body 
        
        const cars = await Car.find({ location, isAvailable: true })

        const availableCarsPromises = cars.map(async(car) => {
            const isAvailable = await checkAvailability(car._id, pickupDate, returnDate)
            return {...car._doc, isAvailable }
        })
        let availableCars = await Promise.all(availableCarsPromises);
        availableCars = availableCars.filter(car => car.isAvailable)    
        res.json({ success: true, cars: availableCars.filter(car => car.isAvailable) })
    }catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message })
    }}

  //api to create booking
export const createBooking = async(req, res) => {
    try {
        const {_id} = req.user;
        const {car,pickupDate, returnDate} = req.body;

        const pickup = new Date(pickupDate)
        const returnAt = new Date(returnDate)

        if (Number.isNaN(pickup.getTime()) || Number.isNaN(returnAt.getTime())) {
            return res.json({ success: false, message: 'Please provide valid pickup and return dates' })
        }

        if (returnAt <= pickup) {
            return res.json({ success: false, message: 'Return date must be after pickup date' })
        }

        const isAvailable = await checkAvailability(car, pickupDate, returnDate)
        if (!isAvailable) {
            return res.json({ success: false, message: 'Car is not available for the selected dates' })
        }

        const carData = await Car.findById(car)

        if (!carData) {
            return res.json({ success: false, message: 'Car not found' })
        }

        //calculate price based on pickup and return date
        const noofDays = Math.ceil((returnAt - pickup) / (1000 * 60 * 60 * 24));
        const price = carData.pricePerDay * noofDays;

      await Booking.create({
    car,
    user: _id,
    owner: carData.owner,
    pickupDate,
    returnDate,
    price
})

res.json({ success: true, message: 'Booking created successfully' })
    }catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message })
    }}


    //api to get bookings of a user
    export const getUserBookings = async(req, res) => {
        try {
            const {_id} = req.user;
            const bookings = await Booking.find({ user: _id }).populate('car').sort({ createdAt: -1 })
            res.json({ success: true, bookings })
        }catch (error) {
            console.log(error.message);
            res.json({ success: false, message: error.message })
        }   }


        //api to get bookings of a owner
export const getOwnerBookings = async(req, res) => {
    try {
       const bookings = await Booking.find({ owner: req.user._id }).populate('car user').select('-password').sort({ createdAt: -1 })
       res.json({ success: true, bookings })
    }catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message })
    }}


    //api to change booking status by owner
export const changeBookingStatus = async(req, res) => {
    try {
        const {_id} = req.user;
        const {bookingId, status} = req.body

        const booking = await Booking.findById(bookingId)
        if(booking.owner.toString() !== _id.toString()) {
            return res.json({ success: false, message: 'Not authorized to change booking status' })

        }

        booking.status = status;
        await booking.save();
        res.json({ success: true, message: 'Booking status updated successfully' })
    }catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message })
    }}