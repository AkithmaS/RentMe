import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import NavbarOwner from '../components/owner/NavbarOwner'
import Sidebar from '../components/owner/Sidebar'

const OwnerLayout = () => {
  const location = useLocation()

  return (
    <div className="flex min-h-screen bg-[var(--color-bg)]">
      <Sidebar />
      <div className="flex min-h-screen flex-1 flex-col">
        <NavbarOwner />
        <main key={location.pathname} className="flex-1 bg-[var(--color-bg)]">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default OwnerLayout
