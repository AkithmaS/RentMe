import React from 'react'
import { assets } from '../assets/assets'

const OwnerBanner = () => {
  return (
    <section className="w-full bg-white">
      <div className="mx-auto w-full max-w-6xl px-6 pb-20">
        <div className="reveal flex flex-col items-center justify-between gap-8 rounded-3xl bg-gradient-to-r from-[#3B5BFC] to-[#9DB5FF] px-8 py-10 text-center text-white md:flex-row">
          <div className="flex max-w-xl flex-col items-center">
            <h3 className="text-2xl font-semibold sm:text-3xl">
              Do You Own a Luxury Car?
            </h3>
            <p className="mt-3 text-sm text-white/90">
              Monetize your vehicle effortlessly by listing it on CarRental.
              We take care of insurance, driver verification, and secure payments — so
              you can earn passive income, stress-free.
            </p>
            <button className="mt-6 rounded-lg bg-white px-4 py-2 text-sm font-semibold text-[#3B5BFC] shadow-sm transition hover:brightness-95">
              List your car
            </button>
          </div>
          <div className="flex w-full max-w-md justify-center">
            <img
              className="float-x w-full max-w-md drop-shadow-[0_20px_30px_rgba(30,58,138,0.35)]"
              src={assets.banner_car_image}
              alt="Luxury car"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default OwnerBanner
