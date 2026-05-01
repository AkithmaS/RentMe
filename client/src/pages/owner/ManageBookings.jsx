import React from 'react'
import Title from '../../components/owner/Title'
import Footer from '../../components/Footer'
import { assets, dummyMyBookingsData } from '../../assets/assets'

const bookings = dummyMyBookingsData.map((booking) => ({
	id: booking._id,
	carName: `${booking.car.brand} ${booking.car.model}`.trim(),
	dateRange: `${new Date(booking.pickupDate).toLocaleDateString('en-US')} to ${new Date(
		booking.returnDate,
	).toLocaleDateString('en-US')}`,
	total: `$${booking.price}`,
	status: booking.status === 'confirmed' ? 'Confirmed' : booking.status === 'pending' ? 'Pending' : 'Completed',
	image: booking.car.image,
}))

const statusClassName = {
	Confirmed: 'bg-emerald-100 text-emerald-600',
	Completed: 'bg-blue-100 text-blue-600',
	Pending: 'bg-amber-100 text-amber-700',
}

const ManageBookings = () => {
	return (
		<section className="owner-page-animate flex min-h-[calc(100vh-var(--navbar-height))] flex-col">
			<div className="px-8 py-6">
				<div className="max-w-5xl">
					<Title
						title="Manage Bookings"
						subtitle="Track all customer bookings, approve or cancel requests, and manage booking statuses."
					/>

					<div className="mt-5 overflow-hidden rounded-lg border border-[var(--color-border)] bg-white shadow-sm">
						<div className="grid grid-cols-[minmax(220px,2fr)_1.1fr_1fr_1fr_120px] border-b border-[var(--color-border)] bg-slate-50 px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
							<div>Car</div>
							<div>Date Range</div>
							<div>Total</div>
							<div>Status</div>
							<div>Actions</div>
						</div>

						<div className="divide-y divide-[var(--color-border)]">
							{bookings.map((booking) => (
								<div
									key={booking.id}
									className="grid grid-cols-[minmax(220px,2fr)_1.1fr_1fr_1fr_120px] items-center px-4 py-3 text-sm"
								>
									<div className="flex items-center gap-3">
										<img className="h-11 w-11 rounded object-cover" src={booking.image} alt={booking.carName} />
										<div>
											<p className="font-medium text-[var(--color-text)]">{booking.carName}</p>
											<p className="text-xs text-[var(--color-muted)]">{booking.carName}</p>
										</div>
									</div>

									<div className="text-[var(--color-muted)]">{booking.dateRange}</div>
									<div className="font-medium text-[var(--color-text)]">{booking.total}</div>
									<div>
										<span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${statusClassName[booking.status]}`}>
											{booking.status}
										</span>
									</div>
									<div>
										<button
											type="button"
											className="inline-flex items-center gap-1 rounded border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-500 transition hover:border-slate-300 hover:text-slate-700"
										>
											Cancel
											<span className="text-[10px] leading-none">▾</span>
										</button>
									</div>
								</div>
							))}
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
