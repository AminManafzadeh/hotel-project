import React from 'react'
import Map from '../map/Map'

import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'

function BookmarkLayout() {
    const { bookmarks } = useSelector(state => state.bookmark)
    console.log(bookmarks)
    return (
        <div className='max-w-[1200px] flex my-8 mx-auto rounded h-[calc(100%_-_130px)] items-stretch justify-between'>
            <div className="w-[35%] md:w-[50%] pr-4 overflow-y-scroll h-[500px]"><Outlet /></div>
            <Map markerLocation={bookmarks} />
        </div>
    )
}

export default BookmarkLayout