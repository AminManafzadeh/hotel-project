import React, { useRef } from 'react'
import { MdLocationOn } from 'react-icons/md'
import { HiCalculator, HiMinus, HiPlus } from 'react-icons/hi'
import { HiSearch } from 'react-icons/hi'
import { useState } from 'react'
import UseOutsideClick from '../../Hooks/useOutsideClick'
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRange } from 'react-date-range';
import { format } from 'date-fns'
import { NavLink, createSearchParams, useNavigate, useSearchParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { FaRegUser } from "react-icons/fa";
import { logout } from '../../features/Authentication/authSlice'
import { IoIosLogOut } from "react-icons/io";

function Header() {
    const [searchParams] = useSearchParams()
    const [destination, setDestination] = useState(searchParams.get("destination") || "")
    const [openOptions, setOpenOptions] = useState(false)
    const [options, setOptions] = useState({ adult: 1, children: 0, room: 1 })
    const [date, setDate] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection',
        }
    ])
    const [openDate, setOpenDate] = useState(false)
    const navigate = useNavigate()
    const { user, isAuthenticated } = useSelector(state => state.auth)
    const dispatch = useDispatch()
    console.log(user)



    const handleOptions = (name, operation) => {
        setOptions((option) => {
            return {
                ...option,
                [name]: operation === "inc" ? options[name] + 1 : options[name] - 1
            }
        })
    }

    const handleSearch = () => {
        const encodedParams = createSearchParams({
            date: JSON.stringify(date),
            destination,
            options: JSON.stringify(options)
        })

        navigate({
            pathname: "/hotels",
            search: encodedParams.toString()
        })
    }

    const handleLogOut = () => {
        localStorage.clear()
        dispatch(logout(user))
        navigate("/")
    }

    return (
        <div className="flex justify-center items-center gap-4 w-full -bg--white">
            <NavLink to="/">HOME</NavLink>
            <NavLink to="/bookmarks">BOOKMARKS</NavLink>
            <div className="flex justify-between items-center rounded-3xl p-4 gap-4 w-full max-w-[900px] border-solid border border-[#ebe9e9]">
                <div className="flex items-center relative">
                    <MdLocationOn className="w-6 h-6 -text--rose-500" />
                    <input
                        value={destination}
                        onChange={(e) => setDestination(e.target.value)}
                        className='py-[0.7rem] px-[0.5rem]'
                        type="text"
                        id='destination'
                        name="destination"
                        placeholder='Where to go ?' />
                    <span className='w-[1px] h-[30px] inline-block mx-4 -bg--text-400'></span>
                </div>
                <div className="flex items-center relative">
                    <HiCalculator className="w-6 h-6 -text--primary-700" />
                    <div onClick={() => setOpenDate(!openDate)} className="ml-[0.5rem] text-[0.8rem]">{`${format(date[0].startDate, "dd-MM-yyyy")} to 
                    ${format(date[0].endDate, "dd-MM-yyyy")}`}</div>
                    {openDate && <DateRange onChange={item => setDate([item.selection])}
                        ranges={date}
                        className='absolute top-[50px] -left-[5rem] z-50'
                        minDate={new Date()}
                        moveRangeOnFirstSelection={true}
                    />}
                    <span className='w-[1px] h-[30px] inline-block mx-4 -bg--text-400'></span>
                </div>
                <div className="flex items-center relative">
                    <div onClick={() => setOpenOptions(!openOptions)}
                        id="optionDropDown">{options.adult} adult &bull; {options.children} children &bull; {options.room} room</div>
                    {openOptions && <GuestOptionList options={options} setOpenOptions={setOpenOptions} handleOptions={handleOptions} />}
                    <span className='w-[1px] h-[30px] inline-block mx-4 -bg--text-400'></span>
                </div>
                <div className="flex items-center relative">
                    <button className='flex items-center justify-center rounded-2xl p-[0.6rem] -text--white -bg--primary-600' onClick={handleSearch}>
                        <HiSearch className="w-5 h-5 inline-block" />
                    </button>
                </div>
            </div>
            <NavLink to="/login" className={isAuthenticated ? "hidden" : "block"}>LOGIN</NavLink>
            <div onClick={handleLogOut} className={`flex items-center ${isAuthenticated ? "block" : "hidden"}`}> <span>{user.name}</span> <span><IoIosLogOut className='ml-2 cursor-pointer' /></span></div>
            <NavLink to="/register">REGISTER</NavLink>
        </div>
    )
}

export default Header


const GuestOptionList = ({ options, handleOptions, setOpenOptions }) => {
    const optionRef = useRef()
    UseOutsideClick(optionRef, "optionDropDown", () => setOpenOptions(false))
    return (
        <div className='z-50 p-4 w-[220px] space-y-2 -bg--white rounded-2xl shadow border border-solid -border--text-100 absolute top-8 left-0'
            ref={optionRef}>
            <OptionItem handleOptions={handleOptions} options={options} type="adult" minLimit={1} />
            <OptionItem handleOptions={handleOptions} options={options} type="children" minLimit={0} />
            <OptionItem handleOptions={handleOptions} options={options} type="room" minLimit={1} />
        </div>
    );
}

const OptionItem = ({ type, minLimit, options, handleOptions }) => {

    return (
        <div className="flex items-center justify-between gap-4">
            <span className="inline-block flex-1 text-[0.9rem] font-semibold">{type}</span>
            <div className="flex items-center gap-4">
                <button className="p-2 rounded-lg -text--primary-600 -bg--primary-100"
                    onClick={() => handleOptions(type, "dec")}
                    disabled={options[type] <= minLimit}
                >
                    <HiMinus />
                </button>
                <span>{options[type]}</span>
                <button className="p-2 rounded-lg -text--primary-600 -bg--primary-100"
                    onClick={() => handleOptions(type, "inc")}
                >
                    <HiPlus />
                </button>
            </div>
        </div>
    )
}
