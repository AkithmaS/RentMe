import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-hot-toast'

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL || 'http://localhost:3000'

export const AppContext = createContext()

export const AppProvider = ({ children }) => {
    const navigate = useNavigate()
    const currency = import.meta.env.VITE_CURRENCY || 'LKR'
    const [token, setToken] = useState(localStorage.getItem('token') || null)
    const [user, setUser] = useState(null)
    const [isOwner, setIsOwner] = useState(false)
    const [showLogin, setShowLogin] = useState(false)
    const [pickupDate, setPickupDate] = useState(null)
    const [returnDate, setReturnDate] = useState(null)
    const [cars, setCars] = useState([])

    const fetchUser = useCallback(async () => {
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
    }, [navigate])

    const fetchCars = useCallback(async () => {
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
    }, [])

    const fetchOwnerCars = useCallback(async () => {
        try {
            const { data } = await axios.get('/api/owner/cars')

            if (data.success) {
                setCars(data.cars)
            } else {
                toast.error(data.message || 'Failed to fetch owner cars')
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to fetch owner cars')
        }
    }, [])

    const logout = useCallback(() => {
        localStorage.removeItem('token')
        setToken(null)
        setUser(null)
        setIsOwner(false)
        delete axios.defaults.headers.common.Authorization
        toast.success('Logged out successfully')
    }, [])

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
        setIsOwner,
        showLogin,
        setShowLogin,
        logout,
        fetchCars,
        fetchOwnerCars,
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
