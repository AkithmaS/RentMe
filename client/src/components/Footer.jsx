import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
	return (
		<footer className="w-full bg-white">
			<div className="mx-auto flex w-full max-w-6xl flex-col px-6 pb-8 pt-16 text-sm text-slate-500">
				<div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
					<div className="flex flex-col gap-4">
						<div className="flex items-center gap-2 text-lg font-semibold text-slate-800">
							<span className="inline-flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-white">
								<img className="h-full w-full object-contain" src="/favicon.svg" alt="RentMe logo" />
							</span>
							<span>RentMe</span>
						</div>
						<p className="text-sm text-slate-500">
							Premium car rental service with a wide selection of luxury and everyday vehicles
							for all your driving needs.
						</p>
						<div className="flex items-center gap-3">
							<img className="h-4 w-4" src={assets.facebook_logo} alt="Facebook" />
							<img className="h-4 w-4" src={assets.instagram_logo} alt="Instagram" />
							<img className="h-4 w-4" src={assets.twitter_logo} alt="Twitter" />
							<img className="h-4 w-4" src={assets.gmail_logo} alt="Email" />
						</div>
					</div>

					<div className="flex flex-col gap-3">
						<h4 className="text-xs font-semibold uppercase tracking-widest text-slate-400">
							Quick Links
						</h4>
						<a className="hover:text-slate-700" href="#">Home</a>
						<a className="hover:text-slate-700" href="#">Browse Cars</a>
						<a className="hover:text-slate-700" href="#">List Your Car</a>
						<a className="hover:text-slate-700" href="#">About Us</a>
					</div>

					<div className="flex flex-col gap-3">
						<h4 className="text-xs font-semibold uppercase tracking-widest text-slate-400">
							Resources
						</h4>
						<a className="hover:text-slate-700" href="#">Help Center</a>
						<a className="hover:text-slate-700" href="#">Terms of Service</a>
						<a className="hover:text-slate-700" href="#">Privacy Policy</a>
						<a className="hover:text-slate-700" href="#">Insurance</a>
					</div>

					<div className="flex flex-col gap-3">
						<h4 className="text-xs font-semibold uppercase tracking-widest text-slate-400">
							Contact
						</h4>
						<p>1234 Luxury Drive</p>
						<p>San Francisco, CA 94107</p>
						<p>+1 (555) 123-4567</p>
						<p>car@example.com</p>
					</div>
				</div>

				<div className="mt-10 border-t border-slate-200 pt-6 text-xs text-slate-400">
					<div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
						<span>© 2026 RentMe. All rights reserved.</span>
						<div className="flex items-center gap-6">
							<a className="hover:text-slate-600" href="#">Terms</a>
							<a className="hover:text-slate-600" href="#">Privacy</a>
							<a className="hover:text-slate-600" href="#">Cookies</a>
						</div>
					</div>
				</div>
			</div>
		</footer>
	)
}

export default Footer
