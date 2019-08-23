import React from "react";
import {Form, Field, withFormik} from "formik";
import * as Yup from 'yup';
import { axiosWithAuth } from "../Utils/axiosWithAuth";

const AddColor = ({errors, touched}) => {

  return (
    <>
      <Form>
        <h2>Add Color</h2>
        <Field type = "text" name = "color" placeholder ="Color" />
        {touched.code && errors.code && <p>{errors.code}</p>}
        <Field type = "text" name = "code" placeholder = "Code" />
        {touched.color && errors.color && <p>{errors.color}</p>}
        <button type="submit">Submit</button>
        </Form>
    </>
  
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
    code: Yup.string().required("Code is Required"),
  }),

  handleSubmit({color, code}) {

      const values = {color: color, code: {hex: code}}
      axiosWithAuth()
          .post("http://localhost:5000/api/colors", values)
          .then(res => {
              console.log(res.data)
          })
          .catch(error => console.log(error))
      
  }
})(AddColor);

export default FormikAddColor;