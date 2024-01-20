import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logIn } from '../../features/Authentication/authSlice'
import { useNavigate } from 'react-router-dom'

function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { isAuthenticated } = useSelector(state => state.auth)

    const handleSubmit = (e) => {
        e.preventDefault()

        const login = {
            name,
            email,
            password
        }

        dispatch(logIn(login))
    }

    useEffect(() => {
        if (isAuthenticated === true) {
            navigate("/", { replace: true })
        }
    }, [isAuthenticated])

    return (
        <div className='my-8 mx-auto w-[25rem] p-4 rounded-2xl border border-solid -border--text-300'>
            <h2 className='font-semibold mb-3 text-xl'>Login</h2>
            <form onSubmit={handleSubmit} action="">
                <div className='mb-4 relative'>
                    <label className='block mb-1 font-semibold' htmlFor="name">Name</label>
                    <input value={name} onChange={(e) => setName(e.target.value)} className='p-2 rounded-lg border border-solid -border--text-300 w-full' type="text" id='name' name='name' />
                </div>
                <div className='mb-4 relative'>
                    <label className='block mb-1 font-semibold' htmlFor="email">Email</label>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} className='p-2 rounded-lg border border-solid -border--text-300 w-full' type="email" id='email' name='email' />
                </div>
                <div className='mb-4 relative'>
                    <label className='mb-1 block font-semibold' htmlFor="password">Password</label>
                    <input value={password} onChange={(e) => setPassword(e.target.value)} className='p-2 rounded-lg border border-solid -border--text-300 w-full' type="password" id='password' name='password' />
                </div>
                <div className='w-full'>
                    <button type='submit' className='w-full py-1 bg-blue-800 text-white rounded-md'>Login</button>
                </div>
            </form>
        </div>
    )
}

export default Login