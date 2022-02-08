import React from "react";
import {
  CircularProgress,
  Container,
  makeStyles,
  Typography,
} from "@material-ui/core";
import Logo from "src/Assets/images/logo.png";
import { Button } from "@material-ui/core";
import Particles from "react-particles-js";
import config from "src/Util/particles.json";
import { fetchTagUser, pairTag } from "src/Util/tagsActions";
import { connect } from "react-redux";
import Signup from "src/Components/Signup/Signup";
import Login from "./../../Components/Login/Login";
import clsx from "clsx";
import { loaderStart, loaderStop } from "./../../Redux/loader/loaderReducer";

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "100vh",
    position: "relative",
  },
  particlesContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
  },
  container: {
    display: "flex",
    flexFlow: "column",
    margin: 20,
    paddingTop: 30,
    paddingBottom: 30,
    background: theme.colors.bg,
    boxShadow: theme.custom.shadow.paper,
    zIndex: 1,
    borderRadius: 20,
  },
  img: {
    maxWidth: 400,
    filter: "invert(1)",
  },
  btn: {
    minWidth: 100,
    marginTop: 20,
  },
  heading: {
    fontSize: 24,
    marginTop: 20,
    fontWeight: 600,
  },
  para: {
    fontSize: 18,
    [theme.breakpoints.down("xs")]: {
      fontSize: 16,
    },
  },
  green: {
    color: theme.palette.success.dark,
  },
}));

const TagSerial = ({
  match: {
    params: { serial },
  },
  history,
  currentUser,
  fetchTagUser,
  pairTag,
  loaderStart,
  loaderStop,
}) => {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [loading, setLoading] = React.useState(true);

  const pageChange = () => {
    if (!currentUser._id) {
      //Show Register text
      setPage(0);
    } else {
      //Show Pair page
      setPage(1);
    }
  };

  const handleTag = async () => {
    let user = await fetchTagUser(serial);
    console.log(user);
    if (user) {
      let social = user.socialLinks?.find((item) => item.isPrimary);
      if (social && user.direct) window.location.replace(social.url);
      else {
        let url = `/profile/${user.username}`;
        history.replace(url);
      }
    } else {
      setLoading(false);
      pageChange();
    }
  };

  const handlePair = async () => {
    await pairTag(serial);
    setPage(4); //Pair complete
  };

  React.useEffect(() => {
    handleTag();
  }, []);

  React.useEffect(() => {
    pageChange();
  }, [currentUser]);

  if (!loading)
    return (
      <div className={`center ${classes.root}`}>
        <Particles
          width="100%"
          height="100%"
          className={classes.particlesContainer}
          params={config}
        />
        <Container maxWidth="xs" className={`center ${classes.container}`}>
          <img src={Logo} width="70%" className={classes.img} alt="Swippy" />
          {page === 0 && (
            <>
              <Typography
                align="center"
                variant="h4"
                className={classes.heading}
              >
                Welcome to the app!
              </Typography>
              <Typography align="center" variant="h6" className={classes.para}>
                Load Swippy and create your new profile
                <br />
                Register or, if you already have a profile login and continue
                activating.
              </Typography>
              <div>
                <Button
                  className={classes.btn}
                  variant="outlined"
                  color="primary"
                  onClick={() => setPage(2)} //Register page
                >
                  Register
                </Button>
                &nbsp;&nbsp;&nbsp;
                <Button
                  className={classes.btn}
                  variant="contained"
                  color="primary"
                  onClick={() => setPage(3)} //Login page
                >
                  Login
                </Button>
              </div>
            </>
          )}
          {page === 1 && (
            <>
              <Typography
                align="center"
                variant="h4"
                className={classes.heading}
              >
                Pair Swippy with your account
              </Typography>
              <Button
                className={classes.btn}
                variant="contained"
                color="primary"
                onClick={handlePair}
              >
                {loading ? <CircularProgress color="secondary" /> : "Pair"}
              </Button>
            </>
          )}
          {page === 2 && <Signup tagPage={true} />}
          {page === 3 && <Login tagPage={true} />}
          {page === 4 && (
            <>
              <Typography
                align="center"
                variant="h4"
                color="success"
                className={clsx(classes.heading, classes.green)}
              >
                Swippy successfully paired with your profile
              </Typography>
              <Button
                className={classes.btn}
                variant="outlined"
                color="primary"
                onClick={() => history.push("/dashboard/profile")}
              >
                Go to dashboard
              </Button>
            </>
          )}
        </Container>
      </div>
    );
  else return null;
};

const mapState = (store) => ({
  currentUser: store.user,
});

const actions = {
  fetchTagUser,
  pairTag,
  loaderStart,
  loaderStop,
};

export default connect(mapState, actions)(TagSerial);
