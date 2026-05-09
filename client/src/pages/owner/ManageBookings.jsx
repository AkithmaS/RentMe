import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import Title from '../../components/owner/Title'
import Footer from '../../components/Footer'
import { assets } from '../../assets/assets'
import { useAppContext } from '../../context/AppContext'

const statusClassName = {
	pending: 'bg-amber-100 text-amber-700',
	confirmed: 'bg-emerald-100 text-emerald-600',
	cancelled: 'bg-rose-100 text-rose-600',
}

const statusOptions = [
	{ label: 'Pending', value: 'pending' },
	{ label: 'Confirmed', value: 'confirmed' },
	{ label: 'Cancelled', value: 'cancelled' },
]

const formatStatusLabel = (status) => {
	const normalized = String(status || 'pending').toLowerCase()
	return normalized.charAt(0).toUpperCase() + normalized.slice(1)
}

const formatCurrency = (value, currency) => `${currency} ${Number(value || 0).toLocaleString()}`

const formatDateRange = (pickupDate, returnDate) => {
	if (!pickupDate || !returnDate) return 'N/A'
	return `${new Date(pickupDate).toLocaleDateString('en-US')} to ${new Date(returnDate).toLocaleDateString('en-US')}`
}

const formatShortDate = (value) => {
	if (!value) return 'N/A'
	return new Date(value).toLocaleDateString('en-US')
}

const getCarName = (car) => {
	if (!car) return 'Unknown car'
	if (typeof car === 'string') return car
	return [car.brand, car.model].filter(Boolean).join(' ') || 'Unknown car'
}

const ManageBookings = () => {
	const { axios, currency } = useAppContext()
	const [bookings, setBookings] = useState([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState('')
	const [actionLoadingId, setActionLoadingId] = useState('')

	useEffect(() => {
		let isMounted = true

		const loadBookings = async () => {
			try {
				setLoading(true)
				setError('')

				const { data } = await axios.get('/api/booking/owner-bookings')

				if (!isMounted) return

				if (data.success) {
					setBookings(data.bookings || [])
				} else {
					setBookings([])
					setError(data.message || 'Failed to load bookings')
				}
			} catch (fetchError) {
				if (!isMounted) return
				setBookings([])
				setError(fetchError.response?.data?.message || 'Failed to load bookings')
			} finally {
				if (isMounted) setLoading(false)
			}
		}

		loadBookings()

		return () => {
			isMounted = false
		}
	}, [axios])

	const changeBookingStatus = async (bookingId, status) => {
		try {
			setActionLoadingId(bookingId)
			const { data } = await axios.post('/api/booking/change-status', { bookingId, status })

			if (!data.success) {
				toast.error(data.message || 'Failed to update booking status')
				return
			}

			setBookings((currentBookings) =>
				currentBookings.map((booking) => (booking._id === bookingId ? { ...booking, status } : booking)),
			)
			toast.success(data.message || 'Booking status updated')
		} catch (statusError) {
			toast.error(statusError.response?.data?.message || 'Failed to update booking status')
		} finally {
			setActionLoadingId('')
		}
	}

	return (
		<section className="owner-page-animate flex min-h-[calc(100vh-var(--navbar-height))] flex-col">
			<div className="px-8 py-6">
				<div className="max-w-5xl">
					<Title
						title="Manage Bookings"
						subtitle="Track all customer bookings, approve or cancel requests, and manage booking statuses."
					/>
					{error ? (
						<p className="mt-3 rounded-md border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700">{error}</p>
					) : null}

					<div className="mt-5 overflow-hidden rounded-lg border border-[var(--color-border)] bg-white shadow-sm">
						<div className="grid grid-cols-[minmax(180px,1.5fr)_1.1fr_1fr_1fr_1fr_120px] border-b border-[var(--color-border)] bg-slate-50 px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
							<div>Car</div>
							<div>Record</div>
							<div>Date Range</div>
							<div>Total</div>
							<div>Status</div>
							<div>Actions</div>
						</div>

						<div className="divide-y divide-[var(--color-border)]">
							{loading ? (
								<div className="px-4 py-6 text-sm text-[var(--color-muted)]">Loading bookings...</div>
							) : bookings.length > 0 ? (
								bookings.map((booking) => {
									const status = String(booking.status || 'pending').toLowerCase()
									const statusLabel = formatStatusLabel(status)
									const carName = getCarName(booking.car)
									const bookingId = booking._id ? booking._id.slice(-8).toUpperCase() : 'N/A'

									return (
										<div
											key={booking._id}
											className="grid grid-cols-[minmax(180px,1.5fr)_1.1fr_1fr_1fr_1fr_120px] items-center px-4 py-3 text-sm"
										>
											<div className="flex items-center gap-3">
												<img className="h-11 w-11 rounded object-cover" src={booking.car?.image || assets.car_image1} alt={carName} />
												<div>
													<p className="font-medium text-[var(--color-text)]">{carName}</p>
													<p className="text-xs text-[var(--color-muted)]">{booking.user?.name || 'Customer'}</p>
												</div>
											</div>

											<div className="text-[var(--color-muted)]">
												<p className="font-medium text-[var(--color-text)]">#{bookingId}</p>
												<p className="text-xs">Booked {formatShortDate(booking.createdAt)}</p>
											</div>

											<div className="text-[var(--color-muted)]">{formatDateRange(booking.pickupDate, booking.returnDate)}</div>
											<div className="font-medium text-[var(--color-text)]">{formatCurrency(booking.price, currency)}</div>
											<div>
												<span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${statusClassName[status] || 'bg-slate-100 text-slate-700'}`}>
													{statusLabel}
												</span>
											</div>
											<div>
												<select
													className="w-full rounded border border-slate-200 bg-white px-2 py-1.5 text-xs font-medium text-slate-600 outline-none transition hover:border-slate-300"
													value={status}
													onChange={(event) => changeBookingStatus(booking._id, event.target.value)}
													disabled={actionLoadingId === booking._id}
												>
													{statusOptions.map((option) => (
														<option key={option.value} value={option.value}>
															{option.label}
														</option>
													))}
												</select>
											</div>
										</div>
									)
								})
							) : (
								<div className="px-4 py-6 text-sm text-[var(--color-muted)]">No bookings found.</div>
							)}
						</div>
					</div>
				</div>
			</div>

			<div className="mt-48">
				<Footer />
			</div>
		</section>
	)
}

export default ManageBookings
