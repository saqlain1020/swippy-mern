import React from "react";
import { makeStyles, Typography } from "@material-ui/core";
import ProfileHeadingCard from "src/Components/ProfileHeadingCard/ProfileHeadingCard";
import SocialCards from "src/Components/SocialCards/SocialCards";
import Logo from "src/Assets/images/logo.png";
import { Link } from "react-router-dom";
import { getTaggedUserData } from "./../../Redux/user/userActions";
import { useDispatch } from "react-redux";
import {
  LOADER_START,
  LOADER_STOP,
} from "./../../Redux/loader/loaderConstants";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
  },
  nav: {
    background: theme.palette.primary.main,
    height: 60,
    paddingTop: 2,
  },
  content: {
    background: theme.colors.bg,
    marginTop:20,
  },
  link: {
    position: "fixed",
    bottom: 30,
    height: 50,
    width: "90%",
    left: "5%",
    [theme.breakpoints.down("xs")]: {
      width: "100%",
      left: "0%",
    },
  },
  buyBtn: {
    width: "100%",
    borderRadius: 0,
    height: "100%",
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    // background: theme.palette.primary.main,
    background: theme.palette.primary.main,
    // color: "white",
    color: "white",
    backgroundSize: "200% 200%",
    cursor: "pointer",
    zIndex: 1,
    border: `1px solid ${theme.palette.primary.main}`,
    boxSizing: "border-box",
    transition: "all 200ms ease-in-out",
    animation: "$shake 4s cubic-bezier(.36,.07,.19,.97) infinite both",
    "&:before": {
      transition: "all 200ms ease-in-out",
      boxSizing: "border-box",
      content: "''",
      position: "absolute",
      zIndex: -1,
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      background: "transparent",
      border: `1px solid ${theme.palette.primary.main}`,
    },
    "&:hover": {
      background: theme.palette.primary.main,
      color: "white",
    },
    "&:hover:before": {
      top: 7,
      left: 7,
    },
  },
  "@keyframes shake": {
    "2%, 18%": {
      transform: "rotate(-1deg)",
    },

    "4%, 16%": {
      transform: "rotate(1deg)",
    },

    "6%, 10%, 14%": {
      transform: "rotate(-2deg)",
    },

    "8%, 12%": {
      transform: "rotate(2deg)",
    },
  },
  // "@keyframes buyBtn": {
  //   "0%": { backgroundPosition: "0% 50%" },
  //   "50%": { backgroundPosition: "100% 50%" },
  //   "100%": { backgroundPosition: "0% 50%" },
  // },
}));

const ProfilePage = ({
  history,
  match: {
    params: { username },
  },
}) => {
  const classes = useStyles();
  const [data, setData] = React.useState({});
  const dispatch = useDispatch();

  const fetchUser = async () => {
    dispatch({
      type: LOADER_START,
    });
    let data = await getTaggedUserData(username);
    console.log("dt",data);
    setData(data);
    dispatch({
      type: LOADER_STOP,
    });
  };
  React.useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className={classes.root}>
      <div className={classes.nav}>
        <center>
          <Link to="/">
            <img src={Logo} alt="swippy" height="50px" />
          </Link>
        </center>
      </div>
      <div className={classes.content}>
        <ProfileHeadingCard data={data} />
        <SocialCards data={data} style={{ marginTop: 30 }} />
      </div>
      {/* <a href="https://shop-swippy.co/" className={classes.link}>
        <div className={classes.buyBtn}>
          <Typography align="center" style={{ color: "inherit" }}>
            <i className="fas fa-cart-plus"></i>&nbsp;&nbsp;Tap to get your
            swippy
          </Typography>
        </div>
      </a> */}
    </div>
  );
};

export default ProfilePage;
