import User from "../models/User.js";
import Car from "../models/Car.js";
import Booking from "../models/Booking.js";
import imagekit from "../configs/imageKit.js";
import { toFile } from "@imagekit/nodejs";

// api to change role of user
export const changeRoleToOwner = async (req, res) => {
    try {
        const { _id } = req.user;
        await User.findByIdAndUpdate(_id, { role: "owner" });
        res.json({ success: true, message: "now you can list cars" });
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
};

// api to list car
export const addCar = async (req, res) => {
    try {
        const { _id } = req.user;
        const car = JSON.parse(req.body.carData);
        const imageFile = req.file;

        if (!imageFile) {
            return res.json({ success: false, message: "Image file is required" });
        }

        const uploadResult = await imagekit.files.upload({
            file: await toFile(imageFile.buffer, imageFile.originalname),
            fileName: imageFile.originalname,
            folder: "/cars"
        });

        const newCar = await Car.create({
            ...car,
            owner: _id,
            image: uploadResult.url
        });

        res.json({ success: true, car: newCar });
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
};


//api to list owner cars
export const getOwnerCars = async (req, res) => {
    try {
        const { _id } = req.user;
        const cars = await Car.find({ owner: _id });
        res.json({ success: true, cars });}
        catch (error) { 
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }}


    //api to toggle car availability
export const toggleCarAvailability = async (req, res) => {
    try {
        const { _id } = req.user;
        const { carId } = req.params;       
        const car = await Car.findById(carId);
        if (car.owner.toString() !== _id.toString()) {
            return res.json({ success: false, message: "Not authorized to update this car" });
        }
        car.isAvailable = !car.isAvailable;
        await car.save();
        res.json({ success: true, message: `Car is now ${car.isAvailable ? "available" : "unavailable"}` });
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }}


    //api to delete a car
export const deleteCar = async (req, res) => {
    try {
        const { _id } = req.user;
        const { carId } = req.params;       
        const car = await Car.findById(carId);
        if (car.owner.toString() !== _id.toString()) {
            return res.json({ success: false, message: "Not authorized to delete this car" });
        }   
        car.owner = null; // Remove the reference to the owner
        car.isAvailable = false; // Mark the car as unavailable
        await car.save();
        
        res.json({ success: true, message: "Car deleted successfully" });
    }   catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }}

    //api to get dashboard data
    export const getDashboardData = async (req, res) => {
        try {
            const { _id } = req.user;
            if (req.user.role !== "owner") {
                return res.json({ success: false, message: "Not authorized to access dashboard data" });
            }

            const cars = await Car.find({ owner: _id });
            const bookings = await Booking.find({ owner: _id }).populate('car').sort({ createdAt: -1 });

            const pendingBookings = await Booking.find({ owner: _id, status: 'pending' });
            const completedBookings = await Booking.find({ owner: _id, status: 'confirmed' });

            const monthlyRevenue = bookings
                .filter((booking) => booking.status === 'confirmed')
                .reduce((accumulator, booking) => {
                    const monthKey = booking.createdAt.toLocaleString('en-US', { month: 'short', year: 'numeric' });
                    accumulator[monthKey] = (accumulator[monthKey] || 0) + booking.price;
                    return accumulator;
                }, {});

            const dashboardData = {
                totalCars: cars.length,
                totalBookings: bookings.length,
                pendingBookings: pendingBookings.length,
                completedBookings: completedBookings.length,
                recentBookings: bookings.slice(0, 3),
                monthlyRevenue
            };

            res.json({ success: true, dashboardData });
        } catch (error) {
            console.log(error.message);
            res.json({ success: false, message: error.message });
        }
    };



    //api to update user image
    export const updateProfileImage = async (req, res) => {
        try {
            const { _id } = req.user;
            const imageFile = req.file;

                if (!imageFile) {
                    return res.json({ success: false, message: "Image file is required" });
                }

                const uploadResult = await imagekit.files.upload({
                    file: await toFile(imageFile.buffer, imageFile.originalname),
                    fileName: imageFile.originalname,
                    folder: "/users"
                });

                const image = uploadResult.url;

                await User.findByIdAndUpdate(_id, { image }, { new: true });
                res.json({ success: true, message: "Profile image updated successfully", image });
            } catch (error) {
                console.log(error.message);
                res.json({ success: false, message: error.message });
            }
        };