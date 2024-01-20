import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Loader from '../Loader/Loader'
import { FcDownLeft } from "react-icons/fc";
import ReactCountryFlag from 'react-country-flag';
import { useDispatch, useSelector } from 'react-redux';
import { getSingleBookmarks } from '../../features/Bookmark/bookmarkSlice';

function SingleBookmark() {
    const navigate = useNavigate()
    const { id } = useParams()
    console.log(id)
    // const { isLoading, currentBookmark, getBookmarks } = useBookmark()
    const { currentBookmark, isLoading } = useSelector(state => state.bookmark)
    const dispatch = useDispatch()
    console.log(currentBookmark)

    useEffect(() => {
        // getBookmarks(id)
        dispatch(getSingleBookmarks(id))
    }, [id])

    const handleBack = () => {
        navigate(-1)
    }

    if (isLoading && !currentBookmark) return <Loader />

    return (
        <div>
            <div className='mt-5 flex items-center justify-between border border-green-400 border-solid rounded-xl py-2 px-4'>
                <h1 className=' font-semibold'>
                    {currentBookmark?.cityName}
                </h1>
                <strong className='text-green-500'><ReactCountryFlag className='mr-2' svg countryCode={currentBookmark?.countryCode} /> {currentBookmark?.country} &bull; {currentBookmark?.countryCode}</strong>
                <h3 className=' -text--primary-600'>{currentBookmark?.host_location}</h3>
            </div>

            <button onClick={handleBack} className='flex items-center py-1 px-3 mt-4 rounded-lg -border-t--text-400 border border-solid'> <FcDownLeft className='mr-2' /> Back</button>
        </div>
    )
}

export default SingleBookmark