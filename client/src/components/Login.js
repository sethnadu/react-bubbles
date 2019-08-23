import React from "react";
import {withRouter} from "react-router-dom";
import axios from "axios";
import {Form, Field, withFormik} from "formik";
import * as Yup from 'yup';

const Login = ({errors, touched}) => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  return (
    <>
      <Form>
        <h2>Login</h2>
        <Field type = "text" name = "username" placeholder ="Username" />
        {touched.username && errors.username && <p>{errors.username}</p>}
        <Field type = "password" name = "password" placeholder = "Password" />
        {touched.password && errors.password && <p>{errors.password}</p>}
        <button type="submit">Submit</button>
        </Form>
    </>
  
  );
};

