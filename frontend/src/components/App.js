import React from 'react';
import {Formik, Form, Field} from "formik";
import loginClient from "../api/loginClient";

const App = () => {
  return (
    <div style={{padding: "20px"}}>
      <h1>Login</h1>
      <Formik initialValues={{username: "", password: ""}} onSubmit={(values, {setSubmitting}) => {
        loginClient.post("login/", values).then((response) => {
          localStorage.setItem("access", response.data.access)
          localStorage.setItem("refresh", response.data.refresh)
          window.location.reload() // I reload the page so the axios client.js can load the tokens from local storage
          // After this you can make any authenticated request to the django server using client.get(), client.post() etc...
        }).catch((error) => {
          console.log(error.response.data)
          alert(error.response.data.detail)
          setSubmitting(false)
        })
      }}>
        {({isSubmitting}) => (
          <Form>
            <Field name="username" placeholder="Username"/>
            <Field name="password" placeholder="Password" type="password"/>
            <button type="submit" disabled={isSubmitting}>Login</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default App;
