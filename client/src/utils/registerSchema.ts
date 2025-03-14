import * as yup from "yup";


// user register
export const userRegisterSchema = yup.object().shape({
          firstName: yup.string().required("First name is required"),
          lastName: yup.string().required("Last name is required"),
          email: yup.string().email("Invalid email").required("Email is required"),
          registration: yup.string().required("Registration is required"),
          course: yup.string().required("Course is required"),
          year: yup.string().required("Year is required"),
          password: yup.string().min(8, "Must be 8 chars").required("Password required"),
          passwordConfirm: yup.string().oneOf([yup.ref("password")], "Passwords must match").required("Required"),
          phoneNumber: yup.string().required("Phone number is required"),
})