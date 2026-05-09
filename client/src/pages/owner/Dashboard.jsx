import React, { useEffect, useState } from 'react'
import Footer from '../../components/Footer'
import { assets } from '../../assets/assets'
import { useAppContext } from '../../context/AppContext'

const statusStyles = {
	pending: 'bg-amber-100 text-amber-700',
	confirmed: 'bg-slate-100 text-slate-700',
	cancelled: 'bg-rose-100 text-rose-700',
}

const formatCurrency = (value, currency) => `${currency} ${Number(value || 0).toLocaleString()}`

const formatBookingDate = (booking) => {
	const rawDate = booking?.pickupDate || booking?.createdAt
	if (!rawDate) return 'N/A'

	return new Date(rawDate).toLocaleDateString('en-US', {
		month: 'numeric',
		day: 'numeric',
		year: 'numeric',
	})
}

const getCarLabel = (car) => {
	if (!car) return 'Unknown car'
	if (typeof car === 'string') return car

	return [car.brand, car.model].filter(Boolean).join(' ') || 'Unknown car'
}

const formatRange = (pickupDate, returnDate) => {
	if (!pickupDate || !returnDate) return 'N/A'
	return `${new Date(pickupDate).toLocaleDateString('en-US')} to ${new Date(returnDate).toLocaleDateString('en-US')}`
}

