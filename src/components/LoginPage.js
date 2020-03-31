import React from "react";
import { withFormik, Form, Field } from "formik";
import { Link } from "react-router-dom";
import * as Yup from "yup";

const LoginPage = ({ errors, touched, isSubmitting }) => {
  return (
    <Form className="login">
      <h5 className="loginTitle">Log in</h5>
      <Field
        className="input"
        name="email"
        type="email"
        placeholder="Email"
      ></Field>
      {touched.email && errors.email && <span>{" " + errors.email}</span>}
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
      <button className="loginBtn" disabled={isSubmitting}>
        SUBMIT
      </button>
      <p className="change">
        Need an account? <Link to="/register">Register</Link>
      </p>
    </Form>
  );
};

const FormikLoginPage = withFormik({
  mapPropsToValues({ email, password }) {
    return {
      email: email || "",
      password: password || ""
    };
  },
  validationSchema: Yup.object().shape({
    email: Yup.string()
      .email("Email is not valid.")
      .required("Email is required."),
    password: Yup.string()
      .min(4)
      .required()
  }),
  handleSubmit(values, { resetForm, setErrors, setSubmitting }) {
    setTimeout(() => {
      if (values.email === "test@gmail.com") {
        setErrors({ email: "That email is already taken" });
      } else {
        resetForm();
      }
      setSubmitting(false);
    }, 1000);
  }
})(LoginPage);

export default FormikLoginPage;
