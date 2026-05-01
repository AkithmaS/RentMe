import React, { useEffect, useState } from 'react'

const inputClassName =
  'mt-2 w-full rounded-sm border border-slate-200 px-4 py-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-300 focus:border-[#3B82F6]'

const Login = ({ isOpen, onClose }) => {
  const [isSignUp, setIsSignUp] = useState(false)

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
    }
  }, [isOpen])

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

        <div className="mt-6 space-y-4">
          {isSignUp ? (
            <div>
              <label className="text-sm font-medium text-slate-700" htmlFor="signup-name">
                Name
              </label>
              <input id="signup-name" type="text" placeholder="type here" className={inputClassName} />
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
            type="button"
            className="w-full rounded-md bg-[#3B82F6] px-4 py-3 text-sm font-semibold text-white transition hover:brightness-110"
          >
            {isSignUp ? 'Create Account' : 'Login'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default Login
