import { createTheme } from "@material-ui/core";

export const theme = createTheme({
  typography: {
    fontFamily: "Open Sans, sans-serif",
    fontSize: 14,
    button: {
      textTransform: "none",
      letterSpacing: 0,
      fontWeight: "bold"
    }
  },
  overrides: {
    MuiInput: {
      input: {
        fontWeight: "bold",
        backgroundColor: "none"
      },
    }
  },
  palette: {
    primary: { main: "#3A8DFF" },
    secondary: { main: "#B0B0B0" }
  },
  authPage: {
    outerBox: {
      display: "flex",
      flexDirection: "row",
      width: "100vw",
      justifyContent: "center",
    },
    formBox: {
      display: "flex",
      flexDirection: "column",
      width: "58%",
      height: "100vh",
      justifyContent: "center",
      alignItems: "center"
    },
  }
});
