import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";



export const getHotels = createAsyncThunk("get/getAsyncHotels", async (_, { rejectWithValue }) => {
    try {
        const { data } = await axios.get("http://localhost:5000/hotels")
        return data
    } catch (error) {
        return rejectWithValue(error.message)
    }
})



export const getAllHotels = createAsyncThunk("get/getAsyncAllHotels", async (payload, { rejectWithValue }) => {
    try {
        const destination = payload.destination
        const room = payload.room
        const { data } = await axios.get(`http://localhost:5000/hotels?q=${destination || ""}&accommodates_gte=${room || ""}`)
        console.log(data)
        return data
    } catch (error) {
        return rejectWithValue(error.message)
    }
})

export const getSingleHotel = createAsyncThunk("get/getSingleHotel", async (payload, { rejectWithValue }) => {
    try {

        const { data } = await axios.get(`http://localhost:5000/hotels/${payload}`)
        return data
    } catch (error) {
        return rejectWithValue(error.message)
    }
})


const hotelSlice = createSlice({
    name: "hotel",
    initialState: {
        hotels: [],
        isLoading: false,
        currentHotel: {},
        error: null
    },
    extraReducers: (builder) => {
        builder
            .addCase(getHotels.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getHotels.fulfilled, (state, action) => {
                state.hotels = action.payload
                state.isLoading = false
                state.error = null
            })
            .addCase(getHotels.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.payload
                toast.error("some thing is wrong")
            })
            .addCase(getAllHotels.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllHotels.fulfilled, (state, action) => {
                state.hotels = action.payload
                state.isLoading = false
                state.error = null
            })
            .addCase(getAllHotels.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.payload
                toast.error("some thing is wrong")
            })
            .addCase(getSingleHotel.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getSingleHotel.fulfilled, (state, action) => {
                state.currentHotel = action.payload
                state.isLoading = false
                state.error = null
            })
            .addCase(getSingleHotel.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.payload
                toast.error("some thing is wrong")
            })
    }
})

export default hotelSlice.reducer