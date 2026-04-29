import React from 'react'

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-black/5 bg-white">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-6 px-6 py-4">
        <div className="flex items-center gap-2 text-lg font-semibold text-slate-900">
          <span className="inline-flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-white">
            <img className="h-full w-full object-contain" src="/favicon.svg" alt="RentMe logo" />
          </span>
          <span>RentMe</span>
        </div>

        <nav className="hidden items-center gap-8 text-sm font-medium text-slate-600 md:flex">
          <a className="transition hover:text-slate-900" href="#">
            Home
          </a>
          <a className="transition hover:text-slate-900" href="#">
            Cars
          </a>
          <a className="transition hover:text-slate-900" href="#">
            About
          </a>
        </nav>

        <div className="flex items-center gap-4">
          <div className="hidden items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-500 sm:flex">
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
            <input
              className="w-28 bg-transparent text-sm outline-none placeholder:text-slate-400"
              placeholder="Search cars"
              type="text"
            />
          </div>

          <a className="text-sm font-medium text-slate-600 hover:text-slate-900" href="#">
            List a car
          </a>
          <button className="rounded-full bg-[#3B5BFC] px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:brightness-110">
            Sign up
          </button>
        </div>
      </div>
    </header>
  )
}

export default Navbar
