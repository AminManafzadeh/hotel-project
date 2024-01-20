import { useState } from "react";

export default function useGeoLocation() {
    const [isLoadingPosition, setIsLoadingPosition] = useState(false)
    const [geoPosition, setGeoPosation] = useState({})
    const [error, setError] = useState(null)


    function getPosition() {

        if (!navigator.geolocation) return setError("Your browser dose not support geolocation")

        setIsLoadingPosition(true)

        navigator.geolocation.getCurrentPosition(
            (pos) => {
                setGeoPosation({
                    lat: pos.coords.latitude,
                    lng: pos.coords.longitude
                })
                setIsLoadingPosition(false)
            }, (error) => {
                setError(error.message)
                setIsLoadingPosition(false)
            })
    }

    return { isLoadingPosition, geoPosition, error, getPosition }
}