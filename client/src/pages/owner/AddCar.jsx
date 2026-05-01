import React from 'react'
import Footer from '../../components/Footer'
import Title from '../../components/owner/Title'
import { assets } from '../../assets/assets'

const fieldClassName =
	'mt-2 w-full rounded-sm border border-[#e5e7eb] bg-white px-3 py-2 text-sm text-[var(--color-text)] outline-none transition placeholder:text-slate-300 focus:border-[#3B82F6]'

const AddCar = () => {
	return (
		<section className="owner-page-animate flex min-h-[calc(100vh-var(--navbar-height))] flex-col">
			<div className="px-8 py-6">
				<div className="max-w-3xl">
				<Title
					title="Add New Car"
					subtitle="Fill in details to list a new car for booking, including pricing, availability, and car specifications."
				/>

				<form className="mt-6 rounded-lg bg-transparent">
					<div className="mb-5 flex items-center gap-4">
						<label className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-md border border-dashed border-[#dbe1ee] bg-white text-[#cbd5e1] transition hover:border-[#3B82F6] hover:text-[#3B82F6]">
							<img className="h-5 w-5 opacity-70" src={assets.upload_icon} alt="Upload" />
							<input className="hidden" type="file" accept="image/*" />
						</label>
						<p className="text-sm text-[var(--color-muted)]">Upload a picture of your car</p>
					</div>

					<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
						<div>
							<label className="text-sm text-[var(--color-text)]">Brand</label>
							<input className={fieldClassName} type="text" placeholder="e.g. BMW, Mercedes, Audi..." />
						</div>
						<div>
							<label className="text-sm text-[var(--color-text)]">Model</label>
							<input className={fieldClassName} type="text" placeholder="e.g. X5, C-Class, M4..." />
						</div>
						<div>
							<label className="text-sm text-[var(--color-text)]">Year</label>
							<input className={fieldClassName} type="text" placeholder="2025" />
						</div>
						<div>
							<label className="text-sm text-[var(--color-text)]">Daily Price ($)</label>
							<input className={fieldClassName} type="text" placeholder="100" />
						</div>
						<div>
							<label className="text-sm text-[var(--color-text)]">Category</label>
							<input className={fieldClassName} type="text" placeholder="Sedan" />
						</div>
						<div>
							<label className="text-sm text-[var(--color-text)]">Transmission</label>
							<input className={fieldClassName} type="text" placeholder="Automatic" />
						</div>
						<div>
							<label className="text-sm text-[var(--color-text)]">Fuel Type</label>
							<input className={fieldClassName} type="text" placeholder="Diesel" />
						</div>
						<div>
							<label className="text-sm text-[var(--color-text)]">Seating Capacity</label>
							<input className={fieldClassName} type="text" placeholder="5" />
						</div>
					</div>

					<div className="mt-4 max-w-xl">
						<label className="text-sm text-[var(--color-text)]">Location</label>
						<input className={fieldClassName} type="text" placeholder="e.g. San Francisco, CA" />
					</div>

					<div className="mt-4 max-w-xl">
						<label className="text-sm text-[var(--color-text)]">Description</label>
						<textarea
							className={`${fieldClassName} min-h-28 resize-none py-3`}
							placeholder="Describe your car, its condition, and any notable details..."
						/>
					</div>

					<button
						type="submit"
						className="mt-4 inline-flex items-center gap-2 rounded-md bg-[#3B82F6] px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:brightness-110"
					>
						<span className="text-base leading-none">✓</span>
						<span>List Your Car</span>
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
