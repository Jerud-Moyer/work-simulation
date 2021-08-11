import React from "react";
import { Redirect } from "react-router-dom";
import { connect, useDispatch, useSelector } from "react-redux";
import {
  Grid,
  Box,
  makeStyles,
} from "@material-ui/core";
import { login } from "../../store/utils/thunkCreators";
import AuthGraphic from "./AuthGraphic";
import Nav from "./Nav";
import AuthForm from "./AuthForm";
import { selectUser } from "../../store/utils/selectors";


const useStyles = makeStyles((theme) => ({
  outerBox: theme.authPage.outerBox,
  formBox: theme.authPage.formBox
}))

const Login = (props) => {
  const classes = useStyles();
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const handleLogin = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;

    await dispatch(login({ username, password }));
  };

  if (user.id) {
    return <Redirect to="/home" />;
  }

  return (
    <Grid 
      container
      justify="center" 
      className={classes.outerBox}
    >
      <AuthGraphic />
      <Box container item className={classes.formBox}>
        <Nav 
          message="Don't have an account?"
          destinationPath="/register"
        />
        <AuthForm
          authType="login"
          handleSubmit={handleLogin}
        />
      </Box>
    </Grid>
  );
};

export default Login;
