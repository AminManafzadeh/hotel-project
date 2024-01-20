import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { da } from "date-fns/locale";
import toast from "react-hot-toast";

export const getAllBookmarks = createAsyncThunk("get/getAsyncBookmarks", async (_, { rejectWithValue }) => {
    try {
        const { data } = await axios.get("http://localhost:5000/bookmarks")
        console.log(data)
        return data
    } catch (error) {
        return rejectWithValue(error.message)
    }
})

export const getSingleBookmarks = createAsyncThunk("get/getAsyncSingleBookmarks", async (payload, { rejectWithValue }) => {
    try {
        const { data } = await axios.get(`http://localhost:5000/bookmarks/${payload}`)
        return data
    } catch (error) {
        return rejectWithValue(error.message)
    }
})

export const createBookmark = createAsyncThunk("post/postAsyncCreateBookmark", async (payload, { rejectWithValue }) => {
    try {
        const { data } = await axios.post(`http://localhost:5000/bookmarks`, payload)
        return data
    } catch (error) {
        return rejectWithValue(error.message)
    }
})

export const deleteBookmark = createAsyncThunk("delete/deleteAsyncBookmark", async (payload, { rejectWithValue }) => {
    try {
        await axios.delete(`http://localhost:5000/bookmarks/${payload}`)
        return payload
    } catch (error) {
        return rejectWithValue(error.message)
    }
})


const bookmarkSlice = createSlice({
    name: "bookmark",
    initialState: {
        isLoading: false,
        bookmarks: [],
        currentBookmark: {},
        error: null
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllBookmarks.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllBookmarks.fulfilled, (state, action) => {
                state.bookmarks = action.payload;
                state.isLoading = false;
                action.error = null
            })
            .addCase(getAllBookmarks.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.payload
                toast.error("some thing is wrong")
            })
            .addCase(getSingleBookmarks.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getSingleBookmarks.fulfilled, (state, action) => {
                state.currentBookmark = action.payload;
                state.isLoading = false;
                action.error = null
            })
            .addCase(getSingleBookmarks.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.payload
                toast.error("some thing is wrong")
            })
            .addCase(createBookmark.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createBookmark.fulfilled, (state, action) => {
                state.bookmarks.push(action.payload)
                state.currentBookmark = action.payload;
                state.isLoading = false;
                action.error = null
            })
            .addCase(createBookmark.rejected, (state, action) => {

                state.isLoading = false
                state.error = action.payload
                toast.error("some thing is wrong")
            })
            .addCase(deleteBookmark.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteBookmark.fulfilled, (state, action) => {
                console.log(action.payload)
                state.bookmarks = state.bookmarks.filter(item => item.id !== action.payload)
                // const filterBookmarks = state.bookmarks.filter(item => item.id !== action.payload)
                // state.bookmarks = filterBookmarks
                // state.isLoading = false;
                // action.error = null
            })
            .addCase(deleteBookmark.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.payload
                toast.error("some thing is wrong")
            });
    },
})


export default bookmarkSlice.reducer