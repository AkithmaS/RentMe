import React, { useEffect, useLayoutEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import { motion } from 'motion/react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { assets } from '../assets/assets'
import { useAppContext } from '../context/AppContext'
import useRevealOnScroll from '../hooks/useRevealOnScroll'
import { toast } from 'react-hot-toast'

const CarDetails = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { id } = useParams()
  const { cars, fetchCars, currency, axios, token, setShowLogin } = useAppContext()
  const carFromState = location.state?.car
  const carFromList = cars.find((item) => item._id === id)
  const car = carFromState || carFromList
  const [pickupDate, setPickupDate] = useState('')
  const [returnDate, setReturnDate] = useState('')
  const [isBooking, setIsBooking] = useState(false)
  const [isCheckingAvailability, setIsCheckingAvailability] = useState(false)
  const [isAvailable, setIsAvailable] = useState(true)
  const [availabilityMessage, setAvailabilityMessage] = useState('Select dates to check availability')

  useEffect(() => {
    if (!carFromState && !carFromList) {
      fetchCars()
    }
  }, [carFromState, carFromList, fetchCars])

  useLayoutEffect(() => {
    const scrollTarget = document.scrollingElement || document.documentElement
    scrollTarget.scrollTo({ top: 0, left: 0, behavior: 'auto' })
    document.body.scrollTop = 0
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [id])

  useRevealOnScroll([id])

  useEffect(() => {
    let isActive = true

    const checkCurrentAvailability = async () => {
      if (!car || !pickupDate || !returnDate) {
        setIsAvailable(true)
        setAvailabilityMessage('Select dates to check availability')
        return
      }

      if (new Date(returnDate) <= new Date(pickupDate)) {
        setIsAvailable(false)
        setAvailabilityMessage('Return date must be after pickup date')
        return
      }

      try {
        setIsCheckingAvailability(true)

        const { data } = await axios.post('/api/booking/check-availability', {
          pickupDate,
          returnDate,
          location: car.location,
        })

        if (!isActive) return

        const matchingCar = data?.cars?.some((availableCar) => availableCar._id === car._id)

        if (matchingCar) {
          setIsAvailable(true)
          setAvailabilityMessage('Available for the selected dates')
        } else {
          setIsAvailable(false)
          setAvailabilityMessage('This car is already booked for the selected dates')
        }
      } catch (error) {
        if (!isActive) return
        setIsAvailable(false)
        setAvailabilityMessage(error.response?.data?.message || 'Unable to check availability')
      } finally {
        if (isActive) {
          setIsCheckingAvailability(false)
        }
      }
    }

    const timer = setTimeout(checkCurrentAvailability, 250)

    return () => {
      isActive = false
      clearTimeout(timer)
    }
  }, [axios, car, pickupDate, returnDate])

  const handleBookNow = async () => {
    if (!token) {
      setShowLogin(true)
      return
    }

    if (car.isAvailable === false) {
      toast.error('Unable to book as unavailable')
      return
    }

    if (!pickupDate || !returnDate) {
      toast.error('Please select pickup and return dates')
      return
    }

    if (new Date(returnDate) <= new Date(pickupDate)) {
      toast.error('Return date must be after pickup date')
      return
    }

    if (!isAvailable) {
      toast.error(availabilityMessage)
      return
    }

    try {
      setIsBooking(true)

      const { data } = await axios.post('/api/booking/create-booking', {
        car: car._id,
        pickupDate,
        returnDate,
      })

      if (!data.success) {
        toast.error(data.message || 'Failed to create booking')
        return
      }

      toast.success(data.message || 'Booking created successfully')
      navigate('/MyBookings')
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create booking')
    } finally {
      setIsBooking(false)
    }
  }

  if (!car) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <Navbar />
        <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-6 px-6 py-16">
          <Link className="text-sm font-semibold text-slate-600 hover:text-slate-900" to="/Home#featured-vehicles">
            ← Back to all cars
          </Link>
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-8 text-slate-600">
            Car details could not be found.
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />
      <main className="mx-auto w-full max-w-6xl flex-1 px-6 pb-20 pt-10">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
        <Link className="text-sm font-semibold text-slate-600 hover:text-slate-900" to="/Home#featured-vehicles">
          ← Back to all cars
        </Link>
        </motion.div>

        <div className="mt-6 grid gap-10 lg:grid-cols-[2fr_1fr]">
          <section className="space-y-6">
            <motion.div className="overflow-hidden rounded-2xl border border-slate-100 bg-slate-100" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
              <motion.img
                className="reveal h-[340px] w-full object-cover sm:h-[380px]"
                src={car.image}
                alt={`${car.brand} ${car.model}`}
                whileHover={{ scale: 1.03 }}
                style={{ '--reveal-delay': '0.08s' }}
              />
            </motion.div>

            <motion.div className="space-y-2" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.05 }}>
              <h1 className="text-3xl font-semibold text-slate-900 sm:text-4xl">
                {car.brand} {car.model}
              </h1>
              <p className="text-sm text-slate-500">
                {car.year} • {car.category}
              </p>
            </motion.div>

            <motion.div className="grid gap-3 rounded-2xl border border-slate-100 bg-white p-4 sm:grid-cols-2" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.08 }}>
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <img className="h-4 w-4" src={assets.users_icon} alt="Seats" />
                {car.seating_capacity} Seats
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <img className="h-4 w-4" src={assets.fuel_icon} alt="Fuel" />
                {car.fuel_type}
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <img className="h-4 w-4" src={assets.car_icon} alt="Transmission" />
                {car.transmission}
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <img className="h-4 w-4" src={assets.location_icon} alt="Location" />
                {car.location}
              </div>
            </motion.div>

            <motion.div className="space-y-2" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.1 }}>
              <h2 className="text-lg font-semibold text-slate-900">Description</h2>
              <p className="text-sm leading-6 text-slate-600">{car.description}</p>
            </motion.div>

          </section>

          <aside className="lg:sticky lg:top-24">
            <motion.div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm" initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.45, delay: 0.08 }}>
              <div className="flex items-baseline gap-2 text-slate-900">
                <span className="text-3xl font-semibold">{currency} {car.pricePerDay}</span>
                <span className="text-sm text-slate-500">per day</span>
              </div>

              {car.isAvailable === false ? (
                <div className="mt-4 rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-sm font-medium text-rose-700">
                  Unable to book as unavailable
                </div>
              ) : null}

              <div className="mt-6 space-y-4">
                <label className="block text-sm font-medium text-slate-700">
                  Pickup Date
                  <input
                    className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 shadow-sm outline-none focus:border-slate-400"
                    type="date"
                    value={pickupDate}
                    onChange={(event) => setPickupDate(event.target.value)}
                  />
                </label>

                <label className="block text-sm font-medium text-slate-700">
                  Return Date
                  <input
                    className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 shadow-sm outline-none focus:border-slate-400"
                    type="date"
                    value={returnDate}
                    onChange={(event) => setReturnDate(event.target.value)}
                  />
                </label>

                <motion.button
                  type="button"
                  onClick={handleBookNow}
                  disabled={isBooking || isCheckingAvailability || !isAvailable}
                  className="w-full rounded-lg bg-[#3B5BFC] px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-70"
                  whileHover={{ scale: car.isAvailable === false ? 1 : 1.02 }}
                  whileTap={{ scale: car.isAvailable === false ? 1 : 0.98 }}
                >
                  {car.isAvailable === false ? 'Unavailable' : isBooking ? 'Booking...' : isCheckingAvailability ? 'Checking...' : 'Book Now'}
                </motion.button>
                <p className={`text-center text-xs ${isAvailable ? 'text-emerald-600' : 'text-rose-600'}`}>
                  {availabilityMessage}
                </p>
                <p className="text-center text-xs text-slate-500">
                  No credit card required to reserve
                </p>
              </div>
            </motion.div>
          </aside>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default CarDetails