const Dashboard = () => {
	const { axios, currency, user, token, navigate, cars, fetchOwnerCars } = useAppContext()
	const [dashboardData, setDashboardData] = useState(null)
	const [ownerBookings, setOwnerBookings] = useState([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState('')

	useEffect(() => {
		let isMounted = true

		if (!token) {
			navigate('/Home')
			return () => {
				isMounted = false
			}
		}

		if (!user) {
			return () => {
				isMounted = false
			}
		}

		fetchOwnerCars()

		const fetchDashboardData = async () => {
			try {
				setLoading(true)
				setError('')

				const { data } = await axios.get('/api/booking/owner-bookings')

				if (!isMounted) return

				if (data.success) {
					const bookings = data.bookings || []
					setOwnerBookings(bookings)
					const confirmedBookings = bookings.filter((booking) => booking.status === 'confirmed')
					const pendingBookings = bookings.filter((booking) => booking.status === 'pending')
					const cancelledBookings = bookings.filter((booking) => booking.status === 'cancelled')
					const totalSpent = confirmedBookings.reduce((sum, booking) => sum + Number(booking.price || 0), 0)

					setDashboardData({
						totalBookings: bookings.length,
						pendingBookings: pendingBookings.length,
						completedBookings: confirmedBookings.length,
						cancelledBookings: cancelledBookings.length,
						totalSpent,
						recentBookings: bookings.slice(0, 3),
					})
				} else {
					setDashboardData(null)
					setOwnerBookings([])
					setError(data.message || 'Failed to load dashboard data')
				}
			} catch (fetchError) {
				if (!isMounted) return
				setDashboardData(null)
				setOwnerBookings([])
				setError(fetchError.response?.data?.message || 'Failed to load dashboard data')
			} finally {
				if (isMounted) {
					setLoading(false)
				}
			}
		}

		fetchDashboardData()

		return () => {
			isMounted = false
		}
	}, [axios, fetchOwnerCars, navigate, token, user])

	const metrics = [
		{ label: 'Total Cars', value: loading ? '—' : cars.length, icon: assets.carIconColored },
		{ label: 'Total Bookings', value: loading ? '—' : ownerBookings.length, icon: assets.listIconColored },
		{ label: 'Pending Bookings', value: loading ? '—' : ownerBookings.filter((booking) => booking.status === 'pending').length, icon: assets.cautionIconColored },
		{ label: 'Completed Bookings', value: loading ? '—' : dashboardData?.completedBookings ?? 0, icon: assets.tick_icon },
	]

	const recentBookings = ownerBookings.slice(0, 3)
	const totalSpent = dashboardData?.totalSpent ?? 0

	return (
		<section className="owner-page-animate flex min-h-[calc(100vh-var(--navbar-height))] flex-col">
			<div className="px-8 py-6">
				<div className="max-w-4xl">
					<h1 className="text-xl font-semibold text-[var(--color-text)] sm:text-2xl">My Dashboard</h1>
					<p className="mt-1 text-sm text-[var(--color-muted)]">
						Monitor overall platform performance including total cars, bookings, revenue and recent activities.
					</p>
					<p className="mt-2 text-xs font-medium uppercase tracking-[0.2em] text-slate-400">
						Welcome back, {user?.name || 'User'}
					</p>
					{error ? (
						<p className="mt-3 rounded-md border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700">
							{error}
						</p>
					) : null}
				</div>

				<div className="mt-5 grid gap-4 xl:grid-cols-[minmax(0,1.45fr)_minmax(280px,0.75fr)]">
					<div className="space-y-4">
						<div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
							{metrics.map((metric) => (
								<div
									key={metric.label}
									className="flex items-center justify-between rounded-lg border border-[var(--color-border)] bg-white px-4 py-3 shadow-sm"
								>
									<div>
										<p className="text-xs text-[var(--color-muted)]">{metric.label}</p>
										<p className="mt-1 text-xl font-semibold text-[var(--color-text)]">{metric.value}</p>
									</div>
									<div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#eff6ff] text-[#3B82F6]">
										<img className="h-4 w-4" src={metric.icon} alt="" aria-hidden="true" />
									</div>
								</div>
							))}
						</div>

						<div className="grid gap-4 lg:grid-cols-[minmax(0,1.15fr)_minmax(260px,0.85fr)]">
							<div className="rounded-lg border border-[var(--color-border)] bg-white p-4 shadow-sm">
								<div className="mb-4">
									<h2 className="text-base font-semibold text-[var(--color-text)]">Recent Bookings</h2>
									<p className="text-xs text-[var(--color-muted)]">Latest customer bookings</p>
								</div>

								<div className="space-y-3">
									{loading ? (
										<p className="text-sm text-[var(--color-muted)]">Loading recent bookings...</p>
									) : recentBookings.length > 0 ? (
										recentBookings.map((booking) => {
											const status = String(booking.status || 'pending').toLowerCase()
											const statusLabel = status.charAt(0).toUpperCase() + status.slice(1)

											return (
												<div
													key={booking._id || booking.id}
													className="flex items-center justify-between gap-4 rounded-md border border-slate-100 px-3 py-3"
												>
													<div className="flex items-center gap-3">
														<div className="flex h-8 w-8 items-center justify-center rounded-md bg-[#eff6ff] text-[#3B82F6]">
															<img className="h-4 w-4" src={assets.calendar_icon_colored} alt="" aria-hidden="true" />
														</div>
														<div>
															<p className="text-sm font-semibold text-[var(--color-text)]">{getCarLabel(booking.car)}</p>
															<p className="text-xs text-[var(--color-muted)]">{formatBookingDate(booking)}</p>
															<p className="text-xs text-[var(--color-muted)]">{formatRange(booking.pickupDate, booking.returnDate)}</p>
														</div>
													</div>
													<div className="flex items-center gap-3">
														<span className="text-xs font-semibold text-[var(--color-muted)]">{formatCurrency(booking.price, currency)}</span>
														<span className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${statusStyles[status] || 'bg-slate-100 text-slate-700'}`}>
															{statusLabel}
														</span>
													</div>
												</div>
											)
										})
									) : (
										<p className="text-sm text-[var(--color-muted)]">No recent bookings found.</p>
									)}
								</div>
							</div>

							<div className="rounded-lg border border-[var(--color-border)] bg-white p-4 shadow-sm">
								
								<h2 className="mt-1 text-base font-semibold text-[var(--color-text)]">Monthly Revenue</h2>
								<p className="text-sm text-[var(--color-muted)]">Revenue for current month</p>
								<p className="mt-6 text-4xl font-semibold tracking-tight text-[#3B82F6]">
									{loading ? '—' : formatCurrency(totalSpent, currency)}
								</p>
							</div>
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

export default Dashboard
