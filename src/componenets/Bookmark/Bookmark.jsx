import React, { useEffect } from 'react'
import { useBookmark } from '../context/BookmarkProvider'
import Loader from '../Loader/Loader'
import ReactCountryFlag from 'react-country-flag'
import { Link } from 'react-router-dom'
import { HiTrash } from 'react-icons/hi'
import { useDispatch, useSelector } from 'react-redux'
import { deleteBookmark, getAllBookmarks } from '../../features/Bookmark/bookmarkSlice'

function Bookmark() {
    // const { bookmarks, isLoading, currentBookmark, deleteBookmark } = useBookmark()
    const dispatch = useDispatch()
    const { bookmarks, isLoading, currentBookmark } = useSelector(state => state.bookmark)

    useEffect(() => {
        dispatch(getAllBookmarks())
    }, [])

    const handleRemove = (e, id) => {
        e.preventDefault()
        dispatch(deleteBookmark(id))
    }

    if (isLoading && !bookmarks) return <Loader />
    if (!bookmarks.length) return <p className='text-red-500 font-semibold text-2xl'>There is no Bookmarked Locations !!</p>

    return (
        <div>
            <h2>Bookmark List</h2>
            <div className='mt-4'>
                {bookmarks?.map(item => {
                    return (
                        <Link key={item.id} to={`/bookmarks/${item.id}?lat=${item.latitude}&lng=${item.longitude}`}>
                            <div className={`mb-4 border border-solid -border--text-400
                         flex items-center justify-between  rounded-2xl p-4 ${item.id === currentBookmark?.id ? "border-2 border-solid border-blue-800 rounded-2xl" : ""}`} >
                                <div>
                                    <ReactCountryFlag svg countryCode={item.countryCode} />
                                    &nbsp; <strong className='ml-2'>{item.cityName}</strong> &nbsp; <strong className='ml-2'>{item.country}</strong>
                                </div>
                                <button onClick={(e) => handleRemove(e, item.id)}>
                                    <HiTrash className='text-red-500 font-normal text-xl' />
                                </button>
                            </div>
                        </Link>
                    )
                })}
            </div>
        </div>
    )
}

export default Bookmark