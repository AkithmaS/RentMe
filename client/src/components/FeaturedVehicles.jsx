import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { assets } from '../assets/assets'
import { useAppContext } from '../context/AppContext'

const FeaturedVehicles = () => {
  const navigate = useNavigate()
  const { cars, fetchCars, currency } = useAppContext()

  useEffect(() => {
    if (!cars.length) {
      fetchCars()
    }
  }, [cars.length, fetchCars])

  const featured = cars.slice(0, 3)

  const handleCardClick = (car) => {
    if (car.isAvailable === false) {
      toast.error('Unable to book as unavailable')
      return
    }

    navigate(`/cars/${car._id}`, { state: { car } })
  }

  return (
    <section id="featured-vehicles" className="w-full bg-white">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center px-6 py-20 text-center">
        <h2
          className="reveal text-2xl font-bold text-slate-800 sm:text-3xl"
          style={{ '--reveal-delay': '0s' }}
        >
          Featured Vehicles
        </h2>
        <p
          className="reveal mt-2 max-w-xl text-sm text-slate-500"
          style={{ '--reveal-delay': '0.12s' }}
        >
          Explore our selection of premium vehicles available for your next adventure.
        </p>

        <div className="mt-12 grid w-full gap-8 md:grid-cols-2 lg:grid-cols-3">
          {featured.length > 0 ? featured.map((car, index) => (
            <article
              key={car._id}
              className={`featured-card reveal overflow-hidden rounded-2xl border bg-white shadow-md shadow-slate-200/60 transition hover:-translate-y-1 hover:shadow-lg ${car.isAvailable === false ? 'cursor-not-allowed border-rose-200 opacity-80' : 'cursor-pointer border-slate-100'}`}
              style={{ '--reveal-delay': `${0.18 + index * 0.12}s` }}
              onClick={() => handleCardClick(car)}
            >
              <div className="relative">
                <img
                  className="featured-image h-48 w-full object-cover"
                  src={car.image}
                  alt={`${car.brand} ${car.model}`}
                  loading="lazy"
                />
                <span className={`absolute left-3 top-3 rounded-full px-3 py-1 text-xs font-semibold text-white ${car.isAvailable === false ? 'bg-rose-500' : 'bg-[#3B5BFC]'}`}>
                  {car.isAvailable === false ? 'Unavailable' : 'Available Now'}
                </span>
                <span className="absolute bottom-3 right-3 rounded-full bg-black/80 px-3 py-1 text-xs font-semibold text-white">
                  {currency} {car.pricePerDay}/day
                </span>
              </div>

              <div className="flex flex-col gap-4 p-5 text-left">
                <div>
                  <h3 className="text-sm font-semibold text-slate-800">
                    {car.brand} {car.model}
                  </h3>
                  <p className="text-xs text-slate-500">{car.category} {car.year}</p>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs text-slate-500">
                  <div className="flex items-center gap-2">
                    <img className="h-4 w-4" src={assets.users_icon} alt="Seats" />
                    {car.seating_capacity} Seats
                  </div>
                  <div className="flex items-center gap-2">
                    <img className="h-4 w-4" src={assets.fuel_icon} alt="Fuel" />
                    {car.fuel_type}
                  </div>
                  <div className="flex items-center gap-2">
                    <img className="h-4 w-4" src={assets.car_icon} alt="Transmission" />
                    {car.transmission}
                  </div>
                  <div className="flex items-center gap-2">
                    <img className="h-4 w-4" src={assets.location_icon} alt="Location" />
                    {car.location}
                  </div>
                </div>
              </div>
            </article>
          )) : (
            <div className="col-span-full rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-6 py-10 text-sm text-slate-500">
              No available cars found right now.
            </div>
          )}
        </div>

        <button
          onClick={() => navigate('/cars')}
          className="reveal mt-12 inline-flex items-center gap-2 rounded-lg border border-slate-200 px-5 py-2 text-sm font-semibold text-slate-600 transition hover:border-slate-300 hover:text-slate-800"
          style={{ '--reveal-delay': '0.6s' }}
        >
          Explore all cars
          <img className="h-4 w-4" src={assets.arrow_icon} alt="Arrow" />
        </button>
      </div>
    </section>
  )
}

export default FeaturedVehicles
