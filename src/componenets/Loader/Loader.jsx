import React from 'react'
import { BiLoader } from "react-icons/bi";

function Loader() {
    return (
        <div className='flex items-center gap-4 my-4 mx-auto'>
            <p>Loading Data ...</p>
            <BiLoader style={{ width: "1.3rem" }} />
        </div>
    )
}

export default Loader