import React from 'react'
import Footer from '../../components/Footer'
import { assets, dummyUserData } from '../../assets/assets'

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
			// Ignore invalid JSON and fall back to the demo user.
		}
	}

	return dummyUserData
}

const metrics = [
	{
		label: 'Total Cars',
		value: 8,
		icon: assets.carIconColored,
	},
	{
		label: 'Total Bookings',
		value: 8,
		icon: assets.listIconColored,
	},
	{
		label: 'Pending Bookings',
		value: 8,
		icon: assets.cautionIconColored,
	},
	{
		label: 'Completed Booking',
		value: 8,
		icon: assets.tick_icon,
	},
]

const recentBookings = [
	{
		id: 'b1',
		car: 'BMW 3 Series',
		date: '4/10/2025',
		price: '$475',
		status: 'Confirmed',
	},
	{
		id: 'b2',
		car: 'Ford Explorer',
		date: '4/3/2025',
		price: '$425',
		status: 'Completed',
	},
	{
		id: 'b3',
		car: 'Toyota Corolla',
		date: '4/12/2025',
		price: '$225',
		status: 'Pending',
	},
	{
		id: 'b4',
		car: 'Tesla Model 3',
		date: '4/15/2025',
		price: '$560',
		status: 'Confirmed',
	},
]

const statusStyles = {
	Confirmed: 'bg-slate-100 text-slate-700',
	Completed: 'bg-emerald-100 text-emerald-600',
	Pending: 'bg-amber-100 text-amber-700',
}

const Dashboard = () => {
	const user = getStoredUser()

	return (
		<section className="owner-page-animate flex min-h-[calc(100vh-var(--navbar-height))] flex-col">
			<div className="px-8 py-6">
				<div className="max-w-4xl">
					<h1 className="text-xl font-semibold text-[var(--color-text)] sm:text-2xl">Admin Dashboard</h1>
					<p className="mt-1 text-sm text-[var(--color-muted)]">
						Monitor overall platform performance including total cars, bookings, revenue, and
						recent activities.
					</p>
					<p className="mt-2 text-xs font-medium uppercase tracking-[0.2em] text-slate-400">
						Welcome back, {user?.name || 'Admin'}
					</p>
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
									{recentBookings.map((booking) => (
										<div
											key={booking.id}
											className="flex items-center justify-between gap-4 rounded-md border border-slate-100 px-3 py-3"
										>
											<div className="flex items-center gap-3">
												<div className="flex h-8 w-8 items-center justify-center rounded-md bg-[#eff6ff] text-[#3B82F6]">
													<img className="h-4 w-4" src={assets.calendar_icon_colored} alt="" aria-hidden="true" />
												</div>
												<div>
													<p className="text-sm font-semibold text-[var(--color-text)]">{booking.car}</p>
													<p className="text-xs text-[var(--color-muted)]">{booking.date}</p>
												</div>
											</div>
											<div className="flex items-center gap-3">
												<span className="text-xs font-semibold text-[var(--color-muted)]">{booking.price}</span>
												<span className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${statusStyles[booking.status]}`}> 
													{booking.status}
												</span>
											</div>
										</div>
									))}
								</div>
							</div>

							<div className="rounded-lg border border-[var(--color-border)] bg-white p-4 shadow-sm">
								<p className="text-sm text-[var(--color-muted)]">Monthly Revenue</p>
								<h2 className="mt-1 text-base font-semibold text-[var(--color-text)]">Revenue for current month</h2>
								<p className="mt-6 text-4xl font-semibold tracking-tight text-[#3B82F6]">$1060</p>
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
