import { createContext, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-hot-toast'

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL || 'http://localhost:3000'

export const AppContext = createContext()

export const AppProvider = ({ children }) => {
    const navigate = useNavigate()
    const currency = import.meta.env.VITE_CURRENCY || '$'
    const [token, setToken] = useState(localStorage.getItem('token') || null)
    const [user, setUser] = useState(null)
    const [isOwner, setIsOwner] = useState(false)
    const [showLogin, setShowLogin] = useState(false)
    const [pickupDate, setPickupDate] = useState(null)
    const [returnDate, setReturnDate] = useState(null)
    const [cars, setCars] = useState([])

    const fetchUser = async () => {
        try {
            const { data } = await axios.get('/api/user/data')

            if (data.success) {
                setUser(data.user)
                setIsOwner(data.user?.role === 'owner')
            } else {
                navigate('/Home')
            }
        } catch (error) {
            toast.error('Session expired. Please login again.')
            navigate('/Home')
        }
    }

    const fetchCars = async () => {
        try {
            const { data } = await axios.get('/api/cars')

            if (data.success) {
                setCars(data.cars)
            } else {
                toast.error('Failed to fetch cars')
            }
        } catch (error) {
            toast.error('Failed to fetch cars')
        }
    }

    const logout = () => {
        localStorage.removeItem('token')
        setToken(null)
        setUser(null)
        setIsOwner(false)
        delete axios.defaults.headers.common.Authorization
        toast.success('Logged out successfully')
    }

    useEffect(() => {
        const storedToken = localStorage.getItem('token')

        if (storedToken) {
            axios.defaults.headers.common.Authorization = storedToken
            setToken(storedToken)
        }
    }, [])

    useEffect(() => {
        if (!token) return

        axios.defaults.headers.common.Authorization = token
        fetchUser()
    }, [token])

    const value = {
        navigate,
        currency,
        token,
        axios,
        user,
        setUser,
        setToken,
        fetchUser,
        isOwner,
        showLogin,
        setShowLogin,
        logout,
        fetchCars,
        cars,
        setCars,
        pickupDate,
        setPickupDate,
        returnDate,
        setReturnDate,
    }

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export const useAppContext = () => useContext(AppContext)
