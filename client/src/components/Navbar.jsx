import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { dummyUserData } from '../assets/assets'
import Login from './Login'

const getStoredUser = () => {
  if (typeof window === 'undefined') return dummyUserData

  const storageKeys = ['user', 'userData', 'currentUser']
  for (const key of storageKeys) {
    const raw = window.localStorage.getItem(key)
    if (!raw) continue

    try {
      const parsed = JSON.parse(raw)
      if (parsed?.name) return parsed
    } catch (error) {
      // Ignore invalid JSON and fall back to defaults.
    }
  }

  return dummyUserData
}

const Navbar = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false)
  const user = getStoredUser()
  const isOwner = user?.role === 'owner'

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
          <Link className="transition hover:text-slate-900" to="/Home">
            Home
          </Link>
          <Link className="transition hover:text-slate-900" to="/Cars">
            Cars
          </Link>
          <Link className="transition hover:text-slate-900" to="/MyBookings">
            My Bookings
          </Link>
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

          {isOwner ? (
            <Link className="text-sm font-medium text-slate-600 hover:text-slate-900" to="/owner/dashboard">
              Dashboard
            </Link>
          ) : null}
          <button
            className="rounded-full bg-[#3B5BFC] px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:brightness-110"
            onClick={() => setIsLoginOpen(true)}
            type="button"
          >
            Login
          </button>
        </div>
      </div>

      <Login isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </header>
  )
}

export default Navbar
