import { 
  FormControl,
   Grid, 
   InputAdornment, 
   Typography, 
   Button, withStyles, 
   TextField,
   makeStyles,
   FormHelperText,
} from '@material-ui/core';
import React from 'react';

const CssTextField = withStyles((theme) => ({
  root: {
    fullWidth: true,
    '& label': {
      top: -26,
      color: theme.palette.secondary.main,
      fontSize: 18,
      fontWeight: 'bold',
      [theme.breakpoints.down('sm')]: {
        fontSize: 20,
      }
    },
    '& label.Mui-focused': {
      color: theme.palette.secondary.main,
    },
    '& MuiInput-underline:after': {
      borderBottomColor: theme.palette.primary.main,
      borderBottomWeight: 10
    },
  }
}))(TextField);

const BigButton = withStyles((theme) => ({
  root: {
    width: 185,
    height: 65,
    marginTop: theme.spacing(2.5),
    fontSize: 18,
    fontWeight: 'bolder',
    [theme.breakpoints.down('sm')]: {
      width: 170,
    }
  },
}))(Button);

const useStyles = makeStyles((theme) => ({
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
    fontWeight: 900,
    marginBottom: theme.spacing(6.25),
    textAlign: "left",
    width: "100%",
    [theme.breakpoints.down('sm')]: {
      fontSize: 20,
      marginBottom: 30,
      
    }
  },
  inputField: {
    width: 500,
    marginBottom: theme.spacing(6.25),
    marginTop: theme.spacing(2.2),
    [theme.breakpoints.down('sm')]: {
      width: 200
    }
  },
  signupElement: {
    marginBottom: theme.spacing(3.75),
    marginTop: theme.spacing(2.5),
    [theme.breakpoints.down('sm')]: {
      marginBottom: 10,
    }
  },
  link: {
    textDecoration: "none",
    fontSize: 14,
    color: theme.palette.primary.main,
    fontWeight: "bold"
  },
}))

const AuthForm = ({
  authType,
  handleSubmit, 
  formErrorMessage
}) => {
  const classes = useStyles();

  return (
    <form 
      className={[classes.formOuter, classes.root]} 
      onSubmit={handleSubmit}
    >
      <Grid 
        container 
        item 
        className={classes.formInner}
      >
        <Typography 
          className={authType === "login"
            ? classes.welcome
            : [classes.welcome, classes.signupElement]
          }
        >
          {authType === "login"
            ? "Welcome back!"
            : "Create an account."
          }
        </Typography>
        
          {authType === "login" &&
            <>
              <FormControl className={classes.inputField}>
                <CssTextField
                  aria-label="username"
                  label="Username"
                  name="username"
                  type="text"
              />
              </FormControl>
              <FormControl className={classes.inputField}>
                <CssTextField
                  aria-label="password"
                  label="Password"
                  name="password"
                  type="password"
                  InputProps={{
                    endAdornment: 
                      <InputAdornment    position={'end'}>
                        <Button 
                          className={classes.link}
                          href={'/help'} 
                          alt={'help Link'}
                        >
                          Forgot?
                        </Button>
                      </InputAdornment>
                    }}
                />
              </FormControl>
            </>
          }
          {authType === "signup" && 
          <>
            <Grid>
              <FormControl>
                <CssTextField
                  className={[classes.inputField, classes.signupElement]}
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
                  className={[classes.inputField, classes.signupElement]}
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
                  className={[classes.inputField, classes.signupElement]}
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
                  className={[classes.inputField, classes.signupElement]}
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
          </>
          }  
            <BigButton 
              type="submit" variant="contained" size="large"
              color="primary"
              disableElevation
            >
              {
                authType === "login"
                ? "Login"
                : "Create"
              }
            </BigButton>
          
      </Grid>
    </form>
  )
}

export default AuthForm
