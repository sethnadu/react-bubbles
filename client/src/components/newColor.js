import React, {useEffect} from "react";
import {Form, Field, withFormik} from "formik";
import { makeStyles } from '@material-ui/core/styles';
import * as Yup from 'yup';
import { axiosWithAuth } from "../Utils/axiosWithAuth";

const useStyles = makeStyles({
    Container: {
      display: "flex",
      flexDirection: "column",
      margin: "20px auto",
      width: "250px",
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
      width: "150px",
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

const AddColor = ({errors, touched, Run, status}) => {
    
    // useEffect(() => {
    //     Run()

    // }, [status])


    const classes = useStyles();
  return (
    <div className = {classes.Container}>
      <Form className = {classes.Form}>
        <h2>Add Color</h2>
        <Field className = {classes.inputText} type = "text" name = "color" placeholder ="Color" />
        {touched.color && errors.color && <p>{errors.color}</p>}
        <Field className = {classes.inputText} type = "text" name = "code" placeholder = "Code" />
       {touched.code && errors.code && <p>{errors.code}</p>}
        <button className = {classes.button} type="submit">Submit</button>
        </Form>
    </div>
  
  );
};

const FormikAddColor = withFormik({
  mapPropsToValues({color, code}){
      return {
          color: color || "",
          code: code || ""
      }
  },

  validationSchema: Yup.object().shape({
    color: Yup.string().required("Color is Required"),
    code: Yup.string().required("Code (# format) is Required"),
  }),

  handleSubmit({color, code, setStatus}) {

      const values = {color: color, code: {hex: code}}
      axiosWithAuth()
          .post("http://localhost:5000/api/colors", values)
          .then(res => {
              setStatus(res.data)
          })
          .catch(error => console.log(error))
      
  }
})(AddColor);

export default FormikAddColor;