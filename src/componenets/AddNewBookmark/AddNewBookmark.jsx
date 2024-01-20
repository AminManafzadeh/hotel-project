import React, { useEffect, useState } from 'react'
import { FcDownLeft } from 'react-icons/fc'
import { useNavigate } from 'react-router-dom'
import useUrlLocation from '../../Hooks/useUrlLocation'
import axios from 'axios'
import Loader from '../Loader/Loader'
import ReactCountryFlag from 'react-country-flag'
import { useDispatch, useSelector } from 'react-redux'
import { createBookmark } from '../../features/Bookmark/bookmarkSlice'

const BASE_GEOCODING_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client"

function AddNewBookmark() {
    const navigate = useNavigate()
    // const { createBookmark } = useBookmark()
    const dispatch = useDispatch()
    const [lat, lng] = useUrlLocation()
    const [isLoaingGeoCodding, setIsLoadingGeoCodding] = useState(false)
    const [getCodingError, setGeoCodingError] = useState(null)
    const [cityName, setCityName] = useState("")
    const [country, setCountry] = useState("")
    const [countryCode, setCountryCode] = useState("")

    const getSomeThings = async () => {
        setIsLoadingGeoCodding(true)
        setGeoCodingError(null)
        try {
            const { data } = await axios.get(`${BASE_GEOCODING_URL}?latitude=${lat}&longitude=${lng}`)
            console.log(data)
            if (!data.countryName) throw new Error("This Location is not a City, please click somewhere else!")
            setCityName(data.city || data.locality || "")
            setCountry(data.countryName)
            setCountryCode(data.countryCode)
        } catch (error) {
            setGeoCodingError(error.message)
        } finally {
            setIsLoadingGeoCodding(false)
        }
    }

    useEffect(() => {
        if (!lat || !lng) return

        getSomeThings()
    }, [lat, lng])

    const handleBack = (e) => {
        e.preventDefault()
        navigate(-1)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!cityName || !country) return

        const newBookmark = {
            cityName,
            country,
            countryCode,
            latitude: lat,
            longitude: lng,
            host_location: cityName + " " + country
        }

        dispatch(createBookmark(newBookmark))
        navigate("/bookmarks")
    }

    if (isLoaingGeoCodding) return <Loader />
    if (getCodingError) return <p className='text-red-600'>{getCodingError}</p>

    return (
        <div>
            <h2 className='font-semibold'>Bookmark New Location</h2>
            <form onSubmit={handleSubmit} className='mt-4' action="">
                <div className='mb-4 relative'>
                    <label className='block mb-[0.2rem]' htmlFor="cityName">CityName</label>
                    <input value={cityName} onChange={(e) => setCityName(e.target.value)} className='border border-solid -border--text-400 w-full rounded-lg p-2' type="text" name="cityName" id="cityName" />
                </div>
                <div className='mb-4 relative'>
                    <label className='block mb-[0.2rem]' htmlFor="country">Country</label>
                    <div className='border border-solid -border--text-400 w-full rounded-lg p-2 flex items-center justify-between'>
                        <input value={country} onChange={(e) => setCountry(e.target.value)} type="text" name="country" id="country" />
                        <ReactCountryFlag svg countryCode={countryCode} />
                    </div>
                </div>
                <div className='flex items-center justify-between mt-8'>
                    <button onClick={handleBack} className='flex items-center py-1 px-3 rounded-lg border-gray-400 border border-solid'><FcDownLeft /> Back</button>
                    <button className=' py-1 px-3 rounded-lg bg-blue-800 text-white'>Add</button>
                </div>


            </form>
        </div >
    )
}

export default AddNewBookmark