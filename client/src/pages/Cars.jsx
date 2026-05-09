import { useEffect, useMemo, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { toast } from 'react-hot-toast';
import { assets } from '../assets/assets';
import { useAppContext } from '../context/AppContext'

const Cars = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { cars, fetchCars, currency } = useAppContext()
  const [searchTerm, setSearchTerm] = useState(searchParams.get('location') || '')

  const searchQuery = searchParams.get('location') || ''

  // Smooth scroll to top on load
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  useEffect(() => {
    if (!cars.length) {
      fetchCars()
    }
  }, [cars.length, fetchCars])

  useEffect(() => {
    setSearchTerm(searchQuery)
  }, [searchQuery])

  const filteredCars = useMemo(() => {
    const term = searchTerm.trim().toLowerCase()

    return cars.filter((car) => {
      const searchableText = [
        car.brand,
        car.model,
        car.category,
        car.fuel_type,
        car.transmission,
        car.location,
        car.year,
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase()

      return searchableText.includes(term)
    })
  }, [cars, searchTerm])

  const formatImage = (car) => car.image || assets.car_image1

  const handleCarClick = (car) => {
    if (car.isAvailable === false) {
      toast.error('Unable to book as unavailable')
      return
    }

    navigate(`/cars/${car._id}`, { state: { car } })
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#F8F9FA] font-['DM_Sans',sans-serif] animate-[fadeIn_0.5s_ease-out]">
      <Navbar />

      {/* Hero Section */}
      <div className="w-full bg-[#F5F8FF] py-16 text-center">
        <h1 className="text-3xl font-bold text-slate-800 md:text-4xl reveal" style={{ '--reveal-delay': '0s' }}>
          Available Cars
        </h1>
        <p className="mt-3 text-slate-500 reveal" style={{ '--reveal-delay': '0.1s' }}>
          Browse our selection of premium vehicles available for your next adventure
        </p>

        {/* Search Bar */}
        <div className="reveal mx-auto mt-8 flex max-w-2xl items-center gap-3 rounded-full bg-white px-5 py-3 shadow-sm transition-all focus-within:ring-2 focus-within:ring-blue-500 focus-within:shadow-md" style={{ '--reveal-delay': '0.2s' }}>
          <img src={assets.search_icon} alt="Search" className="h-5 w-5 opacity-50" />
          <input
            type="text"
            placeholder="Search by make, model, location, or features"
            className="flex-1 border-none bg-transparent text-sm text-slate-700 outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="button" className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-slate-100 transition-colors">
            <img src={assets.filter_icon || assets.search_icon} alt="Filter" className="h-5 w-5 opacity-60" />
          </button>
        </div>
      </div>

      <main className="mx-auto w-full max-w-6xl px-6 py-12 flex-grow">
        {/* Result Count */}
        <div className="mb-8 text-sm font-medium text-slate-600 reveal" style={{ '--reveal-delay': '0.3s' }}>
          Showing {filteredCars.length} Car{filteredCars.length !== 1 && 's'}
        </div>

        {/* Cars Grid */}
        {filteredCars.length > 0 ? (
          <div className="grid w-full gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {filteredCars.map((car, index) => (
              <article
                key={car._id}
                className={`reveal group overflow-hidden rounded-2xl border bg-white shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl ${car.isAvailable === false ? 'cursor-not-allowed border-rose-200 opacity-80' : 'cursor-pointer border-slate-100'}`}
                style={{
                  '--reveal-delay': `${0.1 * index}s`,
                  animation: `slideUp 0.6s ease-out ${0.1 * index}s backwards`
                }}
                  onClick={() => handleCarClick(car)}
              >
                <div className="relative overflow-hidden">
                  <img
                    className="h-56 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    src={formatImage(car)}
                    alt={`${car.brand} ${car.model}`}
                    loading="lazy"
                  />
                    <span className={`absolute left-3 top-3 rounded-full px-3 py-1 text-xs font-semibold text-white shadow-sm ${car.isAvailable === false ? 'bg-rose-500' : 'bg-emerald-500 animate-pulse'}`}>
                      {car.isAvailable === false ? 'Unavailable' : 'Available Now'}
                    </span>
                  <span className="absolute bottom-3 right-3 rounded-full bg-black/80 backdrop-blur-sm px-3 py-1 text-xs font-semibold text-white">
                    {currency} {car.pricePerDay}/day
                  </span>
                </div>

                <div className="flex flex-col gap-4 p-5 text-left">
                  <div>
                    <h3 className="text-lg font-bold text-slate-800">
                      {car.brand} {car.model}
                    </h3>
                    <p className="text-xs text-slate-500 font-medium tracking-wide uppercase mt-1">
                      {car.category} {car.year}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-y-3 gap-x-2 text-xs font-medium text-slate-500">
                    <div className="flex items-center gap-2">
                      <img className="h-4 w-4 opacity-70" src={assets.users_icon} alt="Seats" />
                      {car.seating_capacity} Seats
                    </div>
                    <div className="flex items-center gap-2">
                      <img className="h-4 w-4 opacity-70" src={assets.fuel_icon} alt="Fuel" />
                      {car.fuel_type}
                    </div>
                    <div className="flex items-center gap-2">
                      <img className="h-4 w-4 opacity-70" src={assets.car_icon} alt="Transmission" />
                      {car.transmission}
                    </div>
                    <div className="flex items-center gap-2">
                      <img className="h-4 w-4 opacity-70" src={assets.location_icon} alt="Location" />
                      {car.location}
                    </div>
                    <div className="flex items-center gap-2">
                      <img className="h-4 w-4 opacity-70" src={assets.tick_icon} alt="Availability" />
                      {car.isAvailable === false ? 'Not Available' : 'Available'}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="py-20 text-center">
            <h3 className="text-xl font-semibold text-slate-800">No cars found</h3>
            <p className="text-slate-500 mt-2">Try adjusting your search criteria</p>
          </div>
        )}
      </main>

      <Footer />

      {/* Internal Custom Styles for precise animations */}
      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}} />
    </div>
  )
}

export default Cars
