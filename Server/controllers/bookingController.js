import Booking from "../models/Booking.js";
import Car from "../models/Car.js";


//fuction to check availability of car for given dates

const checkAvailability = async(car, pickupDate, returnDate) => {
    const bookings = await Booking.find({ 
        car,
        pickupDate: { $lt: returnDate },
        returnDate: { $gt: pickupDate }
     })
     return bookings.length === 0;
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

    