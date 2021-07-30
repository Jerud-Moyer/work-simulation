import React from "react";
import { Redirect, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import {
  Grid,
  Box,
  Typography,
  Button,
  FormControl,
  TextField,
  makeStyles,
} from "@material-ui/core";
import { login } from "./store/utils/thunkCreators";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "row",
    width: "100vw",
    justifyContent: "center"
  },
  graphicBox: {
    alignItems: "center",
    width: "42%",
    maxHeight: "100vh",
    background: "url(./assets/bg-img.png)",
    backgroundColor: "rgba(87, 161, 235, .6)",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",

  },
  graphicInner: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "rgba(83, 149, 241, .85)",
  },
  iconOuter: {
   display: "flex",
   flexDirection: "column",
   width: "7%",
   position: "absolute",
   top: "30%",
   left: "17.5%",
  },
  textBox: {
    position: "absolute",
    top: "45.5%",
    left: 0,
    right: 0,
    width: "42%"
  },
  headline: {
    fontSize: 32,
    color: "white",
    textAlign: "center",
    marginTop: "1%"
  },
  icon: {
  
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
    left: "66%",
    width: "32%",
    alignItems: "center",
    justifyContent: "space-around"
  },
  navText: {
    color: "#B0B0B0",
  },
  create: {
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
  },
  formInner: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    
  },
  welcome: {
    fontSize: 32,
    fontWeight: 600,
    marginBottom: 30,
    textAlign: "left",
    width: "60%"
  },
  inputField: {
    width: "60%",
    marginBottom: 30,
  },
  input: {
    appearance: "none",
    border: "none",
    outline: "none",
    fill: "none",
    background: "none",
  }
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
      container justify="center" 
      className={classes.root}
    >
      
        <Box className={classes.graphicBox}>
          <Grid className={classes.graphicInner}>
            <Grid className={classes.iconOuter}>
              <img 
                alt="bubble-graphic" 
                src="./assets/bubble.svg"
                className={classes.icon}
              />
            </Grid>
            <Grid className={classes.textBox}>
              <Typography className={classes.headline} >Converse with anyone</Typography>
              <Typography className={classes.headline} >with any language</Typography>
            </Grid>
          </Grid>
        </Box>
      
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
        <form onSubmit={handleLogin} className={classes.formOuter}>
            <Grid container item className={classes.formInner}>
              <Typography className={classes.welcome}>Welcome back!</Typography>
              
                <TextField
                  className={classes.inputField}
                  aria-label="username"
                  label="Username"
                  name="username"
                  color="secondary"
                />
              
            <FormControl margin="normal" required className={classes.inputField}>
              <label htmlFor="password">Password</label>
              <input
                id="password"
                className={classes.input}
                label="password"
                aria-label="password"
                type="password"
                name="password"
              />
            </FormControl>
              <Grid>
                <Button type="submit" variant="contained" size="large">
                  Login
                </Button>
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
