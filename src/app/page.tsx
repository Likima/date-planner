import Image from "next/image";
import { Header } from "@/src/components/header";
import { ExampleHello } from "@/src/components/hello"
import Map from "@/src/components/map";

import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from "mapbox-gl"

export default function Home() {
  return (
    <div className="max-w-screen overflow-x-hidden font-mono">
      <div className="w-full h-screen z-1 inset-0 absolute h-screen p-10 flex items-center text-bold text-5xl">
        <Map />
      </div>
      <div className="absolute inset-0 flex justify-center items-center z-10">
        <p className="text-5xl font-bold">Welcome to Day Planner!</p>
      </div>
    </div>
  );
}
