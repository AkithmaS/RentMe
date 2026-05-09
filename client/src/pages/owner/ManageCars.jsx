import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import Title from '../../components/owner/Title'
import Footer from '../../components/Footer'
import { assets } from '../../assets/assets'
import { useAppContext } from '../../context/AppContext'

const statusClassName = {
	Available: 'bg-emerald-100 text-emerald-600',
	'Not Available': 'bg-rose-100 text-rose-600',
}

const ManageCars = () => {
	const { axios, currency, cars, fetchOwnerCars } = useAppContext()
	const [loading, setLoading] = useState(true)
	const [actionLoadingId, setActionLoadingId] = useState('')
	const [error, setError] = useState('')

	useEffect(() => {
		let isMounted = true

		const loadCars = async () => {
			try {
				setLoading(true)
				setError('')
				await fetchOwnerCars()
			} catch (fetchError) {
				if (!isMounted) return
				setError(fetchError.response?.data?.message || 'Failed to load cars')
			} finally {
				if (isMounted) {
					setLoading(false)
				}
			}
		}

		loadCars()

		return () => {
			isMounted = false
		}
	}, [fetchOwnerCars])

	const formatPrice = (value) => `${currency} ${Number(value || 0).toLocaleString()}/day`

	const toggleCarAvailability = async (carId) => {
		try {
			setActionLoadingId(carId)
			const { data } = await axios.post(`/api/owner/toggle-car/${carId}`)

			if (!data.success) {
				toast.error(data.message || 'Failed to update car status')
				return
			}

			await fetchOwnerCars()
			toast.success(data.message || 'Car status updated')
		} catch (toggleError) {
			toast.error(toggleError.response?.data?.message || 'Failed to update car status')
		} finally {
			setActionLoadingId('')
		}
	}

	const deleteCar = async (carId) => {
		const shouldDelete = window.confirm('Are you sure you want to delete this car?')

		if (!shouldDelete) return

		try {
			setActionLoadingId(carId)
			const { data } = await axios.post(`/api/owner/delete-car/${carId}`)

			if (!data.success) {
				toast.error(data.message || 'Failed to delete car')
				return
			}

			await fetchOwnerCars()
			toast.success(data.message || 'Car deleted successfully')
		} catch (deleteError) {
			toast.error(deleteError.response?.data?.message || 'Failed to delete car')
		} finally {
			setActionLoadingId('')
		}
	}

	const visibleCars = cars || []
	return (
		<section className="owner-page-animate flex min-h-[calc(100vh-var(--navbar-height))] flex-col">
			<div className="px-8 py-6">
				<div className="max-w-5xl">
					<Title
						title="Manage Cars"
						subtitle="View all listed cars, update their details, or remove cars from the booking platform."
					/>
					{error ? (
						<p className="mt-3 rounded-md border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700">
							{error}
						</p>
					) : null}

					<div className="mt-5 overflow-hidden rounded-lg border border-[var(--color-border)] bg-white shadow-sm">
						<div className="grid grid-cols-[minmax(220px,2fr)_1fr_1fr_1fr_110px] border-b border-[var(--color-border)] bg-slate-50 px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
							<div>Car</div>
							<div>Category</div>
							<div>Price</div>
							<div>Status</div>
							<div>Actions</div>
						</div>

						<div className="divide-y divide-[var(--color-border)]">
							{loading ? (
								<div className="px-4 py-6 text-sm text-[var(--color-muted)]">Loading cars...</div>
							) : visibleCars.length > 0 ? (
								visibleCars.map((car) => {
									const carName = `${car.brand || 'Car'} ${car.model || ''}`.trim()
									const isAvailable = car.isAvailable !== false

									return (
								<div
									key={car._id}
									className="grid grid-cols-[minmax(220px,2fr)_1fr_1fr_1fr_110px] items-center px-4 py-3 text-sm"
								>
									<div className="flex items-center gap-3">
										<img className="h-11 w-11 rounded object-cover" src={car.image} alt={carName} />
										<div>
											<p className="font-medium text-[var(--color-text)]">{carName}</p>
											<p className="text-xs text-[var(--color-muted)]">
												{car.year} • {car.seating_capacity} seats • {car.transmission}
											</p>
											<p className="text-xs text-[var(--color-muted)]">{car.location}</p>
										</div>
									</div>

									<div className="text-[var(--color-muted)]">{car.category}</div>
									<div className="font-medium text-[var(--color-text)]">{formatPrice(car.pricePerDay)}</div>
									<div>
										<span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${statusClassName[isAvailable ? 'Available' : 'Not Available']}`}>
											{isAvailable ? 'Available' : 'Not Available'}
										</span>
									</div>
									<div className="flex items-center gap-3 text-slate-500">
										<button
											type="button"
											className="transition hover:text-[#3B82F6]"
											aria-label={`Toggle availability for ${carName}`}
											onClick={() => toggleCarAvailability(car._id)}
											disabled={actionLoadingId === car._id}
										>
											<img className="h-5 w-5" src={assets.eye_icon} alt="" aria-hidden="true" />
										</button>
										<button
											type="button"
											className="transition hover:text-rose-500"
											aria-label={`Delete ${carName}`}
											onClick={() => deleteCar(car._id)}
											disabled={actionLoadingId === car._id}
										>
											<img className="h-5 w-5" src={assets.delete_icon} alt="" aria-hidden="true" />
										</button>
									</div>
								</div>
								)
								})
							) : (
								<div className="px-4 py-6 text-sm text-[var(--color-muted)]">No cars listed yet.</div>
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

export default ManageCars
