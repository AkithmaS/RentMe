import React from 'react'
import Title from '../../components/owner/Title'
import Footer from '../../components/Footer'
import { assets } from '../../assets/assets'

const cars = [
	{
		name: 'Toyota Corolla',
		location: '4 seats • automatic',
		category: 'Economy',
		price: '$45/day',
		status: 'Available',
		image: assets.car_image2,
	},
	{
		name: 'Honda Civic',
		location: '4 seats • automatic',
		category: 'Economy',
		price: '$48/day',
		status: 'Not Available',
		image: assets.car_image3,
	},
	{
		name: 'BMW 3 Series',
		location: '4 seats • automatic',
		category: 'Luxury',
		price: '$115/day',
		status: 'Available',
		image: assets.car_image1,
	},
	{
		name: 'Tesla Model 3',
		location: '4 seats • automatic',
		category: 'Electric',
		price: '$132/day',
		status: 'Available',
		image: assets.car_image4,
	},
]

const statusClassName = {
	Available: 'bg-emerald-100 text-emerald-600',
	'Not Available': 'bg-rose-100 text-rose-600',
}

const ManageCars = () => {
	return (
		<section className="owner-page-animate flex min-h-[calc(100vh-var(--navbar-height))] flex-col">
			<div className="px-8 py-6">
				<div className="max-w-5xl">
					<Title
						title="Manage Cars"
						subtitle="View all listed cars, update their details, or remove cars from the booking platform."
					/>

					<div className="mt-5 overflow-hidden rounded-lg border border-[var(--color-border)] bg-white shadow-sm">
						<div className="grid grid-cols-[minmax(220px,2fr)_1fr_1fr_1fr_110px] border-b border-[var(--color-border)] bg-slate-50 px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
							<div>Car</div>
							<div>Category</div>
							<div>Price</div>
							<div>Status</div>
							<div>Actions</div>
						</div>

						<div className="divide-y divide-[var(--color-border)]">
							{cars.map((car) => (
								<div
									key={car.name}
									className="grid grid-cols-[minmax(220px,2fr)_1fr_1fr_1fr_110px] items-center px-4 py-3 text-sm"
								>
									<div className="flex items-center gap-3">
										<img className="h-11 w-11 rounded object-cover" src={car.image} alt={car.name} />
										<div>
											<p className="font-medium text-[var(--color-text)]">{car.name}</p>
											<p className="text-xs text-[var(--color-muted)]">{car.location}</p>
										</div>
									</div>

									<div className="text-[var(--color-muted)]">{car.category}</div>
									<div className="font-medium text-[var(--color-text)]">{car.price}</div>
									<div>
										<span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${statusClassName[car.status]}`}>
											{car.status}
										</span>
									</div>
									<div className="flex items-center gap-3 text-slate-500">
										<button type="button" className="transition hover:text-[#3B82F6]" aria-label={`View ${car.name}`}>
											<img className="h-4 w-4" src={assets.eye_icon} alt="" aria-hidden="true" />
										</button>
										<button type="button" className="transition hover:text-rose-500" aria-label={`Delete ${car.name}`}>
											<img className="h-4 w-4" src={assets.delete_icon} alt="" aria-hidden="true" />
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

export default ManageCars
