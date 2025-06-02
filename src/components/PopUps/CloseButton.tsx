export function CloseButton(props: { onClick: (value: boolean) => void }) {
    return (
        <button
            className="absolute top-2 m-5 right-2 h-[20px] w-[20px] rounded-full bg-red-600 hover:bg-red-700"
            onClick={(e) => { props.onClick(false) }}
        >
        </button>
    )
}