interface SliderProps {
    value: number;
    onChange: (value: number) => void;
    min: number;
    max: number;
    label: string;
}

export function Slider({ value, onChange, min, max, label }: SliderProps) {
    return (
        <div className="w-full max-w-md mx-auto p-4">
            <label htmlFor="slider" className="block mb-2 text-sm font-medium text-gray-700">
                {label}
            </label>
            <input
                type="range"
                id="slider"
                min={min}
                max={max}
                value={value}
                onChange={(e) => onChange(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>{min}</span>
                <span>{max}</span>
            </div>
            <div>{value}km</div>
        </div>
    );
}