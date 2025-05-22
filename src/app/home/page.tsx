'use client';

import { useState } from "react";

import { useLocation } from "@/src/app/locationContext"
import { Place } from "@/src/types/types"
import { getDistance } from "@/src/core/distanceFunctions";

export default function Home() {

  const { coords } = useLocation();

  const [sliderValue, setSliderValue] = useState(5);
  const [responseRecieved, setResponseRecieved] = useState(false);
  const [data, setData] = useState<Place[]>([]);
  const [buttonClicked, setButtonClicked] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);

  const handleButtonClick = (e: React.FormEvent, item: Place) => {
    e.preventDefault();
    console.log(item);
    setButtonClicked(true);
  }

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
    try {
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
      });

      const dt = await response.json();

      if (!response.ok) {
        setResponseRecieved(false);
        throw new Error(dt.error || "Invalid Login");
      }

      console.log(dt.plc)
      setData(dt.plc.places);
      setResponseRecieved(true);
    } catch (error) {
      console.error("Error fetching places:", error);
      setResponseRecieved(false);
    }
  }

  return (
    <div>
      <div className={`z-0 fixed inset-0 bg-gray-600 m-20 rounded-4xl shadow-lg ${buttonClicked ? "opacity-100 z-50" : "opacity-0"}`}>
        
        <button
          className={`bg-red-600 p-10 rounded-3xl`}
          onClick={() => { setButtonClicked(false) }}>
          Close
        </button>
      </div>
      <div className={`z-2 min-h-screen font-mono flex items-center justify-center bg-gradient-to-br from-indigo-900 to-purple-800 py-12 px-4 sm:px-6 lg:px-8`}>
        <form className={`z-2 -transform-x-14 max-w-md w-full space-y-8 bg-white/10 backdrop-blur-sm p-8 rounded-lg shadow-lg border border-purple-300/20 transform transition-transform duration-500 ${responseRecieved ? '-translate-x-[500%]' : ''}`} onSubmit={handleSubmit}>
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
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md transition duration-200"
          >
            Plan
          </button>

        </form >
        <div className={`overflow-y-auto h-[50vh] max-w-md w-full space-y-8 bg-white/10 backdrop-blur-sm p-8 rounded-lg shadow-lg border border-purple-300/20 transform transition-all duration-500 ease-in-out my-auto ${responseRecieved ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full -mr-full'}`}>
          <h1 className="text-3xl font-bold text-center text-gray-900">Places around you!</h1>
          {data.length > 0 ? (
            data.map((item: Place) => (
              <button
                key={item.id}
                className="bg-white/20 backdrop-blur-sm rounded-lg p-4 mb-4 hover:bg-white/30 transition-all duration-300"
                onClick={(e) => { handleButtonClick(e, item) }}
              >
                <h3 className="text-xl font-semibold text-white mb-2">
                  {`${item.displayName.text} (${getDistance(item.location?.longitude, item.location?.latitude)}km)`}
                </h3>
                <p className="text-gray-200 text-sm mb-2">
                  {item.formattedAddress}
                </p>
                <div className="flex justify-between items-center text-sm text-gray-300">
                  <span className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {item.priceLevel === 'PRICE_LEVEL_FREE' ? 'Free' :
                      item.priceLevel === 'PRICE_LEVEL_INEXPENSIVE' ? '$' :
                        item.priceLevel === 'PRICE_LEVEL_MODERATE' ? '$$' :
                          item.priceLevel === 'PRICE_LEVEL_EXPENSIVE' ? '$$$' :
                            item.priceLevel === 'PRICE_LEVEL_VERY_EXPENSIVE' ? '$$$$' : 'Price Level Unavailable'}
                  </span>
                  {item.rating && (
                    <span className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                      </svg>
                      {item.rating}
                    </span>
                  )}
                </div>
              </button>
            ))) : (
            <div className="text-white text-center">
              No places found in this area
            </div>)}
        </div>
      </div >
    </div>
  );
}