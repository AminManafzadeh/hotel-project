
import "./App.css";
import { Toaster } from "react-hot-toast";
import LocationList from "./componenets/LocationList/LocationList";
import { Route, Routes } from "react-router-dom";
import Hotels from "./componenets/Hotels/Hotels";
import HotelProvider from "./componenets/context/HotelProvider";
import Layout from "./Layout/Layout";
import SingleHotel from "./componenets/SingleHotel/SingleHotel";
import AppLayout from "./componenets/AppLayout/AppLayout";
import BookmarkLayout from "./componenets/BookmarkLayout/BookmarkLayout";
import BookmarkProvider from "./componenets/context/BookmarkProvider";
import Bookmark from "./componenets/Bookmark/Bookmark";
import SingleBookmark from "./componenets/SingleBookmark/SingleBookmark";
import AddNewBookmark from "./componenets/AddNewBookmark/AddNewBookmark";
import Login from "./componenets/Login/Login";
import Register from "./componenets/Register/Register";
import ProtectedRoute from "./componenets/ProtectedRoute/ProtectedRoute";


function App() {
  return <>
    <Toaster />
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<LocationList />} />
        <Route path="/hotels" element={<ProtectedRoute><AppLayout /></ProtectedRoute>}>
          <Route index element={<Hotels />} />
          <Route path="/hotels/:id" element={<SingleHotel />} />
        </Route>
        <Route path="/bookmarks" element={<ProtectedRoute><BookmarkLayout /></ProtectedRoute>} >
          <Route index element={<Bookmark />} />
          <Route path="/bookmarks/:id" element={<SingleBookmark />} />
          <Route path="/bookmarks/add" element={<AddNewBookmark />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>
    </Routes>
  </>
}

export default App;

