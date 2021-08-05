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
    width: "33%",
    alignItems: "center",
    justifyContent: "space-between",
  },
  navText: {
    color: theme.palette.secondary.main,
    fontWeight: 'bold',
    [theme.breakpoints.down('md')]: {
      marginBottom: 15
    }
  },
  create: {
    fontWeight: 900,
    fontSize: 16,
    color: theme.palette.primary.main,
    border: "none",
    boxShadow: "0 0 4px 6px rgba(0, 0, 0, .05)",
    height: 60,
    padding: 20,
    width: 200
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
            className={classes.create}
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
