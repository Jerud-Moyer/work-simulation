import React from "react";
import { Redirect, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import {
  Grid,
  Box,
  Typography,
  Button,
  TextField,
  makeStyles,
  InputAdornment,
  withStyles,
} from "@material-ui/core";
import { login } from "./store/utils/thunkCreators";
import AuthGraphic from "./AuthGraphic";

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

const BigButton = withStyles((theme) => ({
  root: {
    width: 185,
    height: 65,
    marginTop: 20,
    fontSize: 18,
    fontWeight: 'bolder',
    
  },
}))(Button);

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
  nav: {
    position: "absolute",
    top: "5%",
    left: "61%",
    width: "35%",
    alignItems: "center",
    justifyContent: "space-between"
  },
  navText: {
    color: "#B0B0B0",
    fontWeight: 'bold',
  },
  create: {
    fontWeight: 'bold',
    fontSize: 16,
    color: "#3A8DFF",
    border: "none",
    boxShadow: "0 0 2px 4px rgba(0, 0, 0, .05)",
    height: 60,
    padding: 20,
    width: 200
  },
  formOuter: {
    width: "90%",
    alignSelf: "center",
    marginBottom: 60,
  },
  formInner: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  welcome: {
    fontSize: 32,
    fontWeight: 600,
    marginBottom: 50,
    textAlign: "left",
    width: "100%"
  },
  inputField: {
    width: 500,
    marginBottom: 50,
    marginTop: 18,
  },
  link: {
    textDecoration: "none",
    fontSize: 13,
    color: "#3A8DFF",
    fontWeight: "bold"
  },
  submitButton: {
    boxShadow: "none",
    padding: 30,
    height: 200
  },
}))

const Login = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const { user, login } = props;

  const handleLogin = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;

    await login({ username, password });
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
        <Grid container item className={classes.nav} >
          <Typography className={classes.navText} >Don't have an account?</Typography>
          <Button 
            onClick={() => history.push("/register")}
            type="submit" variant="outlined" size="large"
            className={classes.create}
          >Create account
          </Button>
        </Grid>
        <form className={[classes.formOuter, classes.root]} onSubmit={handleLogin}>
            <Grid container item className={classes.formInner}>
              <Typography className={classes.welcome}>Welcome back!</Typography>
                <CssTextField
                  className={classes.inputField}
                  aria-label="username"
                  label="Username"
                  name="username"
                  type="text"
                />
            
              
                <CssTextField
                  className={classes.inputField}
                  aria-label="password"
                  label="Password"
                  name="password"
                  type="password"
                  InputProps={{
                    endAdornment: 
                    <InputAdornment position={'end'}>
                        <a 
                          className={classes.link}
                          href={'/help'} 
                          alt={'help Link'}
                          >
                          Forgot?
                        </a>
                    </InputAdornment>
                  }}
                  />
             
          
              <Grid>
                <BigButton
                  className="submitButton" 
                  type="submit" 
                  variant="contained" 
                  size="large"
                  color="primary"
                  disableElevation
                >
                    Login
                </BigButton>
              </Grid>
            
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
    login: (credentials) => {
      dispatch(login(credentials));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
