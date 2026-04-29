import React from 'react'

const Hero = () => {
  return (
    <section className="w-full bg-[#EEF1F8]">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center px-6 pb-20 pt-16 text-center">
        <h1
          className="reveal text-3xl font-bold text-slate-800 sm:text-4xl md:text-5xl"
          style={{ '--reveal-delay': '0s' }}
        >
          Luxury Cars on Rent
        </h1>

        <div
          className="reveal mt-10 flex w-full max-w-3xl flex-col items-center gap-4 rounded-3xl bg-white px-6 py-5 shadow-lg shadow-slate-200/80 md:flex-row md:justify-between"
          style={{ '--reveal-delay': '0.12s' }}
        >
          <div className="flex w-full flex-col gap-1 text-left md:w-auto">
            <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">
              Pickup Location
            </span>
            <select
              className="bg-transparent text-sm font-semibold text-slate-700 outline-none"
              defaultValue="Bangalore"
            >
              <option>Bangalore</option>
              <option>Mumbai</option>
              <option>Delhi</option>
            </select>
          </div>

          <div className="hidden h-10 w-px bg-slate-200 md:block" />

          <div className="flex w-full flex-col gap-1 text-left md:w-auto">
            <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">
              Pick-up Date
            </span>
            <input
              className="bg-transparent text-sm font-semibold text-slate-700 outline-none"
              type="date"
              defaultValue="2025-03-28"
            />
          </div>

          <div className="hidden h-10 w-px bg-slate-200 md:block" />

          <div className="flex w-full flex-col gap-1 text-left md:w-auto">
            <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">
              Return Date
            </span>
            <input
              className="bg-transparent text-sm font-semibold text-slate-700 outline-none"
              type="date"
              defaultValue="2025-03-30"
            />
          </div>

          <button className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-[#3B5BFC] px-6 py-3 text-sm font-semibold text-white shadow-md shadow-blue-300/50 transition hover:brightness-110 md:mt-0">
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="M20 20l-3.5-3.5" />
            </svg>
            Search
          </button>
        </div>

        <div
          className="reveal mt-12 flex w-full items-center justify-center"
          style={{ '--reveal-delay': '0.24s' }}
        >
          <img
            className="w-full max-w-4xl drop-shadow-[0_25px_30px_rgba(15,23,42,0.2)]"
            src="https://images.unsplash.com/photo-1511919884226-fd3cad34687c?q=80&w=1200&auto=format&fit=crop"
            alt="Luxury sedan"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  )
}

export default Hero
