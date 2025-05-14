import Image from "next/image";
import { Header } from "@/src/components/header";

export default function Home() {
  return(
    <div className = "max-w-screen overflow-x-hidden font-mono">
      <div className = "bg-indigo-400 p-5 fixed inset-x-0 top-0 z-10 border-b border-black/5">
        <Header />
      </div>
      <div className = "h-screen flex items-center justify-center text-bold text-5xl">
        Welcome to Date Planner!  
      </div>
    </div>
    );
}
