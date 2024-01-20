import React, { useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { useHotel } from '../context/HotelProvider'
import Loader from '../Loader/Loader'
import { useDispatch, useSelector } from 'react-redux'
import { getAllHotels } from '../../features/Hotel/hotelSlice'


function Hotels() {
    // const { isLoading, hotels, currentHotel } = useHotel()
    const { hotels, isLoading, currentHotel } = useSelector(state => state.hotel)
    const dispatch = useDispatch()
    const [searchParams] = useSearchParams()
    const destination = searchParams.get("destination")
    const room = JSON.parse(searchParams.get("options"))?.room

    useEffect(() => {
        dispatch(getAllHotels({ destination, room }))
    }, [destination, room])

    if (isLoading) <div><Loader /></div>

    return (
        <div className='flex flex-col gap-4 '>
            <h2>Search Results ({hotels.length})</h2>
            {hotels?.map(item => {
                return <Link key={item.id} to={`/hotels/${item.id}?lat=${item.latitude}&lng=${item.longitude}`}>
                    <div className={`flex gap-4 p-2 ${item.id === currentHotel?.id ? "border-2 border-solid -border--primary-700 rounded-xl" : ""}`}>
                        <img className='w-24 h-24 object-fill rounded-2xl' src={item.picture_url.url} alt={item.name} />
                        <div className="flex flex-col">
                            <p className="mb-1">{item.smart_location}</p>
                            <p className="-text--text-400">{item.name}</p>
                            <p className="font-medium flex items-center">
                                €&nbsp;{item.price}&nbsp;
                                <span className='-text--text-400 font-normal'>night</span>
                            </p>
                        </div>
                    </div>
                </Link>
            })}
        </div>
    )
}

export default Hotels