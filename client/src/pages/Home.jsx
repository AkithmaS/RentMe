import React from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import FeaturedVehicles from '../components/FeaturedVehicles'
import OwnerBanner from '../components/OwnerBanner'
import Testimonial from '../components/Testimonial'
import Newsletter from '../components/Newsletter'
import Footer from '../components/Footer'
import useRevealOnScroll from '../hooks/useRevealOnScroll'

const Home = () => {
	useRevealOnScroll([])

	return (
		<>
			<Navbar />
			<main>
				<Hero />
				<FeaturedVehicles />
				<OwnerBanner />
				<Testimonial />
				<Newsletter />
				<Footer />
			</main>
		</>
	)
}

export default Home
