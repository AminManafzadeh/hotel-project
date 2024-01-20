import { createContext, useContext, useState } from "react"
import { useSearchParams } from "react-router-dom"
import useFetch from "../../Hooks/useFetch"
import axios from "axios"
import toast from "react-hot-toast"



const HotelContext = createContext()

export default function HotelProvider({ children }) {
    const [currentHotel, setCurrentHotel] = useState(null)
    const [isCurrHotelLoading, setIsCurrHotelLoading] = useState(false)
    const [searchParams] = useSearchParams()
    const destination = searchParams.get("destination")
    const room = JSON.parse(searchParams.get("options"))?.room

    const { isLoading, data: hotels } = useFetch("http://localhost:5000/hotels",
        `q=${destination || ""}&accommodates_gte=${room || ""}`)

    const getSingleHotel = async (id) => {
        try {
            setIsCurrHotelLoading(true)
            const { data } = await axios.get(`http://localhost:5000/hotels/${id}`)
            setCurrentHotel(data)
            isCurrHotelLoading(false)
        } catch (error) {
            // toast.error(error?.message)
            isCurrHotelLoading(false)
        }
    }

    return (
        <HotelContext.Provider value={{ isLoading, hotels, getSingleHotel, isCurrHotelLoading, currentHotel }}>
            {children}
        </HotelContext.Provider>
    )
}



export const useHotel = () => {
    return useContext(HotelContext)
}