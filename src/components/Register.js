import React from "react";
import { withFormik, Form, Field } from "formik";
import { Button } from "reactstrap";
import { Link } from "react-router-dom";

const RegisterPage = () => {
  return (
    <Form>
      <h5>Register</h5>
      <Field name="name" type="text" placeholder="First Name"></Field>
      <br />
      <Field name="name" type="text" placeholder="Last Name"></Field>
      <br />
      <Field name="email" type="email" placeholder="Email"></Field>
      <br />
      <Field name="password" type="password" placeholder="Password"></Field>
      <br />
      <Button color="info" size="sm">
        Submit
      </Button>
      <p>
        Already registered? <Link to="/">Login</Link>
      </p>
    </Form>
  );
};

const FormikRegisterPage = withFormik({})(RegisterPage);

export default FormikRegisterPage;
