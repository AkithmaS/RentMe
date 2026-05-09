import React from 'react'
import { Link } from 'react-router-dom'
import { dummyUserData } from '../../assets/assets'
import { useAppContext } from '../../context/AppContext'
import { motion } from 'motion/react'

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
	const { user: contextUser } = useAppContext()
	const user = contextUser || getStoredUser()

	return (
		<header className="relative w-full border-b border-[var(--color-border)] bg-[var(--color-sidebar-bg)]">
			<div className="absolute left-0 top-0 h-1 w-full bg-[#111827]" />
			<motion.div
				initial={{ y: -100, opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
				transition={{ duration: 0.5 }}
				className="flex h-[var(--navbar-height)] items-center justify-between px-8"
			>
				<Link className="flex items-center gap-2 text-lg font-semibold text-slate-900 transition hover:opacity-80" to="/Home">
					<span className="inline-flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-white">
						<motion.img
							whileHover={{ scale: 1.05 }}
							className="h-full w-full object-contain"
							src="/favicon.svg"
							alt="RentMe logo"
						/>
					</span>
					<span>RentMe</span>
				</Link>
				<div className="flex items-center gap-4">
					<Link
						className="rounded-full bg-[#3B5BFC] px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:brightness-110"
						to="/owner/dashboard"
					>
						Dashboard
					</Link>
					<div className="text-sm font-medium text-slate-600">Welcome, {user?.name || 'Owner'}</div>
				</div>
			</motion.div>
		</header>
	)
}

export default NavbarOwner
