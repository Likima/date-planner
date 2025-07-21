"use client"

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useAuth } from '@/src/components/Context/authContext'

export function Header({ children }: React.PropsWithChildren) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isCollapsed, setIsCollapsed] = useState(true) // Start collapsed by default
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
        setIsAuthenticated(true)
        setUser(data.username)
      })
      .catch(() => setIsAuthenticated(false))
  }

  return (
    <div className="relative">
      {/* Blur overlay when sidebar is expanded */}
      <div
        className={`fixed inset-0 bg-black/10 backdrop-blur-sm z-40 transition-opacity duration-300 ${isCollapsed ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
        onClick={() => setIsCollapsed(true)}
      />

      {/* Sidebar */}
      <div className={`fixed h-screen flex flex-col transition-all duration-300 ${isCollapsed ? 'w-20' : 'w-64'
        } bg-indigo-900/90 backdrop-blur-sm border-r border-indigo-500/30 z-50`}>
        {/* Collapse button - always visible */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-4 text-indigo-200 hover:text-white self-end"
        >
          {isCollapsed ? '+' : '-'}
        </button>

        {/* Navigation links */}
        <nav className="flex-1 flex flex-col space-y-4 p-4">
          <Link
            href="/home"
            className="flex items-center p-3 rounded-lg hover:bg-indigo-800/50 transition-colors text-indigo-200 hover:text-white"
          >
            <span className={isCollapsed ? 'hidden' : 'block'}>Home</span>
          </Link>

          <Link
            href="/Dashboard"
            className="flex items-center p-3 rounded-lg hover:bg-indigo-800/50 transition-colors text-indigo-200 hover:text-white"
          >
            <span className={isCollapsed ? 'hidden' : 'block'}>Dashboard</span>
          </Link>

          <Link
            href="/About"
            className="flex items-center p-3 rounded-lg hover:bg-indigo-800/50 transition-colors text-indigo-200 hover:text-white"
          >
            <span className={isCollapsed ? 'hidden' : 'block'}>About</span>
          </Link>

          {user ? (
            <Link
              href="/profile"
              className="flex items-center p-3 rounded-lg hover:bg-indigo-800/50 transition-colors text-indigo-200 hover:text-white"
            >
              <span className={isCollapsed ? 'hidden' : 'block'}>Profile</span>
            </Link>
          ) : (
            <Link
              href="/login"
              className="flex items-center p-3 rounded-lg hover:bg-indigo-800/50 transition-colors text-indigo-200 hover:text-white"
            >
              <span className={isCollapsed ? 'hidden' : 'block'}>Log in</span>
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

      {/* Main content */}
      <div className={`transition-all duration-300 ${isCollapsed ? 'ml-20' : 'ml-64'
        } ${!isCollapsed ? 'blur-sm' : ''}`}>
        {children}
      </div>
    </div>
  )
}