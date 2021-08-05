import React from 'react';
import { 
  Avatar,
  Box, 
  Grid, 
  makeStyles, 
  Typography 
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
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
   width: "6.5%",
   position: "absolute",
   top: "29%",
   left: "17.5%",
  },
  textBox: {
    position: "absolute",
    top: "43%",
    left: 0,
    right: 0,
    width: "42%"
  },
  headline: {
    fontSize: 30,
    fontWeight: 'bold',
    color: "white",
    textAlign: "center",
    [theme.breakpoints.down('sm')]: {
      fontSize: 25
    }
  },
}));

const AuthGraphic = () => {
  const classes = useStyles();

  return (
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
  )
}

export default AuthGraphic
