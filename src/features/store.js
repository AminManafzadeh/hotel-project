import { configureStore } from "@reduxjs/toolkit";
import bookmarkReducer from "./Bookmark/bookmarkSlice";
import hotelReducer from "./Hotel/hotelSlice";
import authReducer from "./Authentication/authSlice";

const store = configureStore({
  reducer: {
    bookmark: bookmarkReducer,
    hotel: hotelReducer,
    auth: authReducer,
  },
});

export default store;
