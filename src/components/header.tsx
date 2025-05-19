"use client"

import Link from 'next/link'

export function Header(props: React.PropsWithChildren) {
  return (
    <div className="absolute bg-indigo-400 p-5 inset-x-2 top-0 z-10 border-b border-black/5">
      <header className="text-blue-300 hover-text-blue-600 font-mono text-xl text-bold">
        <div className="flex bg-green justify-around">
          <Link href="/Home"> Home </Link>
          <Link href="/Dashboard"> Dashboard </Link>
          <div> About </div>
          <div> Log in </div>
        </div>
      </header>
    </div>
  );
}
