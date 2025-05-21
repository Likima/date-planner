"use client"

export function CustomButton(props: { label: string }) {
  return (
    <div className="flex justify-center items-center">
      <button className="bg-indigo-400 p-5 text-bold text-xl font-mono rounded-lg">
        {props.label}
      </button>
    </div>
  );
}
