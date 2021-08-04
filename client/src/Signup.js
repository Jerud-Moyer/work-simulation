import React, { useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import {
  Grid,
  Box,
  Typography,
  Button,
  FormControl,
  TextField,
  FormHelperText,
  withStyles,
  makeStyles,
} from "@material-ui/core";
import { register } from "./store/utils/thunkCreators";
import AuthGraphic from "./AuthGraphic";
import { clearSearchedUsers } from "./store/conversations";

const CssTextField = withStyles((theme) => ({
  root: {
    fullWidth: true,
    '& label': {
      top: -26,
      color: "#B0B0B0",
      fontSize: 22,
      fontWeight: 'bold',
    },
    '& label.Mui-focused': {
      color: "#B0B0B0",
    },
    '& MuiInput-underline:after': {
      borderBottomColor: '#3A8DFF',
      borderBottomWeight: 10
    },
  }
}))(TextField);

const useStyles = makeStyles((theme) => ({
  outerBox: {
    display: "flex",
    flexDirection: "row",
    width: "100vw",
    justifyContent: "center"
  },
  formBox: {
    display: "flex",
    flexDirection: "column",
    width: "58%",
    height: "100vh",
    justifyContent: "center",
    alignItems: "center"
  },
}))

const Login = (props) => {
  const classes = useStyles();
  const history = useHistory();
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
        <Grid container item>
          <Typography>Need to log in?</Typography>
          <Button onClick={() => history.push("/login")}>Login</Button>
        </Grid>
        <form onSubmit={handleRegister}>
          <Grid>
            <Grid>
              <FormControl>
                <CssTextField
                  aria-label="username"
                  label="Username"
                  name="username"
                  type="text"
                  required
                />
              </FormControl>
            </Grid>
            <Grid>
              <FormControl>
                <CssTextField
                  label="E-mail address"
                  aria-label="e-mail address"
                  type="email"
                  name="email"
                  required
                />
              </FormControl>
            </Grid>
            <Grid>
              <FormControl error={!!formErrorMessage.confirmPassword}>
                <CssTextField
                  aria-label="password"
                  label="Password"
                  type="password"
                  inputProps={{ minLength: 6 }}
                  name="password"
                  required
                />
                <FormHelperText>
                  {formErrorMessage.confirmPassword}
                </FormHelperText>
              </FormControl>
            </Grid>
            <Grid>
              <FormControl error={!!formErrorMessage.confirmPassword}>
                <TextField
                  label="Confirm Password"
                  aria-label="confirm password"
                  type="password"
                  inputProps={{ minLength: 6 }}
                  name="confirmPassword"
                  required
                />
                <FormHelperText>
                  {formErrorMessage.confirmPassword}
                </FormHelperText>
              </FormControl>
            </Grid>
            <Button type="submit" variant="contained" size="large">
              Create
            </Button>
          </Grid>
        </form>
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
