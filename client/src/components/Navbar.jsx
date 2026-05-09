import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import Login from './Login'
import { motion } from 'motion/react'

const Navbar = () => {
  const { user, logout, showLogin, setShowLogin } = useContext(AppContext)

  return (
    <>
      <motion.header 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-50 w-full border-b border-black/5 bg-white">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-6 px-6 py-4">
          <Link className="flex items-center gap-2 text-lg font-semibold text-slate-900 transition hover:opacity-80" to="/Home">
            <span className="inline-flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-white">
              <motion.img
                whileHover={{ scale: 1.05 }}
                src="/favicon.svg"
                alt="RentMe logo"
                className="h-full w-full object-contain"
              />
            </span>
            <span>RentMe</span>
          </Link>

          <nav className="hidden items-center gap-8 text-sm font-medium text-slate-600 md:flex">
            <Link className="transition hover:text-slate-900" to="/Home">
              Home
            </Link>
            <Link className="transition hover:text-slate-900" to="/cars">
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

            {user ? (
              <Link
                className="rounded-full border border-[#3B5BFC] px-5 py-2 text-sm font-semibold text-[#3B5BFC] transition hover:bg-[#eff4ff]"
                to="/owner/dashboard"
              >
                Dashboard
              </Link>
            ) : null}

            <button
              className="rounded-full bg-[#3B5BFC] px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:brightness-110"
              onClick={() => {
                if (user) {
                  logout()
                  return
                }
                setShowLogin(true)
              }}
              type="button"
            >
              {user ? 'Logout' : 'Login'}
            </button>
          </div>
        </div>
      </motion.header>

      <Login isOpen={showLogin} onClose={() => setShowLogin(false)} />
    </>
  )
}

export default Navbar
