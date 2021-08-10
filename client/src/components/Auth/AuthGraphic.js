import React from 'react';
import { 
  Box, 
  Grid, 
  makeStyles, 
  Typography 
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  sideBar: {
    alignItems: "center",
    width: "42%",
    maxHeight: "100vh",
    background: "url(./assets/bg-img.png)",
    backgroundColor: "rgba(87, 161, 235, .6)",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    [theme.breakpoints.down('sm')]: {
      display: "none"
    }
  },
  sideBarNext: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "rgba(83, 149, 241, .85)",
  },
  chatBubbleIconWrapper: {
   display: "flex",
   flexDirection: "column",
   width: "6.5%",
   position: "absolute",
   top: "29%",
   left: "17.5%",
   
   [theme.breakpoints.down('sm')]: {
     width: "20%",
     top: "22%",
     left: "11%",
   }
  },
  textBox: {
    position: "absolute",
    top: "43%",
    left: 0,
    right: 0,
    width: "42%",
    [theme.breakpoints.down('sm')]: {
      width: "38%",
      top: "38%",
      left: "2%",
    }
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
    <Box className={classes.sideBar}>
          <Grid className={classes.sideBarNext}>
            <Grid className={classes.chatBubbleIconWrapper}>
              <img 
                src={'./assets/bubble.svg'}
                alt={'bubble graphic'}
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
