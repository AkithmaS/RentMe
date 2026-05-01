import React from 'react'
import { NavLink } from 'react-router-dom'
import { assets, dummyUserData } from '../../assets/assets'

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
			// Ignore invalid JSON and fall back to defaults.
		}
	}

	return dummyUserData
}

const Sidebar = () => {
	const user = getStoredUser()
	const profileImage = user?.image || user?.avatar || assets.user_profile

	return (
		<aside className="h-screen w-[var(--sidebar-width)] shrink-0 border-r border-[var(--color-border)] bg-[var(--color-sidebar-bg)]">
			<div className="flex flex-col items-center px-4 pb-6 pt-6">
				<div className="owner-profile relative h-[180px] w-[180px]">
					<img
						className="h-full w-full rounded-full object-cover"
						src={profileImage}
						alt="Owner profile"
					/>
					<span className="absolute bottom-2 right-2 flex h-8 w-8 items-center justify-center rounded-full border border-[var(--color-border)] bg-white">
						<img className="h-4 w-4" src={assets.edit_icon} alt="Edit profile" />
					</span>
				</div>
				<div className="mt-4 text-center text-base font-semibold text-[var(--color-text)]">
					{user?.name || 'Owner'}
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
