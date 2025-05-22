import Map from "@/src/components/map";

/*import "mapbox-gl/dist/mapbox-gl.css";
*/

export default function Home() {
  return (
    <div className="font-mono">
      <div className="w-screen h-screen z-1 absolute">
        <Map />
      </div>
      <div className="absolute inset-0 flex justify-center items-center z-10">
        <p className="backdrop-blur-sm bg-indigo-400/10 text-5xl font-bold p-10 rounded-2xl text-blue-300">Welcome to Day Planner!</p>
      </div>
    </div>
  );
}
