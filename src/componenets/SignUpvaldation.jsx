import * as Yup from "yup"
const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

export const SignUpValidation = Yup.object({
    firstName: Yup.string().min(3).required("please enter first name"),
    lastName: Yup.string().min(3).required("please enter your last name"),
    email: Yup.string().email("please enter valide email").required("please enter email"),
    password: Yup.string()
        .required('enter your password provided.')
        .min(8, 'Password is too short - should be 8 chars minimum.')
        .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], 'Password not matched').required("please enter your confirm password"),
    phoneNumber: Yup.string().matches(phoneRegExp, 'Phone number is not valid')
})





