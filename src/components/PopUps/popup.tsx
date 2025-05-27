import { CloseButton } from "./CloseButton";

interface PopUpProps {
    open: boolean;
    makeClosed: (value: boolean) => void;
    children: React.ReactNode;
}

export function PopUp({ open, makeClosed, children }: PopUpProps) {
    return (
        <div className={`overflow-scroll z-0 fixed inset-0 bg-gray-600 m-20 rounded-4xl shadow-lg ${open ? "opacity-100 z-50" : "opacity-0"}`}>
            <CloseButton
                onClick={makeClosed}
            />
            {children}
        </div>
    )
}