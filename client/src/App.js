import React from "react";
import "./App.css";
import { setUpNotifications } from "reapop";
import { Container, ThemeProvider } from "@material-ui/core";
import theme from "./Theme/Theme";
import Routes from "./Routes/Routes";
import { connect } from "react-redux";
import { authListener } from "src/Redux/user/userActions";
import Loading from "./Components/Loading/Loading";

function App({ authListener }) {
  setUpNotifications({
    defaultProps: {
      position: "top-right",
      dismissible: true,
      showDismissButton: true,
      dismissAfter: 5000,
    },
  });

  React.useEffect(() => {
    authListener();
  }, [authListener]);

  return (
    <>
      <ThemeProvider theme={theme}>
        <Container maxWidth="xl" disableGutters>
          <Loading/>
          <Routes />
        </Container>
      </ThemeProvider>
    </>
  );
}

const actions = {
  authListener,
};

export default connect(null, actions)(App);
