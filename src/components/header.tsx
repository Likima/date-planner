"use client"

import Link from 'next/link'
import { useState, useEffect } from 'react'

import { useAuth } from '@/src/app/authContext'

export function Header(props: React.PropsWithChildren) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const { user, setUser } = useAuth();

  function verifyIfLoggedIn() {
    fetch("http://localhost:8001/user/loggedin", {
      method: "GET",
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    })
      .then(res => {
        if (!res.ok) throw new Error('Not authenticated');
        return res.json();
      })
      .then(data => {
        console.log(data);
        setIsAuthenticated(true);
        setUser(data.username);
      })
      .catch(() => setIsAuthenticated(false))
  }

  return (
    <div className="absolute p-5 inset-x-2 top-0 z-100 border-b backdrop-blur-sm bg-indigo-400/10 m-5 rounded-2xl">
      <header className="text-blue-300 hover-text-blue-600 font-mono text-xl text-bold">
        <div className="flex bg-green justify-around">
          <Link href="/home"> Home </Link>
          <Link href="/Dashboard"> Dashboard </Link>
          <div> About </div>
          {user ? (
            <Link href="/profile">Profile</Link>
          ) : (
            <Link href="/login">Log in</Link>
          )}
        </div>
      </header>
    </div>
  );
}
