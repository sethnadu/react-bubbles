import React from "react";
import {withRouter} from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import axios from "axios";
import {Form, Field, withFormik} from "formik";
import * as Yup from 'yup';

const useStyles = makeStyles({
    Container: {
      display: "flex",
      flexDirection: "column",
      margin: "auto",
      width: "500px",
      textAlign: "center",
      backgroundColor: "#fff",
      border: 0,
      boxShadow:`0 -1px 0 #e0e0e0, 0 0 2px rgba(0, 0, 0, 0.12),
               0 2px 4px rgba(0, 0, 0, 0.24)`,
    },
    Form: {
      display: "flex",
      flexDirection: "column",
      margin: "10px auto",
      alignContent: "center",
    },
    inputText: {
      width: "200px",
      margin: "10px",
      padding: "5px 10px",
      backgroundColor: "#f2f2f2"
    },

    button: {
      border: "1px solid grey",
      padding: "5px 10px",
      backgroundColor: "lightgray",
      width: "120px",
      margin: "10px auto 20px auto"
    }

})

const Login = ({errors, touched}) => {
  const classes = useStyles();
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  return (
    <div className = {classes.Container}>
      <Form className = {classes.Form}>
        <h2>Login</h2>
        <Field className = {classes.inputText} type = "text" name = "username" placeholder ="Username" />
        {touched.username && errors.username && <p>{errors.username}</p>}
        <Field className = {classes.inputText}  type = "password" name = "password" placeholder = "Password" />
        {touched.password && errors.password && <p>{errors.password}</p>}
        <button className = {classes.button} type="submit">Submit</button>
        </Form>
    </div>
  
  );
};

const FormikLogin = withFormik({
  mapPropsToValues({username, password}){
      return {
          username: username || "",
          password: password || ""
      }
  },

  validationSchema: Yup.object().shape({
      username: Yup.string().required("Username is Required"),
      password: Yup.string().required("Password is Required"),
  }),

  handleSubmit(values,{setStatus, props}) {
      const {history} = props;
      axios
          .post("http://localhost:5000/api/login", values)
          .then(res => {
              localStorage.setItem("token", res.data.payload)
              setStatus(res.data)
              console.log(res.data)
              history.push("/colors")
              
          }, {...props})
          .catch(error => console.log(error))
      
  }
})(Login);

const FormikwithRouter = withRouter(FormikLogin)

export default FormikwithRouter;

