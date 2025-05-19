"use client"

export function CustomButton(props: { label: string }) {
  return (
    <button className="bg-indigo-400 p-5 text-bold text-xl font-mono rounded-lg">
      {props.label}
    </button>
  );
}
