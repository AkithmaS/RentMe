import React, { useLayoutEffect } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { assets, dummyCarData } from '../assets/assets'
import useRevealOnScroll from '../hooks/useRevealOnScroll'

const CarDetails = () => {
  const location = useLocation()
  const { id } = useParams()
  const carFromState = location.state?.car
  const carFromList = dummyCarData.find((item) => item._id === id)
  const car = carFromState || carFromList

  useLayoutEffect(() => {
    const scrollTarget = document.scrollingElement || document.documentElement
    scrollTarget.scrollTo({ top: 0, left: 0, behavior: 'auto' })
    document.body.scrollTop = 0
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [id])

  useRevealOnScroll([id])

  const featureList = [
    'Leather Seats',
    'Panoramic Sunroof',
    'Wireless Charging',
    '360 Camera',
  ]

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
        <Link className="text-sm font-semibold text-slate-600 hover:text-slate-900" to="/Home#featured-vehicles">
          ← Back to all cars
        </Link>

        <div className="mt-6 grid gap-10 lg:grid-cols-[2fr_1fr]">
          <section className="space-y-6">
            <div className="overflow-hidden rounded-2xl border border-slate-100 bg-slate-100">
              <img
                className="reveal h-[340px] w-full object-cover sm:h-[380px]"
                src={car.image}
                alt={`${car.brand} ${car.model}`}
                style={{ '--reveal-delay': '0.08s' }}
              />
            </div>

            <div className="space-y-2">
              <h1 className="text-3xl font-semibold text-slate-900 sm:text-4xl">
                {car.brand} {car.model}
              </h1>
              <p className="text-sm text-slate-500">
                {car.year} • {car.category}
              </p>
            </div>

            <div className="grid gap-3 rounded-2xl border border-slate-100 bg-white p-4 sm:grid-cols-2">
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
            </div>

            <div className="space-y-3">
              <h2 className="text-lg font-semibold text-slate-900">Description</h2>
              <p className="text-sm leading-6 text-slate-600">{car.description}</p>
            </div>

            <div className="space-y-3">
              <h2 className="text-lg font-semibold text-slate-900">Features</h2>
              <div className="grid gap-3 sm:grid-cols-2">
                {featureList.map((feature) => (
                  <div key={feature} className="flex items-center gap-2 text-sm text-slate-600">
                    <img className="h-4 w-4" src={assets.tick_icon} alt="Check" />
                    {feature}
                  </div>
                ))}
              </div>
            </div>
          </section>

          <aside className="lg:sticky lg:top-24">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-baseline gap-2 text-slate-900">
                <span className="text-3xl font-semibold">${car.pricePerDay}</span>
                <span className="text-sm text-slate-500">per day</span>
              </div>

              <div className="mt-6 space-y-4">
                <label className="block text-sm font-medium text-slate-700">
                  Pickup Date
                  <input
                    className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 shadow-sm outline-none focus:border-slate-400"
                    type="date"
                  />
                </label>

                <label className="block text-sm font-medium text-slate-700">
                  Return Date
                  <input
                    className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 shadow-sm outline-none focus:border-slate-400"
                    type="date"
                  />
                </label>

                <button className="w-full rounded-lg bg-[#3B5BFC] px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:brightness-110">
                  Book Now
                </button>
                <p className="text-center text-xs text-slate-500">
                  No credit card required to reserve
                </p>
              </div>
            </div>
          </aside>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default CarDetails
