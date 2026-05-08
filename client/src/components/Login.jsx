import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { AppContext } from '../context/AppContext'

const inputClassName =
  'mt-2 w-full rounded-sm border border-slate-200 px-4 py-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-300 focus:border-[#3B82F6]'

const Login = ({ isOpen, onClose }) => {
  const { axios, setToken, fetchUser, setShowLogin } = useContext(AppContext)
  const [isSignUp, setIsSignUp] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (!isOpen) return undefined

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) {
      setIsSignUp(false)
      setName('')
      setEmail('')
      setPassword('')
    }
  }, [isOpen])

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      setIsSubmitting(true)

      const endpoint = isSignUp ? '/api/users/register' : '/api/users/login'
      const payload = isSignUp ? { name, email, password } : { email, password }
      const { data } = await axios.post(endpoint, payload)

      if (!data.success) {
        toast.error(data.message || 'Authentication failed')
        return
      }

      localStorage.setItem('token', data.token)
      axios.defaults.headers.common.Authorization = data.token
      setToken(data.token)
      await fetchUser()
      setShowLogin(false)
      onClose()
      toast.success(isSignUp ? 'Account created successfully' : 'Logged in successfully')
    } catch (error) {
      toast.error(error.response?.data?.message || 'Authentication failed')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm"
      onClick={onClose}
      role="presentation"
    >
      <div
        className="w-full max-w-sm rounded-[10px] bg-white px-6 py-7 shadow-2xl"
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby={isSignUp ? 'signup-title' : 'login-title'}
      >
        <h2 id={isSignUp ? 'signup-title' : 'login-title'} className="text-center text-2xl font-semibold">
          <span className="text-[#3B82F6]">{isSignUp ? 'User' : 'User'}</span>{' '}
          <span className="text-slate-700">{isSignUp ? 'Sign Up' : 'Login'}</span>
        </h2>

        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          {isSignUp ? (
            <div>
              <label className="text-sm font-medium text-slate-700" htmlFor="signup-name">
                Name
              </label>
              <input
                id="signup-name"
                type="text"
                placeholder="type here"
                className={inputClassName}
                value={name}
                onChange={(event) => setName(event.target.value)}
                autoComplete="name"
              />
            </div>
          ) : null}

          <div>
            <label className="text-sm font-medium text-slate-700" htmlFor={isSignUp ? 'signup-email' : 'login-email'}>
              Email
            </label>
            <input
              id={isSignUp ? 'signup-email' : 'login-email'}
              type="email"
              placeholder="type here"
              className={inputClassName}
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              autoComplete="email"
            />
          </div>

          <div>
            <label
              className="text-sm font-medium text-slate-700"
              htmlFor={isSignUp ? 'signup-password' : 'login-password'}
            >
              Password
            </label>
            <input
              id={isSignUp ? 'signup-password' : 'login-password'}
              type="password"
              placeholder="type here"
              className={inputClassName}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              autoComplete={isSignUp ? 'new-password' : 'current-password'}
            />
          </div>

          <p className="text-sm text-slate-600">
            {isSignUp ? 'Already have account?' : 'Create an account?'}{' '}
            <button
              type="button"
              onClick={() => setIsSignUp((current) => !current)}
              className="font-semibold text-[#3B82F6] hover:underline"
            >
              click here
            </button>
          </p>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-md bg-[#3B82F6] px-4 py-3 text-sm font-semibold text-white transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSubmitting ? 'Please wait...' : isSignUp ? 'Create Account' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login
