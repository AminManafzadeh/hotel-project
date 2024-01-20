import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";



export const registerAsync = createAsyncThunk(
    "regester/registerAsync",
    async (payload, { rejectWithValue }) => {
        try {
            const { data } = await axios.post(
                "http://localhost:5000/register",
                { ...payload }
            );
            console.log(data);
            return data
        } catch (error) {
            console.log(error);
            console.log(error.message);
            return rejectWithValue(error.message);
        }
    }
);


export const logIn = createAsyncThunk("login/loginAsync", async (payload, { rejectWithValue }) => {
    try {
        const { data } = await axios.post("http://localhost:5000/login", payload)
        return data
    } catch (error) {
        return rejectWithValue(error.message)
    }
})

const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: {
            email: "",
            password: ""
        },
        isAuthenticated: false
    },
    reducers: {
        logout: (state, action) => {
            state.isAuthenticated = false;
            state.user = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerAsync.fulfilled, (state, action) => {
                state.isAuthenticated = true
                toast.success("you are success to signup")
            })
            .addCase(registerAsync.rejected, (state, action) => {
                state.isAuthenticated = false
                toast.error("some thing are wrong!!")
            })
            .addCase(logIn.fulfilled, (state, action) => {
                state.isAuthenticated = true
                state.user = action.payload
                toast.success("user logged in successfully")
                localStorage.setItem("user", JSON.stringify(action.payload))
            })
            .addCase(logIn.rejected, (state, action) => {
                state.isAuthenticated = false
                toast.error("email or password is uncorrect")
            })
    },
})

export default authSlice.reducer

export const { logout } = authSlice.actions