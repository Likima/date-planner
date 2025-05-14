import Image from "next/image";
import { Header } from "@/src/components/header";
import Map from "@/src/components/map";

import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from "mapbox-gl"

export default function Home() {
  return(
    <div className = "max-w-screen overflow-x-hidden font-mono">
      <div className = "bg-indigo-400 p-5 fixed inset-x-0 top-0 z-10 border-b border-black/5">
        <Header />
      </div>
      <Map />
      <div className = "h-screen flex items-center justify-center text-bold text-5xl z-10">
        Welcome to Date Planner!  
      </div>
    </div>
    );
}
