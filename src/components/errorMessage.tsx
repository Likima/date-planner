"use client"

export function ErrorMessage(props: { showCondition: Boolean, message: String }) {
    return (<div className="mt-4 text-red-500 text-center"
        style={{ display: props.showCondition ? 'block' : 'none' }}
    >
        {props.message}
    </div>);
}