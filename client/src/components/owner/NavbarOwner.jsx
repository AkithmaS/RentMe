import React from 'react'
import { assets, dummyUserData } from '../../assets/assets'

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

const NavbarOwner = () => {
	const user = getStoredUser()

	return (
		<header className="relative w-full border-b border-[var(--color-border)] bg-[var(--color-sidebar-bg)]">
			<div className="absolute left-0 top-0 h-1 w-full bg-[#111827]" />
			<div className="flex h-[var(--navbar-height)] items-center justify-between px-8">
				<div className="flex items-center gap-2 text-lg font-semibold text-slate-900">
					<span className="inline-flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-white">
						<img className="h-full w-full object-contain" src="/favicon.svg" alt="RentMe logo" />
					</span>
					<span>RentMe</span>
				</div>
				<div className="text-sm font-medium text-slate-600">Welcome, {user?.name || 'Owner'}</div>
			</div>
		</header>
	)
}

export default NavbarOwner
