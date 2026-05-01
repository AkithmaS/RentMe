import { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { assets } from '../assets/assets';

const mockBookings = [
  {
    id: '1',
    car: {
      brand: 'BMW',
      model: 'M4 COMPETITION',
      year: 2022,
      category: 'SUV',
      location: 'Los Angeles',
      imageUrl: assets.car_image1 || 'https://images.unsplash.com/photo-1555215695-3004980ad54e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    },
    bookingNumber: '#1',
    status: 'confirmed',
    rentalPeriod: '4/10/2025 - 4/15/2025',
    pickupLocation: 'Airport Terminal 1',
    returnLocation: 'Downtown Office',
    price: 475,
    bookedOn: '4/1/2025'
  },
  {
    id: '2',
    car: {
      brand: 'BMW',
      model: 'M4 COMPETITION',
      year: 2022,
      category: 'SUV',
      location: 'Los Angeles',
      imageUrl: assets.car_image1 || 'https://images.unsplash.com/photo-1555215695-3004980ad54e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    },
    bookingNumber: '#2',
    status: 'confirmed',
    rentalPeriod: '4/10/2025 - 4/15/2025',
    pickupLocation: 'Airport Terminal 1',
    returnLocation: 'Downtown Office',
    price: 475,
    bookedOn: '4/1/2025'
  },
  {
    id: '3',
    car: {
      brand: 'BMW',
      model: 'M4 COMPETITION',
      year: 2022,
      category: 'SUV',
      location: 'Los Angeles',
      imageUrl: assets.car_image1 || 'https://images.unsplash.com/photo-1555215695-3004980ad54e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    },
    bookingNumber: '#3',
    status: 'confirmed',
    rentalPeriod: '4/10/2025 - 4/15/2025',
    pickupLocation: 'Airport Terminal 1',
    returnLocation: 'Downtown Office',
    price: 475,
    bookedOn: '4/1/2025'
  },
  {
    id: '4',
    car: {
      brand: 'BMW',
      model: 'M4 COMPETITION',
      year: 2022,
      category: 'SUV',
      location: 'Los Angeles',
      imageUrl: assets.car_image1 || 'https://images.unsplash.com/photo-1555215695-3004980ad54e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    },
    bookingNumber: '#4',
    status: 'confirmed',
    rentalPeriod: '4/10/2025 - 4/15/2025',
    pickupLocation: 'Airport Terminal 1',
    returnLocation: 'Downtown Office',
    price: 475,
    bookedOn: '4/1/2025'
  }
];

const MyBookings = () => {
  // Smooth scroll to top on load
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-white font-['DM_Sans',sans-serif] animate-[fadeIn_0.5s_ease-out]">
      <Navbar />

      <main className="mx-auto w-full max-w-5xl px-6 py-12 flex-grow">
        {/* Header Section */}
        <div className="mb-10 text-left">
          <h1 className="text-3xl font-bold text-slate-900 reveal" style={{ '--reveal-delay': '0s' }}>
            My Bookings
          </h1>
          <p className="mt-2 text-slate-500 reveal" style={{ '--reveal-delay': '0.1s' }}>
            View and manage your car bookings
          </p>
        </div>

        {/* Bookings List */}
        <div className="flex flex-col gap-6">
          {mockBookings.map((booking, index) => (
            <article
              key={booking.id}
              className="group flex flex-col md:flex-row overflow-hidden rounded-xl border border-slate-200 bg-white p-5 transition-all duration-300 hover:shadow-lg hover:border-slate-300 reveal"
              style={{
                '--reveal-delay': `${0.1 * index}s`,
                animation: `slideUp 0.6s ease-out ${0.1 * index}s backwards`
              }}
            >
              {/* Left Section: Car Image & Info */}
              <div className="flex flex-col md:w-1/3">
                <img
                  className="h-44 w-full rounded-lg object-cover sm:h-48 md:w-64"
                  src={booking.car.imageUrl}
                  alt={`${booking.car.brand} ${booking.car.model}`}
                  loading="lazy"
                />
                <div className="mt-4">
                  <h3 className="text-sm font-bold text-slate-800 uppercase tracking-tight">
                    {booking.car.brand} {booking.car.model}
                  </h3>
                  <p className="mt-1 text-xs text-slate-500">
                    {booking.car.year} • {booking.car.category} • {booking.car.location}
                  </p>
                </div>
              </div>

              {/* Middle Section: Booking Details */}
              <div className="mt-6 flex flex-col md:mt-0 md:w-1/3 md:pl-6 border-t md:border-t-0 md:border-l border-slate-100 pt-6 md:pt-0">
                <div className="flex items-center gap-2 mb-6">
                  <span className="rounded-md bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600">
                    Booking {booking.bookingNumber}
                  </span>
                  <span className="rounded-md bg-green-100 px-2.5 py-1 text-xs font-semibold text-green-600 lowercase">
                    {booking.status}
                  </span>
                </div>

                <div className="flex flex-col gap-5">
                  <div className="flex items-start gap-3">
                    <img src={assets.calendar_icon_colored || assets.tick_icon} alt="Calendar" className="w-5 h-5 mt-0.5 opacity-80" />
                    <div>
                      <p className="text-xs font-medium text-slate-500">Rental Period</p>
                      <p className="mt-0.5 text-sm font-semibold text-slate-800">{booking.rentalPeriod}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <img src={assets.location_icon_colored || assets.location_icon} alt="Location" className="w-5 h-5 mt-0.5 opacity-80" />
                    <div>
                      <p className="text-xs font-medium text-slate-500">Pick-up Location</p>
                      <p className="mt-0.5 text-sm font-semibold text-slate-800">{booking.pickupLocation}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <img src={assets.location_icon} alt="Location" className="w-5 h-5 mt-0.5 opacity-80" />
                    <div>
                      <p className="text-xs font-medium text-slate-500">Return Location</p>
                      <p className="mt-0.5 text-sm font-semibold text-slate-800">{booking.returnLocation}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Section: Price & Actions */}
              <div className="mt-6 flex flex-col items-start justify-between border-t border-slate-100 pt-6 md:mt-0 md:w-1/3 md:items-end md:border-t-0 md:pt-0 md:border-l md:pl-6 text-left md:text-right">
                <div className="flex flex-col md:items-end">
                  <p className="text-xs font-medium text-slate-500">Total Price</p>
                  <p className="mt-1 text-3xl font-bold text-blue-600">${booking.price}</p>
                  <p className="mt-2 text-xs text-slate-400">Booked on {booking.bookedOn}</p>
                </div>

                {/* Optional Action Button based on image context (hidden if not explicitly required, but adds visual complete feel) */}
              </div>
            </article>
          ))}
        </div>
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

export default MyBookings;
