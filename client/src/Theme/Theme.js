import { createMuiTheme } from "@material-ui/core";

const theme = createMuiTheme({
  palette: {
    primary: {
      // main: "#0069FB",
      main: "#1C1C1C",
    },
    secondary: {
      main: "#ffffff",
    },
    text: {
      light: "#333333",
      primary: "rgba(0,0,0,0.4)",
      // primary: "rgba(0,0,0,0.4)",
      // primary: "#1C1C1C",
      // secondary: "#0069fb",
      secondary: "rgba(0,0,0,0.7)",
    },
  },
  typography: {
    fontFamily: "'Poppins', sans-serif",
  },
  overrides: {
    MuiTypography: {
      root: {
        color: "rgba(0,0,0,.45)",
      },
      h1: {
        color: "#333333",
      },
      h2: {
        color: "#333333",
      },
      h3: {
        color: "#333333",
      },
      h4: {
        color: "#333333",
      },
      h5: {
        fontFamily: "'Itim', cursive",
      },
      h6: {
        fontFamily: "'Itim', cursive",
      },
    },

    MuiTextField: {
      root: {
        "& .MuiInputBase-inputAdornedStart": {
          marginLeft: 15,
        },
        "& .MuiInputBase-root": {
          paddingBottom: 5,
        },
      },
    },
    MuiButton: {
      root: {
        textTransform: "none",
        paddingTop: 7,
        paddingBottom: 7,
      },
    },
    MuiCircularProgress: {
      root: {
        color: "white",
        width: 25,
        height: 25,
      },
      colorPrimary: {
        width: "25px !important",
        height: "25px !important",
      },
      colorSecondary: {
        color: "white",
        width: "25px !important",
        height: "25px !important",
      },
    },
    MuiAvatar: {
      root: {
        boxShadow: "0px 3px 10px rgba(0,0,0,0.3)",
      },
    },
    MuiPaper: {
      elevation1: {
        // boxShadow: "0px 3px 20px rgba(0,0,0,0.1)",
        boxShadow: "0px 20px 35px rgb(0 0 61 / 15%)",
        padding: 20,
        borderRadius: 10,
      },
      elevation24: {
        // boxShadow: "0px 3px 20px rgba(0,0,0,0.1)",
        boxShadow: "0px 20px 35px rgb(0 0 61 / 15%)",
        padding: 20,
        borderRadius: 10,
      },
    },
    MuiListSubheader: {
      sticky: {
        backgroundColor: "rgb(248 250 251)",
        fontWeight: 600,
      },
    },
  },
  colors: {
    // bg: "#F3F5F9",
    bg: "transparent",
    vibrant: "#BA3029",
  },
  custom: {
    shadow: {
      icon: "0px 10px 25px 0px rgb(0 0 61 / 50%)",
      paper: "0px 20px 35px rgb(0 0 61 / 15%)",
    },
  },
});

export default theme;
