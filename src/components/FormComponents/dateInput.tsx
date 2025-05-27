import { DateDayInfo } from "@/src/types/types"

interface DateInputProps {
    label: string;
    onChange: (value: DateDayInfo | null) => void;

}

export function DateInput({ label, onChange }: DateInputProps) {
    return (
        <div className="w-full max-w-md mx-auto p-4">
            <label htmlFor="day" className="block mb-2 text-sm font-medium text-gray-700">
                {label}
            </label>
            <input
                type="date"
                id="day"
                name="date"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                onChange={(e) => {
                    const [year, month, day] = e.target.value.split("-");
                    onChange((!year || !month || !day) ? null :
                        {
                            year: parseInt(year),
                            month: parseInt(month),
                            day: parseInt(day)
                        }
                    )
                }}
            />
        </div>
    )
}