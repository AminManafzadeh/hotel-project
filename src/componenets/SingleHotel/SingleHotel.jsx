import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Loader from '../Loader/Loader'
import { useDispatch, useSelector } from 'react-redux'
import { getSingleHotel } from '../../features/Hotel/hotelSlice'


function SingleHotel() {
    const { id } = useParams()
    // const { data, isLoading } = useFetch(`http://localhost:5000/hotels/${id}`)
    // const { currentHotel, isCurrHotelLoading, getSingleHotel } = useHotel()
    const dispatch = useDispatch()
    const { currentHotel, isLoading } = useSelector(state => state.hotel)
    useEffect(() => {
        dispatch(getSingleHotel(id))
    }, [id])

    if (isLoading && !currentHotel) return <Loader />

    return (
        <div className='flex items-stretch justify-between max-w-[1200px] mx-auto my-8 gap-4'>
            <div className="flex flex-col">
                <h2 className='mb-1 text-base font-semibold'>{currentHotel?.name}</h2>
                <div className='mb-4'>
                    {currentHotel?.number_of_reviews} reviews &bull; {currentHotel?.smart_location}
                </div>
                <div className='w-full h-80'>
                    <img className='w-full h-full object-cover object-center rounded-xl' src={currentHotel?.xl_picture_url} alt={currentHotel?.name} />
                </div>
            </div>
        </div>
    )
}

export default SingleHotel