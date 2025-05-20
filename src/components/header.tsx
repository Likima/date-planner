"use client"

import Link from 'next/link'

export function Header(props: React.PropsWithChildren) {
  return (
    <div className="absolute p-5 inset-x-2 top-0 z-100 border-b backdrop-blur-sm bg-indigo-400/10 m-5 rounded-2xl">
      <header className="text-blue-300 hover-text-blue-600 font-mono text-xl text-bold">
        <div className="flex bg-green justify-around">
          <Link href="/Home"> Home </Link>
          <Link href="/Dashboard"> Dashboard </Link>
          <div> About </div>
          <Link href="/login"> Log in </Link>
        </div>
      </header>
    </div>
  );
}
