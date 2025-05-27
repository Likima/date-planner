interface TimeInputProps {
    label: string;
    htmlfor: string;
    id: string;
    onChange: (value: string) => void
}

export function TimeInput({ label, htmlfor, id, onChange }: TimeInputProps) {
    return (
        <div className="flex-1">
            <label htmlFor={htmlfor} className="block text-xs text-gray-600">
                {label}
            </label>
            <input
                type="time"
                id={id}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                onChange={(e) => { onChange(e.target.value) }}
            />
        </div>
    )
}