import React from 'react'
import { Outlet } from 'react-router-dom'
import Map from '../map/Map'
import { useHotel } from '../context/HotelProvider'
import { useSelector } from 'react-redux'

function AppLayout() {
    const { hotels } = useSelector(state => state.hotel)
    return (
        <div className='max-w-[1200px] flex mt-8 mx-auto rounded h-[calc(100%_-_130px)] items-stretch justify-between'>
            <div className="w-[35%] md:w-[50%] pr-4 overflow-y-scroll h-[500px]"><Outlet /></div>
            <Map markerLocation={hotels} />
        </div>
    )
}

export default AppLayout