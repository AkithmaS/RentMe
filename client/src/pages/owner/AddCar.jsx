import React from 'react'
import Title from '../../components/owner/Title'

const AddCar = () => {
	return (
		<section className="owner-page-animate px-8 py-6">
			<Title title="Add Car" subtitle="Upload a new car listing." />
			<div className="mt-6 rounded-lg border border-[var(--color-border)] bg-white p-6 text-sm text-[var(--color-muted)]">
				Add car form placeholder.
			</div>
		</section>
	)
}

export default AddCar
