import React from 'react'
import Title from '../../components/owner/Title'

const ManageBookings = () => {
	return (
		<section className="owner-page-animate px-8 py-6">
			<Title title="Manage Bookings" subtitle="Review incoming reservation requests." />
			<div className="mt-6 rounded-lg border border-[var(--color-border)] bg-white p-6 text-sm text-[var(--color-muted)]">
				Manage bookings list placeholder.
			</div>
		</section>
	)
}

export default ManageBookings
