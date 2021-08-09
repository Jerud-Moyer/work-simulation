import { 
  Button, 
  Grid, 
  makeStyles, 
  Typography 
} from '@material-ui/core';
import React from 'react';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  nav: {
    position: "absolute",
    top: "4%",
    left: "63%",
    width: "35%",
    alignItems: "center",
    justifyContent: "center",
    [theme.breakpoints.down('sm')]: {
      width: "50%",
      left: "45%",
    }
  },
  navText: {
    color: theme.palette.secondary.main,
    fontWeight: 'bold',
    textAlign: "center",
    textWrap: "wrap",
    maxWidth: "100%",
    [theme.breakpoints.down('md')]: {
      marginBottom: 15
    }
  },
  button: {
    fontWeight: 900,
    fontSize: 16,
    color: theme.palette.primary.main,
    border: "none",
    boxShadow: "0 0 4px 6px rgba(0, 0, 0, .05)",
    height: 60,
    padding: theme.spacing(2.5),
    width: 200,
    marginLeft: theme.spacing(3.75),
    [theme.breakpoints.down('sm')]: {
      width: 160,
      marginLeft: 0,
    }
  },
}));

const Nav = ({message, destinationPath, forSignUp}) => {
  const classes = useStyles();
  const history = useHistory();
  return (
    <Grid container item className={classes.nav} >
          <Typography className={classes.navText} >
            {message}
          </Typography>
          <Button 
            onClick={() => history.push(destinationPath)}
            type="submit" variant="outlined" size="large"
            className={classes.button}
          >
            {
              forSignUp
                ? "Login"
                : "Create account"
            }
          </Button>
        </Grid>
  )
}

export default Nav
