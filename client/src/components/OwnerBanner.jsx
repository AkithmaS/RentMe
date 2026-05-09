import React from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { motion } from 'motion/react'
import { assets } from '../assets/assets'
import { useAppContext } from '../context/AppContext'

const OwnerBanner = () => {
  const { axios, user, setUser, setIsOwner, fetchUser } = useAppContext()
  const navigate = useNavigate()

  const handleListYourCar = async () => {
    if (!user) {
      toast.error('Please log in first')
      return
    }

    try {
      const { data } = await axios.post('/api/owner/change-role')

      if (!data.success) {
        toast.error(data.message || 'Failed to update account role')
        return
      }

      await fetchUser()
      setUser((currentUser) => (currentUser ? { ...currentUser, role: 'owner' } : currentUser))
      setIsOwner(true)
      toast.success('Your account is now an owner account')
      navigate('/owner/dashboard')
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update account role')
    }
  }

  return (
    <motion.section className="w-full bg-white" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.5 }}>
      <div className="mx-auto w-full max-w-6xl px-6 pb-20">
        <motion.div className="reveal flex flex-col items-center justify-between gap-8 rounded-3xl bg-gradient-to-r from-[#3B5BFC] to-[#9DB5FF] px-8 py-10 text-center text-white md:flex-row" initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.45 }}>
          <div className="flex max-w-xl flex-col items-center">
            <motion.h3 className="text-2xl font-semibold sm:text-3xl" initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.4 }} transition={{ duration: 0.35 }}>
              Do You Own a Luxury Car?
            </motion.h3>
            <motion.p className="mt-3 text-sm text-white/90" initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.4 }} transition={{ duration: 0.35, delay: 0.06 }}>
              Monetize your vehicle effortlessly by listing it on CarRental.
              We take care of insurance, driver verification, and secure payments — so
              you can earn passive income, stress-free.
            </motion.p>
            <motion.button
              className="mt-6 rounded-lg bg-white px-4 py-2 text-sm font-semibold text-[#3B5BFC] shadow-sm transition hover:brightness-95"
              onClick={handleListYourCar}
              type="button"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              List your car
            </motion.button>
          </div>
          <motion.div className="flex w-full max-w-md justify-center" initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.45, delay: 0.08 }}>
            <motion.img
              className="float-x w-full max-w-md drop-shadow-[0_20px_30px_rgba(30,58,138,0.35)]"
              src={assets.banner_car_image}
              alt="Luxury car"
              loading="lazy"
              whileHover={{ scale: 1.02, y: -2 }}
            />
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  )
}

export default OwnerBanner
