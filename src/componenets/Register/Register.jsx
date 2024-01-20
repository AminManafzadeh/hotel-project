import { useFormik } from 'formik'
import React from 'react'
import { SignUpValidation } from '../SignUpvaldation'
import { useDispatch, useSelector } from 'react-redux'
import { registerAsync } from '../../features/Authentication/authSlice'
import { useNavigate } from 'react-router-dom'

const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: ""
}


function Register() {
    // const [inputValues, setInputValues] = useState({
    //     firstName: "",
    //     lastName: "",
    //     email: "",
    //     password: "",
    //     confirmPassword: "",
    //     phoneNumber: ""
    // })
    const { isAuthenticated } = useSelector(state => state.auth)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { values, handleBlur, handleSubmit, handleChange, errors } = useFormik({
        initialValues,
        validationSchema: SignUpValidation,
        onSubmit: (values) => {
            let body = values
            delete body["confirmPassword"]
            console.log(body)

            dispatch(registerAsync(body))
            if (isAuthenticated === true) {
                navigate("/")
            }
        }
    })





    return (
        <div className='my-8 mx-auto w-[30rem] p-4 rounded-2xl border border-solid -border--text-300 '>
            <h2 className='font-semibold mb-3 text-xl text-center'>REGISTER</h2>
            <form onSubmit={handleSubmit} action="">
                <div className='mb-4 relative'>
                    <label className='block mb-1 font-semibold' name="firstName" htmlFor="firstName">firstName</label>
                    <input onBlur={handleBlur} onChange={handleChange} value={values.firstName}
                        className='p-2 rounded-lg border border-solid -border--text-300 w-full' type="text" id='firstName' name='firstName' />
                    <div className='text-red-600'>{errors.firstName && <span>{errors.firstName}</span>}</div>
                </div>
                <div className='mb-4 relative'>
                    <label className='block mb-1 font-semibold' name="lastName" htmlFor="lastName">lastName</label>
                    <input onBlur={handleBlur} onChange={handleChange} value={values.lastName} className='p-2 rounded-lg border border-solid -border--text-300 w-full' type="text" id='lastName' name='lastName' />
                    <div className='text-red-600'>{errors.lastName && <span>{errors.lastName}</span>}</div>
                </div>
                <div className='mb-4 relative'>
                    <label className='block mb-1 font-semibold' name="email" htmlFor="email">email</label>
                    <input onBlur={handleBlur} onChange={handleChange} value={values.email} className='p-2 rounded-lg border border-solid -border--text-300 w-full' type="email" id='email' name='email' />
                    <div className='text-red-600'>{errors.email && <span>{errors.email}</span>}</div>
                </div>
                <div className='mb-4 relative'>
                    <label className='block mb-1 font-semibold' name="password" htmlFor="password">password</label>
                    <input onBlur={handleBlur} onChange={handleChange} value={values.password} className='p-2 rounded-lg border border-solid -border--text-300 w-full' type="password" id='password' name='password' />
                    <div className='text-red-600'>{errors.password && <span>{errors.password}</span>}</div>
                </div>
                <div className='mb-4 relative'>
                    <label className='block mb-1 font-semibold' name="confirmPassword" htmlFor="confirmPassword">confirmPassword</label>
                    <input onBlur={handleBlur} onChange={handleChange} value={values.confirmPassword} className='p-2 rounded-lg border border-solid -border--text-300 w-full' type="password" id='confirmPassword' name='confirmPassword' />
                    <div className='text-red-600'>{errors.confirmPassword && <span>{errors.confirmPassword}</span>}</div>
                </div>
                <div className='mb-4 relative'>
                    <label className='block mb-1 font-semibold' name="phoneNumber" htmlFor="phoneNumber">phoneNumber</label>
                    <input onBlur={handleBlur} onChange={handleChange} value={values.phoneNumber} className='p-2 rounded-lg border border-solid -border--text-300 w-full' type="number" id='phoneNumber' name='phoneNumber' />
                    <div className='text-red-600'>{errors.phoneNumber && <span>{errors.phoneNumber}</span>}</div>
                </div>
                <div className='w-full'>
                    <button type='submit' className='w-full py-1 bg-blue-800 text-white rounded-md'>REGISTER</button>
                </div>
            </form>
        </div>
    )
}

export default Register