import React from "react";
import { withFormik, Form, Field } from "formik";
import { Button } from "reactstrap";
import { Link } from "react-router-dom";
import * as Yup from "yup";

const RegisterPage = ({ touched, errors, isSubmitting }) => {
  return (
    <Form>
      <h5>Register</h5>
      <Field name="fname" type="text" placeholder="First Name"></Field>
      {touched.fname && errors.fname && <span>{" " + errors.fname}</span>}
      <br />
      <Field name="lname" type="text" placeholder="Last Name"></Field>
      {touched.lname && errors.lname && <span>{" " + errors.lname}</span>}
      <br />
      <Field name="email" type="email" placeholder="Email"></Field>
      {touched.email && errors.email && <span>{" " + errors.email}</span>}
      <br />
      <Field name="password" type="password" placeholder="Password"></Field>
      {touched.password && errors.password && (
        <span>{" " + errors.password}</span>
      )}
      <br />
      <Button color="info" size="sm" disabled={isSubmitting}>
        Submit
      </Button>
      <p>
        Already registered? <Link to="/">Login</Link>
      </p>
    </Form>
  );
};

const FormikRegisterPage = withFormik({
  mapPropsToValues({ email, password, fname, lname }) {
    return {
      email: email || "",
      password: password || "",
      fname: fname || "",
      lname: lname || ""
    };
  },
  validationSchema: Yup.object().shape({
    email: Yup.string()
      .email("Email is not valid.")
      .required("Email is required."),
    password: Yup.string()
      .min(4)
      .required(),
    fname: Yup.string().required("First name is required."),
    lname: Yup.string().required("Last name is required.")
  }),
  handleSubmit(values,{resetForm, setErrors, setSubmitting}) {
    setTimeout(() => {
        if(values.email === 'test@gmail.com') {
          setErrors({ email: 'That email is already taken' })
        } else {
          resetForm()
        }
        setSubmitting(false)
      }, 1000)
  }
})(RegisterPage);

export default FormikRegisterPage;
