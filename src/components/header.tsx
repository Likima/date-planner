"use client"

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useAuth } from '@/src/components/Context/authContext'

export function Header(props: React.PropsWithChildren) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isCollapsed, setIsCollapsed] = useState(false)
  const { user, setUser } = useAuth()

  useEffect(() => {
    verifyIfLoggedIn()
  }, [])

  function verifyIfLoggedIn() {
    fetch("http://localhost:8001/user/loggedin", {
      method: "GET",
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    })
      .then(res => {
        if (!res.ok) throw new Error('Not authenticated')
        return res.json()
      })
      .then(data => {
        console.log(data)
        setIsAuthenticated(true)
        setUser(data.username) // Make sure this sets a string, not an object
      })
      .catch(() => setIsAuthenticated(false))
  }

  return (
    <div className={`fixed h-screen flex flex-col transition-all duration-300 ${isCollapsed ? 'w-20' : 'w-64'
      } bg-indigo-900/90 backdrop-blur-sm border-r border-indigo-500/30 z-50`}>
      {/* Collapse button */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="p-4 text-indigo-200 hover:text-white self-end"
      >
        {isCollapsed ? '→' : '←'}
      </button>

      {/* Navigation links */}
      <nav className="flex-1 flex flex-col space-y-4 p-4">
        <Link href="/home" className="flex items-center p-3 rounded-lg hover:bg-indigo-800/50 transition-colors text-indigo-200 hover:text-white">
          {!isCollapsed && 'Home'}
        </Link>

        <Link href="/Dashboard" className="flex items-center p-3 rounded-lg hover:bg-indigo-800/50 transition-colors text-indigo-200 hover:text-white">
          {!isCollapsed && 'Dashboard'}
        </Link>

        <Link href="/About" className="flex items-center p-3 rounded-lg hover:bg-indigo-800/50 transition-colors text-indigo-200 hover:text-white">
          {!isCollapsed && 'About'}
        </Link>

        {user ? (
          <Link href="/profile" className="flex items-center p-3 rounded-lg hover:bg-indigo-800/50 transition-colors text-indigo-200 hover:text-white">
            {!isCollapsed && 'Profile'}
          </Link>
        ) : (
          <Link href="/login" className="flex items-center p-3 rounded-lg hover:bg-indigo-800/50 transition-colors text-indigo-200 hover:text-white">
            {!isCollapsed && 'Log in'}
          </Link>
        )}
      </nav>

      {/* User info (when expanded) */}
      {!isCollapsed && user && (
        <div className="p-4 border-t border-indigo-500/30 text-indigo-200">
          <p className="truncate">Welcome, {user.name}</p>
        </div>
      )}
    </div>
  )
}