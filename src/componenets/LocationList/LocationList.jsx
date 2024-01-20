import React, { useEffect } from 'react'
import useFetch from '../../Hooks/useFetch'
import Loader from '../Loader/Loader'
import { useDispatch, useSelector } from 'react-redux'
import { getHotels } from '../../features/Hotel/hotelSlice'
import { Link } from 'react-router-dom'

function LocationList() {
    // const { data, isLoading } = useFetch("http://localhost:5000/hotels", "")
    const dispatch = useDispatch()
    const { hotels, isLoading } = useSelector(state => state.hotel)
    useEffect(() => {
        dispatch(getHotels())
    }, [])

    if (isLoading) <div><Loader /></div>

    return (
        <div className='max-w-[1200px] container my-8 mx-auto'>
            <h2 className='mb-4 font-bold ml-2'>Nearby Locations</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-3">
                {hotels?.map(item => {
                    return <Link key={item.id} to={`/hotels/${item.id}?lat=${item.latitude}&lng=${item.longitude}`}>
                        <div className='-bg--white w-full rounded-lg p-2 transition-all ease-in-out duration-[0.3s] shadow-md hover:shadow-2xl h-auto '>
                            <img className='w-full h-[20rem] object-cover object-center rounded-lg mb-2' src={item.picture_url.url} alt={item.name} />
                            <div className="p-[3px] h-28">
                                <p className="font-medium mb-1">{item.smart_location}</p>
                                <p className="-text--text-400 mb-1">{item.name}</p>
                                <p className="font-medium flex items-center">
                                    €&nbsp;{item.price}&nbsp;
                                    <span className='-text--text-400 font-normal'>night</span>
                                </p>
                            </div>
                        </div>
                    </Link>
                })}
            </div>
        </div>
    )
}

export default LocationList