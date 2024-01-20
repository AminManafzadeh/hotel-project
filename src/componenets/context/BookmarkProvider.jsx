import React, { createContext, useContext, useEffect, useState } from 'react'
import useFetch from '../../Hooks/useFetch'
import toast from 'react-hot-toast'
import axios from 'axios'
// import axios from 'axios'
// import toast from 'react-hot-toast'

const BookmarkContext = createContext()


function BookmarkProvider({ children }) {
    const [currentBookmark, setCurrentBookmark] = useState(null)
    const [bookmarks, setBookmarks] = useState([])
    const [isLoading, setIsLoading] = useState(false)


    useEffect(() => {
        const getAllBookmarksList = async () => {
            try {
                setIsLoading(true)
                const { data } = await axios.get("http://localhost:5000/bookmarks")
                setBookmarks(data)
            } catch (error) {
                toast.error(error.message)
            } finally {
                setIsLoading(false)
            }
        }
        getAllBookmarksList()
    }, [])

    const getBookmarks = async (id) => {
        try {
            setIsLoading(true)
            const { data } = await axios.get(`http://localhost:5000/bookmarks/${id}`)
            setCurrentBookmark(data)
        } catch (error) {
            toast.error(error.message)
        } finally {
            setIsLoading(false)
        }
    }

    const createBookmark = async (newBookmark) => {
        try {
            setIsLoading(true)
            const { data } = await axios.post(`http://localhost:5000/bookmarks`, newBookmark)
            console.log(data)
            setCurrentBookmark(data)
            setBookmarks(bookmark => [...bookmark, data])
        } catch (error) {
            toast.error(error.message)
        } finally {
            setIsLoading(false)
        }
    }

    const deleteBookmark = async (id) => {
        try {
            setIsLoading(true)
            await axios.delete(`http://localhost:5000/bookmarks/${id}`)
            setBookmarks(prev => prev.filter(item => item.id !== id))
        } catch (error) {
            toast.error(error.message)
        } finally {
            setIsLoading(false)
        }
    }



    return (
        <BookmarkContext.Provider value={{ bookmarks, isLoading, currentBookmark, getBookmarks, createBookmark, deleteBookmark }}>
            {children}
        </BookmarkContext.Provider>
    )
}

export default BookmarkProvider

export const useBookmark = () => {
    return useContext(BookmarkContext)
} 