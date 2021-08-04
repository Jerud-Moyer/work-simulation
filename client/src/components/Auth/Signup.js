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
import { register } from "../../store/utils/thunkCreators";
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
    top: "4%",
    left: "60%",
    width: "36%",
    alignItems: "center",
    justifyContent: "space-between",
    [theme.breakpoints.down('sm')]: {
      top: "2%"
    }
  },
  navText: {
    color: "#B0B0B0",
    fontWeight: 'bold',
    [theme.breakpoints.down('md')]: {
      marginBottom: 15
    }
  },
  create: {
    fontWeight: 900,
    fontSize: 16,
    color: "#3A8DFF",
    border: "none",
    boxShadow: "0 0 4px 6px rgba(0, 0, 0, .05)",
    height: 60,
    padding: 20,
    width: 200
  },
  formOuter: {
    width: "90%",
    alignSelf: "center",
  },
  formInner: {
    marginTop: 70,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  welcome: {
    fontSize: 32,
    fontWeight: 900,
    marginBottom: 30,
    textAlign: "left",
    width: "100%",
    [theme.breakpoints.down('sm')]: {
      fontSize: 24,
      marginBottom: 20,
    }
  },
  inputField: {
    width: 500,
    marginBottom: 30,
    marginTop: 18,
    [theme.breakpoints.down('sm')]: {
      width: 200,
      marginBottom: 20
    }
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
        <Grid container item className={classes.nav}>
          <Typography className={classes.navText} >
            Already have an account?
          </Typography>
          <Button 
            onClick={() => history.push("/login")}
            type="submit"   
            variant="outlined" 
            size="large"
            className={classes.create}w
          >
            Login
          </Button>
        </Grid>
        <form 
          className={[classes.formOuter, classes.root]} 
          onSubmit={handleRegister}
        >
          <Grid container item className={classes.formInner}>
            <Typography className={classes.welcome}>
              Create an account.
            </Typography>
            <Grid>
              <FormControl>
                <CssTextField
                  className={classes.inputField}
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
                  className={classes.inputField}
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
                  className={classes.inputField}
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
                <CssTextField
                  className={classes.inputField}
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
            <BigButton 
              type="submit" variant="contained" size="large"
              color="primary"
              disableElevation
            >
              Create
            </BigButton>
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
