import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { assets } from '../assets/assets';

// Local mock data with 6 cars
const carsData = [
  {
    id: 1,
    brand: 'BMW',
    model: 'X5',
    year: 2022,
    category: 'SUV',
    seats: 5,
    fuel: 'Gasoline',
    transmission: 'Automatic',
    location: 'Los Angeles',
    pricePerDay: 100,
    imageUrl: assets.car_image1 || 'https://images.unsplash.com/photo-1555215695-3004980ad54e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    available: true,
  },
  {
    id: 2,
    brand: 'Tesla',
    model: 'Model 3',
    year: 2023,
    category: 'Sedan',
    seats: 5,
    fuel: 'Electric',
    transmission: 'Automatic',
    location: 'San Francisco',
    pricePerDay: 120,
    imageUrl: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    available: true,
  },
  {
    id: 3,
    brand: 'Toyota',
    model: 'Corolla',
    year: 2021,
    category: 'Sedan',
    seats: 5,
    fuel: 'Hybrid',
    transmission: 'Automatic',
    location: 'Chicago',
    pricePerDay: 80,
    imageUrl: assets.car_image2 || 'https://images.unsplash.com/photo-1590362891991-f766e409951a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    available: true,
  },
  {
    id: 4,
    brand: 'Jeep',
    model: 'Wrangler',
    year: 2023,
    category: 'SUV',
    seats: 4,
    fuel: 'Hybrid',
    transmission: 'Automatic',
    location: 'Los Angeles',
    pricePerDay: 130,
    imageUrl: assets.car_image3 || 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    available: true,
  },
  {
    id: 5,
    brand: 'Ford',
    model: 'Mustang',
    year: 2022,
    category: 'Coupe',
    seats: 4,
    fuel: 'Gasoline',
    transmission: 'Manual',
    location: 'New York',
    pricePerDay: 150,
    imageUrl: 'https://images.unsplash.com/photo-1584345611127-8df5e8c15ff9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    available: true,
  },
  {
    id: 6,
    brand: 'Audi',
    model: 'Q7',
    year: 2023,
    category: 'SUV',
    seats: 7,
    fuel: 'Diesel',
    transmission: 'Automatic',
    location: 'Houston',
    pricePerDay: 140,
    imageUrl: 'https://images.unsplash.com/photo-1606152421802-db97b9c7a11b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    available: true,
  }
];

const Cars = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCars, setFilteredCars] = useState(carsData);

  // Smooth scroll to top on load
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Live filtering
  useEffect(() => {
    const term = searchTerm.toLowerCase();
    const results = carsData.filter(
      (car) =>
        car.brand.toLowerCase().includes(term) ||
        car.model.toLowerCase().includes(term) ||
        car.category.toLowerCase().includes(term) ||
        car.fuel.toLowerCase().includes(term)
    );
    setFilteredCars(results);
  }, [searchTerm]);

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
            placeholder="Search by make, model, or features"
            className="flex-1 border-none bg-transparent text-sm text-slate-700 outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-slate-100 transition-colors">
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
                key={car.id}
                className="reveal group cursor-pointer overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl"
                style={{
                  '--reveal-delay': `${0.1 * index}s`,
                  animation: `slideUp 0.6s ease-out ${0.1 * index}s backwards`
                }}
                onClick={() => navigate(`/cars/${car.id}`, { state: { car } })}
              >
                <div className="relative overflow-hidden">
                  <img
                    className="h-56 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    src={car.imageUrl}
                    alt={`${car.brand} ${car.model}`}
                    loading="lazy"
                  />
                  {car.available && (
                    <span className="absolute left-3 top-3 rounded-full bg-emerald-500 px-3 py-1 text-xs font-semibold text-white shadow-sm animate-pulse">
                      Available Now
                    </span>
                  )}
                  <span className="absolute bottom-3 right-3 rounded-full bg-black/80 backdrop-blur-sm px-3 py-1 text-xs font-semibold text-white">
                    ${car.pricePerDay}/day
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
                      {car.seats} Seats
                    </div>
                    <div className="flex items-center gap-2">
                      <img className="h-4 w-4 opacity-70" src={assets.fuel_icon} alt="Fuel" />
                      {car.fuel}
                    </div>
                    <div className="flex items-center gap-2">
                      <img className="h-4 w-4 opacity-70" src={assets.car_icon} alt="Transmission" />
                      {car.transmission}
                    </div>
                    <div className="flex items-center gap-2">
                      <img className="h-4 w-4 opacity-70" src={assets.location_icon} alt="Location" />
                      {car.location}
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
  );
};

export default Cars;
