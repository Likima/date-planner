'use client';

// issues: cannot remove things from list
// date is null occasionally???

import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

import { useLocation } from "@/src/components/Context/locationContext"
import { usePlace } from "@/src/components/Context/placeContext";
import { Place, DateDayInfo, DateTimeInfo, PlaceNode } from "@/types"
import { LocationDisplay } from "@/src/components/locationDisplay";
import { ErrorMessage } from "@/src/components/errorMessage";
import { DateView } from "@/src/components/dateView";
import { Slider } from "@/src/components/FormComponents/slider";
import { DateInput } from "@/src/components/FormComponents/dateInput";
import { TimeInput } from "@/src/components/FormComponents/timeInput";
import { KeywordSearch } from "@/src/components/FormComponents/keywordSearch";
import { PopUp } from "@/src/components/PopUps/popup";
import { LocationArrayContainer } from "@/src/components/LocationComponents/LocationArrayContainer";
import { PlaceNodeArray } from "@/src/components/PlaceNodeComponents/PlaceNodeArray";

export default function Home() {

  const { coords } = useLocation();
  const { places, setPlaces } = usePlace();
  const router = useRouter();

  // states for user input
  const [sliderValue, setSliderValue] = useState(5);
  const [responseRecieved, setResponseRecieved] = useState(false);
  const [data, setData] = useState<Place[]>([]);
  const [buttonClicked, setButtonClicked] = useState(false);
  const [showDate, setShowDate] = useState(false);
  const [currentItem, setCurrentItem] = useState<Place | null>(null);
  const [DateInfo, setDateInfo] = useState<DateDayInfo | null>(null);
  const [SelectedPlaces, setSelectedPlaces] = useState<PlaceNode[] | null>(null);

  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [DateTime, setDateTime] = useState<DateTimeInfo | null>(null);

  const [userSearch, setUserSearch] = useState('');

  const [errors, setErrors] = useState({
    time: false,
    date: false,
    search: false
  })

  useEffect(() => {
    if (SelectedPlaces && SelectedPlaces.length > 0) {
      console.log('Selected places updated:', SelectedPlaces);
    }
  }, [SelectedPlaces]);

  const handleFinish = () => {
    if (!SelectedPlaces || SelectedPlaces.length === 0) {
      console.error('No places selected');
      return;
    }
    console.log("Selected Places:", SelectedPlaces)

    setPlaces(SelectedPlaces);

    router.push('/dateview');
  };

  const handleButtonClick = (e: React.FormEvent, item: Place) => {
    e.preventDefault();
    console.log(item);
    setButtonClicked(true);
    setCurrentItem(item);
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setErrors({
      time: !startTime || !endTime,
      date: !DateInfo,
      search: userSearch === ''
    })

    setDateTime({
      startTime: startTime,
      endTime: endTime
    })


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
      const response = await fetch('http://localhost:8001/places/specific', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          search: userSearch,
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
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 to-purple-800">
      {/* Planning Section */}
      <div className="container mx-auto px-4 py-8 relative"> {/* Add relative positioning */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto relative z-10"
        >
          {/* Main Planning Form */}
          <div className={`backdrop-blur-sm bg-white/10 rounded-2xl p-8 shadow-xl border border-white/20 
            transition-all duration-500 ${responseRecieved ? 'translate-x-[-100vw]' : 'translate-x-0'}`}>
            <h1 className="text-4xl font-bold text-white text-center mb-8">Plan Your Perfect Day</h1>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Left Column */}
                <div className="space-y-6">
                  <Slider
                    value={sliderValue}
                    onChange={setSliderValue}
                    min={0}
                    max={20}
                    label="Search Radius (km)"
                  />
                  <DateInput
                    label="Select Date"
                    onChange={setDateInfo}
                  />
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                  <div className="bg-white/5 rounded-xl p-6">
                    <label className="text-white text-lg mb-4 block">Time Range</label>
                    <div className="grid grid-cols-2 gap-4">
                      <TimeInput
                        label="Start"
                        htmlfor="startTime"
                        id="startTime"
                        onChange={setStartTime}
                      />
                      <TimeInput
                        label="End"
                        htmlfor="endTime"
                        id="endTime"
                        onChange={setEndTime}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Search Section */}
              <div className="mt-6">
                <KeywordSearch
                  htmlfor="search"
                  value={userSearch}
                  onChange={setUserSearch}
                  placeholder="What are you looking for?"
                  label="Search Places"
                />
              </div>

              <div className="flex gap-4 mt-8">
                <button
                  type="submit"
                  className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-105"
                >
                  Find Places
                </button>
                {(SelectedPlaces?.length ?? 0) > 0 && (
                  <button
                    type="button"
                    onClick={() => setShowDate(true)}
                    className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-105"
                  >
                    View Selected ({SelectedPlaces?.length ?? 0})
                  </button>
                )}
              </div>

              {/* Error Messages */}
              <div className="space-y-2">
                <ErrorMessage showCondition={errors.time} message="Please select both start and end times" />
                <ErrorMessage showCondition={errors.date} message="Please select a date" />
                <ErrorMessage showCondition={errors.search} message="Please enter a search term" />
              </div>
            </form>
          </div>
        </motion.div>

        {/* Results Section */}
        <LocationArrayContainer
          data={data}
          showMoreDetails={handleButtonClick}
          navBack={setResponseRecieved}
          visible={responseRecieved}
        />
      </div>

      {/* Popups */}
      <PopUp
        open={buttonClicked}
        makeClosed={setButtonClicked}
        children={
          <div className="p-6">
            <LocationDisplay data={currentItem} />
            <button
              className={`mt-6 w-full py-3 px-6 rounded-xl text-white font-semibold transition-all duration-200 
                ${SelectedPlaces?.find(place => place.place.id === currentItem?.id)
                  ? 'bg-red-600 hover:bg-red-700'
                  : 'bg-indigo-600 hover:bg-indigo-700'
                }`}
              onClick={() => {
                if (currentItem) {
                  if (SelectedPlaces?.find(place => place.place.id === currentItem.id)) {
                    setSelectedPlaces(SelectedPlaces.filter(place => place.place.id !== currentItem.id));
                  } else {
                    setSelectedPlaces(prev => prev
                      ? [...prev, { place: currentItem, date: DateInfo, time: DateTime }]
                      : [{ place: currentItem, date: DateInfo, time: DateTime }]
                    );
                  }
                }
              }}
            >
              {SelectedPlaces?.find(place => place.place.id === currentItem?.id) ? 'Remove from Plan' : 'Add to Plan'}
            </button>
          </div>
        }
      />

      <PopUp
        open={showDate}
        makeClosed={setShowDate}
        children={
          <div className="p-6">
            <PlaceNodeArray data={SelectedPlaces} />
            <button
              className="mt-6 w-full py-3 px-6 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl transition-all duration-200"
              onClick={handleFinish}
            >
              Finalize Plan
            </button>
          </div>
        }
      />
    </div>
  );
}