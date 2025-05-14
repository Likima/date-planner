"use client"

export function Header(props: React.PropsWithChildren) {
  return (
    <header className = "text-blue-300 hover-text-blue-600 font-mono text-xl text-bold">
      <div className = "flex bg-green justify-around">
        <div> Home </div>
        <div> About </div>
        <div> Log in </div>
      </div>
    </header>
  )
}
