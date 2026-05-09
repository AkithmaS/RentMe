import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { assets } from '../assets/assets';
import { useAppContext } from '../context/AppContext';

const MyBookings = () => {
  const { axios, token, currency, setShowLogin } = useAppContext();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const formatDate = (value) => new Date(value).toLocaleDateString('en-US')

  // Smooth scroll to top on load
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    let isMounted = true;

    const loadBookings = async () => {
      if (!token) {
        setBookings([]);
        setError('Please log in to view your bookings.');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError('');

        const { data } = await axios.get('/api/booking/my-bookings');

        if (!isMounted) return;

        if (data.success) {
          setBookings(data.bookings || []);
        } else {
          setBookings([]);
          setError(data.message || 'Failed to load bookings');
        }
      } catch (fetchError) {
        if (!isMounted) return;
        setBookings([]);
        setError(fetchError.response?.data?.message || 'Failed to load bookings');
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    loadBookings();

    return () => {
      isMounted = false;
    };
  }, [axios, token]);

  if (!token && !loading) {
    return (
      <div className="flex min-h-screen flex-col bg-white font-['DM_Sans',sans-serif] animate-[fadeIn_0.5s_ease-out]">
        <Navbar />
        <main className="mx-auto flex w-full max-w-5xl flex-grow flex-col items-start px-6 py-16">
          <h1 className="text-3xl font-bold text-slate-900">My Bookings</h1>
          <p className="mt-2 text-slate-500">Please log in to view your bookings.</p>
          <button
            type="button"
            onClick={() => setShowLogin(true)}
            className="mt-6 rounded-md bg-[#3B5BFC] px-4 py-3 text-sm font-semibold text-white transition hover:brightness-110"
          >
            Login
          </button>
        </main>
        <Footer />
      </div>
    );
  }

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
        {error ? (
          <div className="mb-6 rounded-md border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
            {error}
          </div>
        ) : null}

        <div className="flex flex-col gap-6">
          {loading ? (
            <div className="rounded-xl border border-slate-200 bg-white p-6 text-sm text-slate-500">
              Loading bookings...
            </div>
          ) : bookings.length > 0 ? (
            bookings.map((booking, index) => {
              const car = booking.car || {}
              const rentalPeriod = `${formatDate(booking.pickupDate)} - ${formatDate(booking.returnDate)}`
              const bookedOn = booking.createdAt ? formatDate(booking.createdAt) : 'N/A'
              const status = String(booking.status || 'pending').toLowerCase()
              const bookingLabel = booking._id ? booking._id.slice(-6).toUpperCase() : 'N/A'

              return (
                <article
                  key={booking._id || booking.id}
                  className="group flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white p-5 transition-all duration-300 hover:border-slate-300 hover:shadow-lg md:flex-row"
                  style={{
                    '--reveal-delay': `${0.1 * index}s`,
                    animation: `slideUp 0.6s ease-out ${0.1 * index}s backwards`,
                  }}
                >
                  <div className="flex flex-col md:w-1/3">
                    <img
                      className="h-44 w-full rounded-lg object-cover sm:h-48 md:w-64"
                      src={car.image || assets.car_image1}
                      alt={`${car.brand || 'Car'} ${car.model || ''}`.trim()}
                      loading="lazy"
                    />
                    <div className="mt-4">
                      <h3 className="text-sm font-bold uppercase tracking-tight text-slate-800">
                        {car.brand} {car.model}
                      </h3>
                      <p className="mt-1 text-xs text-slate-500">
                        {car.year} • {car.category} • {car.location}
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 flex flex-col border-slate-100 pt-6 md:mt-0 md:w-1/3 md:border-l md:pl-6 md:pt-0">
                    <div className="mb-6 flex items-center gap-2">
                      <span className="rounded-md bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600">
                        Booking {bookingLabel}
                      </span>
                      <span className="rounded-md bg-green-100 px-2.5 py-1 text-xs font-semibold capitalize text-green-600">
                        {status}
                      </span>
                    </div>

                    <div className="flex flex-col gap-5">
                      <div className="flex items-start gap-3">
                        <img src={assets.calendar_icon_colored || assets.tick_icon} alt="Calendar" className="mt-0.5 h-5 w-5 opacity-80" />
                        <div>
                          <p className="text-xs font-medium text-slate-500">Pickup / Return</p>
                          <p className="mt-0.5 text-sm font-semibold text-slate-800">{rentalPeriod}</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <img src={assets.location_icon_colored || assets.location_icon} alt="Location" className="mt-0.5 h-5 w-5 opacity-80" />
                        <div>
                          <p className="text-xs font-medium text-slate-500">Pick-up Location</p>
                          <p className="mt-0.5 text-sm font-semibold text-slate-800">{car.location}</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <img src={assets.location_icon} alt="Location" className="mt-0.5 h-5 w-5 opacity-80" />
                        <div>
                          <p className="text-xs font-medium text-slate-500">Status</p>
                          <p className="mt-0.5 text-sm font-semibold capitalize text-slate-800">{status}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex flex-col items-start justify-between border-t border-slate-100 pt-6 text-left md:mt-0 md:w-1/3 md:items-end md:border-l md:border-t-0 md:pl-6 md:pt-0 md:text-right">
                    <div className="flex flex-col md:items-end">
                      <p className="text-xs font-medium text-slate-500">Total Price</p>
                      <p className="mt-1 text-3xl font-bold text-blue-600">{currency} {booking.price}</p>
                      <p className="mt-2 text-xs text-slate-400">Booked on {bookedOn}</p>
                    </div>
                  </div>
                </article>
              )
            })
          ) : (
            <div className="rounded-xl border border-slate-200 bg-white p-6 text-sm text-slate-500">
              No bookings found.
            </div>
          )}
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
