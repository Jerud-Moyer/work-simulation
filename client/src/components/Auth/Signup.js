import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import {
  Grid,
  Box,
  makeStyles,
} from "@material-ui/core";
import { register } from "../../store/utils/thunkCreators";
import AuthGraphic from "./AuthGraphic";
import Nav from "./Nav";
import AuthForm from "./AuthForm";

const useStyles = makeStyles((theme) => ({
  outerBox: {
    display: "flex",
    flexDirection: "row",
    width: "100vw",
    justifyContent: "center",
    
  },
  formBox: theme.authPage.formBox
}))

const Login = (props) => {
  const classes = useStyles();
  const { user, register } = props;
  const [formErrorMessage, setFormErrorMessage] = useState({});

  const handleRegister = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const email = event.target.email.value;
    const password = event.target.password.value;
    const confirmPassword = event.target.confirmPassword.value;

    if (password !== confirmPassword) {
      setFormErrorMessage({ confirmPassword: "Passwords must match" });
      return;
    }

    await register({ username, email, password });
  };

  if (user.id) {
    return <Redirect to="/home" />;
  }

  return (
    <Grid 
      container 
      justify={'center'}
      className={classes.outerBox}
    >
      <AuthGraphic />
      <Box className={classes.formBox} >
        <Nav
          message="Already have an account?"
          destinationPath="/login"
          forSignUp
        />
        <AuthForm
          authType="signup"
          handleSubmit={handleRegister}
          formErrorMessage={formErrorMessage}
        />
      </Box>
    </Grid>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    register: (credentials) => {
      dispatch(register(credentials));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
