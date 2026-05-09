import React, { useRef, useState } from 'react'
import { toast } from 'react-hot-toast'
import Footer from '../../components/Footer'
import Title from '../../components/owner/Title'
import { assets } from '../../assets/assets'
import { useAppContext } from '../../context/AppContext'
import {
	carCategoryOptions,
	carModelOptions,
	fuelTypeOptions,
	locationOptions,
	transmissionOptions,
} from '../../constants/carOptions'

const fieldClassName =
	'mt-2 w-full rounded-sm border border-[#e5e7eb] bg-white px-3 py-2 text-sm text-[var(--color-text)] outline-none transition placeholder:text-slate-300 focus:border-[#3B82F6]'

const AddCar = () => {
	const { axios, fetchOwnerCars } = useAppContext()
	const fileInputRef = useRef(null)
	const [isLoading, setIsLoading] = useState(false)
	const [imagePreview, setImagePreview] = useState('')
	const [selectedFile, setSelectedFile] = useState(null)

	const handleFileChange = (event) => {
		const selectedFile = event.target.files?.[0]
		if (!selectedFile) return

		setSelectedFile(selectedFile)
		setImagePreview(URL.createObjectURL(selectedFile))
	}

	const onSubmitHandler = async (event) => {
		event.preventDefault()

		try {
			setIsLoading(true)

			const form = event.currentTarget
			const formData = new FormData()
			const file = selectedFile || fileInputRef.current?.files?.[0]

			if (!file) {
				toast.error('Please upload a car image')
				return
			}

			const carData = {
				brand: form.brand.value,
				model: form.model.value,
				year: Number(form.year.value),
				pricePerDay: Number(form.pricePerDay.value),
				category: form.category.value,
				transmission: form.transmission.value,
				fuel_type: form.fuel_type.value,
				seating_capacity: Number(form.seating_capacity.value),
				location: form.location.value,
				description: form.description.value,
			}

			formData.append('image', file)
			formData.append('carData', JSON.stringify(carData))

			const { data } = await axios.post('/api/owner/add-car', formData)

			if (!data.success) {
				toast.error(data.message || 'Failed to add car')
				return
			}

			toast.success('Car listed successfully')
			await fetchOwnerCars()
			form.reset()
			setImagePreview('')
			setSelectedFile(null)
			if (fileInputRef.current) {
				fileInputRef.current.value = ''
			}
		} catch (error) {
			toast.error(error.response?.data?.message || 'Failed to add car')
		} finally {
			setIsLoading(false)
		}
	}
	return (
		<section className="owner-page-animate flex min-h-[calc(100vh-var(--navbar-height))] flex-col">
			<div className="px-8 py-6">
				<div className="max-w-3xl">
					<Title
						title="Add New Car"
						subtitle="Fill in details to list a new car for booking, including pricing, availability, and car specifications."
					/>

				<form className="mt-6 rounded-lg bg-transparent" onSubmit={onSubmitHandler} encType="multipart/form-data">
					<div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center">
						<button
							type="button"
							onClick={() => fileInputRef.current?.click()}
							className="flex h-28 w-full items-center justify-center rounded-xl border border-dashed border-[#dbe1ee] bg-white text-[#94a3b8] transition hover:border-[#3B82F6] hover:text-[#3B82F6] sm:w-40"
							aria-label="Choose car image"
						>
							{imagePreview ? (
								<img className="h-full w-full rounded-xl object-cover" src={imagePreview} alt="Selected car preview" />
							) : (
								<div className="flex flex-col items-center gap-2 text-center">
									<img className="h-6 w-6 opacity-70" src={assets.upload_icon} alt="" aria-hidden="true" />
									<span className="text-xs font-medium">Upload image</span>
								</div>
							)}
						</button>
						<input ref={fileInputRef} className="hidden" type="file" accept="image/*" onChange={handleFileChange} />
						<div className="text-sm text-[var(--color-muted)]">
							<p className="font-medium text-[var(--color-text)]">Car photo</p>
							<p>Choose a clear front-facing image of the car.</p>
							{selectedFile ? <p className="mt-1 text-xs text-slate-400">{selectedFile.name}</p> : null}
						</div>
					</div>

					<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
						<div>
							<label className="text-sm text-[var(--color-text)]">Brand</label>
							<input name="brand" className={fieldClassName} type="text" placeholder="e.g. BMW, Mercedes, Audi..." />
						</div>
						<div>
							<label className="text-sm text-[var(--color-text)]">Model</label>
							<select name="model" className={fieldClassName} defaultValue="">
								<option value="" disabled>
									Select model
								</option>
								{carModelOptions.map((model) => (
									<option key={model} value={model}>
										{model}
									</option>
								))}
							</select>
						</div>
						<div>
							<label className="text-sm text-[var(--color-text)]">Year</label>
							<input name="year" className={fieldClassName} type="number" placeholder="2025" />
						</div>
						<div>
							<label className="text-sm text-[var(--color-text)]">Daily Price (LKR)</label>
							<input name="pricePerDay" className={fieldClassName} type="number" placeholder="5000" />
						</div>
						<div>
							<label className="text-sm text-[var(--color-text)]">Category</label>
							<select name="category" className={fieldClassName} defaultValue="">
								<option value="" disabled>
									Select category
								</option>
								{carCategoryOptions.map((category) => (
									<option key={category} value={category}>
										{category}
									</option>
								))}
							</select>
						</div>
						<div>
							<label className="text-sm text-[var(--color-text)]">Transmission</label>
							<select name="transmission" className={fieldClassName} defaultValue="">
								<option value="" disabled>
									Select transmission
								</option>
								{transmissionOptions.map((transmission) => (
									<option key={transmission} value={transmission}>
										{transmission}
									</option>
								))}
							</select>
						</div>
						<div>
							<label className="text-sm text-[var(--color-text)]">Fuel Type</label>
							<select name="fuel_type" className={fieldClassName} defaultValue="">
								<option value="" disabled>
									Select fuel type
								</option>
								{fuelTypeOptions.map((fuelType) => (
									<option key={fuelType} value={fuelType}>
										{fuelType}
									</option>
								))}
							</select>
						</div>
						<div>
							<label className="text-sm text-[var(--color-text)]">Seating Capacity</label>
							<input name="seating_capacity" className={fieldClassName} type="number" placeholder="5" />
						</div>
					</div>

					<div className="mt-4 max-w-xl">
						<label className="text-sm text-[var(--color-text)]">Location</label>
						<select name="location" className={fieldClassName} defaultValue="">
							<option value="" disabled>
								Select location
							</option>
							{locationOptions.map((location) => (
								<option key={location} value={location}>
									{location}
								</option>
							))}
						</select>
					</div>

					<div className="mt-4 max-w-xl">
						<label className="text-sm text-[var(--color-text)]">Description</label>
						<textarea
							name="description"
							className={`${fieldClassName} min-h-28 resize-none py-3`}
							placeholder="Describe your car, its condition, and any notable details..."
						/>
					</div>

					<button
						type="submit"
						disabled={isLoading}
						className="mt-4 inline-flex items-center gap-2 rounded-md bg-[#3B82F6] px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:brightness-110"
					>
						<span className="text-base leading-none">✓</span>
						<span>{isLoading ? 'Listing...' : 'List Your Car'}</span>
					</button>
				</form>
				</div>
			</div>

			<div className="mt-48">
				<Footer />
			</div>
		</section>
	)
}
export default AddCar
