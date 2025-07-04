'use client';

// issues: cannot remove things from list
// date is null occasionally???

import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';

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
    <div>
      <PopUp
        open={buttonClicked}
        makeClosed={setButtonClicked}
        children={
          <>
            <LocationDisplay
              data={currentItem}
            />
            <button
              className={`w-full py-2 px-4 ${SelectedPlaces?.find(place => place.place.id === currentItem?.id) ? 'bg-red-600 hover:bg-red-700' : 'bg-blue-600 hover:bg-blue-700'} text-white font-semibold rounded-md transition duration-200 m-10`}
              onClick={() => {
                if (currentItem) {
                  if (SelectedPlaces?.find(place => place.place.id === currentItem.id)) {
                    setSelectedPlaces(SelectedPlaces.filter(place => place.place.id !== currentItem.id));
                  } else {
                    setSelectedPlaces(prev => prev ? [...prev, { place: currentItem, date: DateInfo, time: DateTime }] : [{ place: currentItem, date: DateInfo, time: DateTime }]);
                  }
                }
                console.log(SelectedPlaces);
              }}
            >
              {SelectedPlaces?.find(place => place.place.id === currentItem?.id) ? 'Remove' : 'Add'}
            </button>
          </>
        }
      />


      <PopUp
        open={showDate}
        makeClosed={setShowDate}
        children={
          <>
            <PlaceNodeArray
              data={SelectedPlaces}
            />
            <button
              className={`z-10 w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md transition duration-200 m-10 ${responseRecieved ? '-translate-x-[500%]' : ''}`}
              onClick={handleFinish}
            >
              Finish
            </button>
          </>
        }
      />
      <div className={`z-2 min-h-screen font-mono flex items-center justify-center bg-gradient-to-br from-indigo-900 to-purple-800 py-12 px-4 sm:px-6 lg:px-8`}>
        <form className={`z-2 -transform-x-14 max-w-md w-full space-y-3 bg-white/10 backdrop-blur-sm p-4 rounded-lg shadow-lg border border-purple-300/20 transform transition-transform duration-500 ${responseRecieved ? '-translate-x-[500%]' : ''}`} onSubmit={handleSubmit}>
          <h1 className="text-3xl font-bold text-center text-gray-900">Plan a Day Out!</h1>
          <div className="space-y-4">
            <div>
              <Slider
                value={sliderValue}
                onChange={setSliderValue}
                min={0}
                max={20}
                label="Choose a Suitable Distance"
              />
              <DateInput
                label="Choose a Date"
                onChange={setDateInfo}
              />
              <div className="w-full max-w-md mx-auto p-4">
                <label className="block mb-2 text-sm font-medium text-gray-700">Select Time Range</label>
                <div className="flex gap-4">
                  <TimeInput
                    label="Get There At"
                    htmlfor="startTime"
                    id="startTime"
                    onChange={setStartTime}
                  />
                  <TimeInput
                    label="Leave There At"
                    htmlfor="endTime"
                    id="endTIme"
                    onChange={setEndTime}
                  />
                </div>
              </div>
            </div>
          </div>
          <KeywordSearch
            htmlfor="search"
            value={userSearch}
            onChange={setUserSearch}
            placeholder="Enter Keywords"
            label="Search for places"
          />
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md transition duration-200"
          >
            Add
          </button>

          <ErrorMessage showCondition={errors.time} message="Enter a valid time" />
          <ErrorMessage showCondition={errors.date} message="Enter a valid day" />
          <ErrorMessage showCondition={errors.search} message="Enter a search request!" />
        </form>
        <button
          className={`z-10 w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md transition duration-200 m-10 ${responseRecieved ? '-translate-x-[500%]' : ''}`}
          onClick={() => {
            console.log(SelectedPlaces);
            setShowDate(true);
          }}
        >
          View Current Date
        </button>
        <LocationArrayContainer
          data={data}
          showMoreDetails={handleButtonClick}
          navBack={setResponseRecieved}
          visible={responseRecieved}
        />
      </div>
    </div>
  );
}