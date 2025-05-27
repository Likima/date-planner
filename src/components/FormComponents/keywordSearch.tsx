interface KeywordSearchProps {
    htmlfor: string;
    value: string;
    onChange: (value: string) => void;
    label: string;
    placeholder: string;
}

export function KeywordSearch({ htmlfor, value, onChange, label, placeholder }: KeywordSearchProps) {
    return (
        <div className="w-full max-w-md mx-auto p-4">
            <label htmlFor={htmlfor} className="block mb-2 text-sm font-medium text-gray-700">{label}</label>

            <input
                type="text"
                id="search"
                value={value}
                onChange={(e)=>onChange(e.target.value)}
                placeholder={placeholder}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
        </div>
    )
}