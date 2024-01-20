import { useEffect } from "react";

export default function UseOutsideClick(ref, exceptionId, cb) {
    useEffect(() => {
        const handleOutsideClick = (e) => {
            if (ref.current && !ref.current.contains(e.target) && e.target.id !== exceptionId) {
                cb()
            }
            console.log(e.target)
        }
        document.addEventListener("mousedown", handleOutsideClick)

        return () => {
            document.removeEventListener("mousedown", handleOutsideClick)
        }

    }, [ref, cb])
}