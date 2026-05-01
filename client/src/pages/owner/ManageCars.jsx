import React from 'react'
import Title from '../../components/owner/Title'

const ManageCars = () => {
	return (
		<section className="owner-page-animate px-8 py-6">
			<Title title="Manage Cars" subtitle="Update or remove existing listings." />
			<div className="mt-6 rounded-lg border border-[var(--color-border)] bg-white p-6 text-sm text-[var(--color-muted)]">
				Manage cars table placeholder.
			</div>
		</section>
	)
}

export default ManageCars
