import React from "react";
import axios from "axios";
import { withFormik, Form, Field } from "formik";
import { Link } from "react-router-dom";
import * as Yup from "yup";

const RegisterPage = ({ touched, errors, isSubmitting }) => {
  return (
    <Form className="register">
      <h5>Create Account</h5>
      <p>Use your username for registration</p>
      <Field
        className="input"
        name="fname"
        type="text"
        placeholder="First Name"
      ></Field>
      {touched.fname && errors.fname && <span>{" " + errors.fname}</span>}
      <br />
      <Field
        className="input"
        name="lname"
        type="text"
        placeholder="Last Name"
      ></Field>
      {touched.lname && errors.lname && <span>{" " + errors.lname}</span>}
      <br />
      <Field
        className="input"
        name="username"
        type="username"
        placeholder="username"
      ></Field>
      {touched.username && errors.username && <span>{" " + errors.username}</span>}
      <br />
      <Field
        className="input"
        name="password"
        type="password"
        placeholder="Password"
      ></Field>
      {touched.password && errors.password && (
        <span>{" " + errors.password}</span>
      )}
      <br />
      <button className="btn" disabled={isSubmitting}>
        SUBMIT
      </button>
      <p className="change">
        Already registered? <Link to="/">Login</Link>
      </p>
    </Form>
  );
};

const FormikRegisterPage = withFormik({
  mapPropsToValues({ username, password, fname, lname }) {
    return {
      username: username || "",
      password: password || "",
      fname: fname || "",
      lname: lname || ""
    };
  },
  validationSchema: Yup.object().shape({
    username: Yup.string()
      .required("Username is required."),
    password: Yup.string()
      .min(4)
      .required(),
    fname: Yup.string().required("First name is required."),
    lname: Yup.string().required("Last name is required.")
  }),
  handleSubmit(values, bag) {
    const newUser = {
      username: values.username,
      password: values.password
    }
    axios.post("https://quarantine-productivity.herokuapp.com/api/auth/register", newUser)
    .then(response => {
      console.log(response);
      bag.props.pushUser("/");
    })
    .catch(error => {
      console.log(error);
    })
  }
})(RegisterPage);

export default FormikRegisterPage;
