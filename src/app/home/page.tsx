'use client';

import { useState } from "react";

import { useLocation } from "@/src/app/locationContext"

export default function Home() {
  const { coords } = useLocation();

  const [sliderValue, setSliderValue] = useState(12.5);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (coords && coords.lng && coords.lat) {
      console.log({ lng: coords.lng, lat: coords.lat, sliderValue })
      findPlaces(coords.lat, coords.lng, sliderValue);
    }
    else {
      console.log("Please check if geolocation is enabled!")
    }
  };

  async function findPlaces(lat: number, lng: number, rad: number) {
    console.log("Attempting to find places...")
    const response = await fetch('http://localhost:8001/places', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        latitude: lat,
        longitude: lng,
        radius: rad
      }),
      credentials: 'include'
    })
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Invalid Login");
    }

    console.log(data);

  }

  return (
    <div className="min-h-screen font-mono flex items-center justify-center bg-gradient-to-br from-indigo-900 to-purple-800 py-12 px-4 sm:px-6 lg:px-8">
      <form className="max-w-md w-full space-y-8 bg-white/10 backdrop-blur-sm p-8 rounded-lg shadow-lg border border-purple-300/20" onSubmit={handleSubmit}>
        <h1 className="text-3xl font-bold text-center text-gray-900">Plan a Day Out!</h1>
        <div className="space-y-4">
          <div>
            <div className="w-full max-w-md mx-auto p-4">
              <label htmlFor="slider" className="block mb-2 text-sm font-medium text-gray-700">Choose a Suitable Distance</label>
              <input
                type="range"
                id="slider"
                min="0"
                max="20"
                value={sliderValue}
                onChange={(e) => setSliderValue(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>0</span>
                <span>20</span>
              </div>
              <div>{sliderValue}km</div>
            </div>

          </div>
          <div>

          </div>
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md transition duration-200"
        >
          Plan
        </button>

      </form >
    </div >

    // <div className="min-h-screen font-mono flex items-center justify-center bg-gradient-to-br from-indigo-900 to-purple-800 py-12 px-4 sm:px-6 lg:px-8">
    //   <form className="max-w-md w-full space-y-8 bg-white/10 backdrop-blur-sm p-8 rounded-lg shadow-lg border border-purple-300/20">
    //     <label htmlFor="slider" className="block mb-2 text-sm font-medium text-gray-700">Select Value</label>

    //     <input
    //       type="range"
    //       id="slider"
    //       min="0"
    //       max="100"
    //       value="50"
    //       className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
    //     />

    //     <div className="flex justify-between text-xs text-gray-500 mt-1">
    //       <span>0</span>
    //       <span>100</span>
    //     </div>
    //   </div>
    //   <div className="flex justify-center items-center">
    //     <button
    //       className="bg-indigo-400 p-5 text-bold text-xl font-mono rounded-lg">
    //       Plan!
    //     </button>
    //   </div>
    // </form >
  );
}