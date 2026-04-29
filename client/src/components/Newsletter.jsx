import React from 'react'

const Newsletter = () => {
  return (
    <section className="w-full bg-white">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center px-6 pb-20 text-center">
        <h2
          className="reveal text-2xl font-bold text-slate-800 sm:text-3xl"
          style={{ '--reveal-delay': '0s' }}
        >
          Never Miss a Deal!
        </h2>
        <p
          className="reveal mt-3 max-w-2xl text-sm text-slate-500"
          style={{ '--reveal-delay': '0.12s' }}
        >
          Subscribe to get the latest offers, new collections, and exclusive discounts.
        </p>

        <form
          className="reveal mt-8 flex w-full max-w-2xl flex-col overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm sm:flex-row"
          style={{ '--reveal-delay': '0.24s' }}
        >
          <input
            className="flex-1 px-4 py-3 text-sm text-slate-700 outline-none placeholder:text-slate-400"
            type="email"
            placeholder="Enter your email address"
          />
          <button
            className="bg-[#3B5BFC] px-6 py-3 text-sm font-semibold text-white transition hover:brightness-110 sm:rounded-none"
            type="submit"
          >
            Subscribe Now
          </button>
        </form>
      </div>
    </section>
  )
}

export default Newsletter
