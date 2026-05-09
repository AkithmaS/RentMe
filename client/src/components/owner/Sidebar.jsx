import React, { useRef, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { assets } from '../../assets/assets'
import { useAppContext } from '../../context/AppContext'

const ownerLinks = [
	{
		label: 'Dashboard',
		path: '/owner/dashboard',
		icon: assets.dashboardIcon,
		activeIcon: assets.dashboardIconColored,
	},
	{
		label: 'Add car',
		path: '/owner/add-car',
		icon: assets.addIcon,
		activeIcon: assets.addIconColored,
	},
	{
		label: 'Manage Cars',
		path: '/owner/manage-cars',
		icon: assets.carIcon,
		activeIcon: assets.carIconColored,
	},
	{
		label: 'Manage Bookings',
		path: '/owner/manage-bookings',
		icon: assets.listIcon,
		activeIcon: assets.listIconColored,
	},
]

const Sidebar = () => {
	const { user, axios, setUser } = useAppContext()
	const fileInputRef = useRef(null)
	const [isUploading, setIsUploading] = useState(false)
	const profileImage = user?.image || user?.avatar || assets.user_profile

	const handleFileClick = () => {
		fileInputRef.current?.click()
	}

	const handleImageChange = async (event) => {
		const selectedFile = event.target.files?.[0]
		if (!selectedFile) return

		try {
			setIsUploading(true)

			const formData = new FormData()
			formData.append('image', selectedFile)

			const { data } = await axios.post('/api/owner/updateprofile', formData)

			if (!data.success) {
				toast.error(data.message || 'Failed to update profile image')
				return
			}

			setUser((currentUser) => ({
				...currentUser,
				image: data.image,
			}))
			toast.success('Profile image updated successfully')
		} catch (error) {
			toast.error(error.response?.data?.message || 'Failed to update profile image')
		} finally {
			setIsUploading(false)
			event.target.value = ''
		}
	}

	return (
		<aside className="h-screen w-[var(--sidebar-width)] shrink-0 border-r border-[var(--color-border)] bg-[var(--color-sidebar-bg)]">
			<div className="flex flex-col items-center px-4 pb-6 pt-6">
				<div className="owner-profile relative h-[180px] w-[180px]">
					<img
						className="h-full w-full rounded-full object-cover"
						src={profileImage}
						alt="Owner profile"
					/>
					<button
						type="button"
						onClick={handleFileClick}
						disabled={isUploading}
						className="absolute bottom-2 right-2 flex h-8 w-8 items-center justify-center rounded-full border border-[var(--color-border)] bg-white transition hover:scale-105 disabled:cursor-not-allowed disabled:opacity-70"
						aria-label="Update profile image"
					>
						<img className="h-4 w-4" src={assets.upload_icon} alt="" aria-hidden="true" />
					</button>
					<input
						ref={fileInputRef}
						type="file"
						accept="image/*"
						className="hidden"
						onChange={handleImageChange}
					/>
				</div>
				<div className="mt-4 text-center text-base font-semibold text-[var(--color-text)]">
					{isUploading ? 'Updating...' : user?.name || 'Owner'}
				</div>
			</div>

			<nav className="mt-2 flex flex-col">
				{ownerLinks.map((link, index) => (
					<NavLink
						key={link.path}
						to={link.path}
						className={({ isActive }) =>
							[
								'owner-link',
								'owner-link-animate',
								isActive ? 'owner-link-active' : 'owner-link-inactive',
							].join(' ')
						}
						style={{ animationDelay: `${index * 150}ms` }}
					>
						{({ isActive }) => (
							<>
								<img
									className="h-4 w-4"
									src={isActive ? link.activeIcon : link.icon}
									alt={link.label}
								/>
								<span>{link.label}</span>
							</>
						)}
					</NavLink>
				))}
			</nav>
		</aside>
	)
}

export default Sidebar
