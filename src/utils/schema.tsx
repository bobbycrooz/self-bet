import * as yup from "yup";

const numberRule = /^(?=.*\d)/;
const lowerCaseRule = /^(?=.*[a-z])/;
const upperCaseRule = /^(?=.*[A-Z])/;
const specialRule = /^(?=.*[A-Z])/;

// min 5 characters, 1 upper case letter, 1 lower case letter, 1 numeric digit.
// const phoneRegExp = /^(09|234)?[0-9]{15}$/;

export const validateRegisterSchema = yup.object().shape({
Email: yup.string().required("Email is required"),
Username: yup.string().required("Username is required"),

  Password: yup
    .string()
    .min(5)
    .matches(upperCaseRule, {
      message: "Password must contain UPPERCASE letter.",
    })
    .matches(lowerCaseRule, {
      message: "Password must contain an alphabet letter.",
    })
    .matches(specialRule, {
      message: "Password must contain a special character.",
    })
    .matches(numberRule, {
      message: "Password must contain a number.",
    })
    .required("Password is required."),
//   password2: yup
//     .string()
//     .required("Confirm password is required")
//     .oneOf(
//       //@ts-ignore
//       [yup.ref("password"), null],
//       "Password must match"
//     ),
});

export const validateLogingSchema = yup.object().shape({
Email: yup.string().required("Email is required"),
  Password: yup.string().required("Password is required"),
});

export const forgotPasswordSchema = yup.object().shape({
  phone: yup
    .string()
    // .matches(phoneRegExp, "Phone number is not valid")
    .required("Phone number is required."),
  otp: yup.string(),
});

export const resetPasswordSchema = yup.object().shape({
  password: yup
    .string()
    .min(5)
    .matches(upperCaseRule, {
      message: "Password must contain UPPERCASE letter.",
    })
    .matches(lowerCaseRule, {
      message: "Password must contain an alphabet letter.",
    })
    .matches(specialRule, {
      message: "Password must contain a special character.",
    })
    .matches(numberRule, {
      message: "Password must contain a number.",
    })
    .required("Password is required."),
  password2: yup
    .string()
    .required("Confirm password is required")
    .oneOf(
      //@ts-ignore
      [yup.ref("password"), null],
      "Password must match"
    ),
});

export const BookAppointmentSchema = yup.object().shape({
  patientNotes: yup.string().required("Notes is required"),
});
