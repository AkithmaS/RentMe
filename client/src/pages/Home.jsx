import React, { useEffect } from 'react'
import Hero from '../components/Hero'
import FeaturedVehicles from '../components/FeaturedVehicles'
import OwnerBanner from '../components/OwnerBanner'
import Testimonial from '../components/Testimonial'
import Newsletter from '../components/Newsletter'
import Footer from '../components/Footer'

const Home = () => {
	useEffect(() => {
		const elements = document.querySelectorAll('.reveal')
		if (!('IntersectionObserver' in window) || elements.length === 0) {
			elements.forEach((element) => element.classList.add('is-visible'))
			return
		}

		elements.forEach((element) => element.classList.add('is-hidden'))

		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						entry.target.classList.remove('is-hidden')
						entry.target.classList.add('is-visible')
						observer.unobserve(entry.target)
					}
				})
			},
			{ threshold: 0.2 }
		)

		elements.forEach((element) => observer.observe(element))

		return () => observer.disconnect()
	}, [])

	return (
		<main>
			<Hero />
			<FeaturedVehicles />
			<OwnerBanner />
			<Testimonial />
			<Newsletter />
			<Footer />
		</main>
	)
}

export default Home
