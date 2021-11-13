import React from "react";
import { slide as Menu } from "react-burger-menu";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
} from "@material-ui/core";
import Logo from "src/Assets/images/logo.png";
import FabTabs from "src/Components/FabTabs/FabTabs";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {},
  menu: {
    //   background: "red",
    // position:"relative"
  },
  nav: {
    background: theme.palette.primary.main,
    // paddingLeft: 100,
    height: "65px",
    paddingTop: 6,
    display: "flex",
    justifyContent: "center",
    paddingBottom: 5,
  },
  leftBar: {
    width: 40,
    height: "100%",
    background: theme.palette.primary.main,
    position: "absolute",
    top: 0,
    left: 0,
  },
}));
var styles = {
  bmBurgerButton: {
    position: "relative",
    width: "20px",
    height: "15px",
    left: "20px",
    top: "20px",
  },
  bmBurgerBars: {
    background: "white",
  },
  bmBurgerBarsHover: {
    background: "#a90000",
  },
  bmCrossButton: {
    height: "24px",
    width: "24px",
  },
  bmCross: {
    background: "#bdc3c7",
  },
  bmMenuWrap: {
    position: "fixed",
    top: 0,
    height: "100%",
    boxShadow: "0px 0px 15px rgba(0,0,0,0.2)",
  },
  bmMenu: {
    // background: "#373a47",
    background: "white",
    padding: "2.5em 1.5em 0",
    fontSize: "1.15em",
  },
  bmMorphShape: {
    // fill: "#373a47",
    fill: "#ffffff",
  },
  bmItemList: {
    // color: "#b8b7ad",
    color: "black",
    padding: "0.8em",
  },
  bmItem: {
    display: "block",
  },
  bmOverlay: {
    // background: "rgba(0, 0, 0, 0.3)",
    background: "rgb(0 135 255 / 6%)",
  },
};
const BurgerMenu = ({ children }) => {
  const classes = useStyles();

  return (
    <div id="outer-container">
      <Menu
        width={250}
        pageWrapId={"page-wrap"}
        outerContainerId={"outer-container"}
        className={classes.menu}
        styles={styles}
      >
        <div style={{ display: "flex" }}>
          <div className={classes.leftBar} />
          <List>
            <Link to="/">
              <ListItem button>
                <ListItemIcon>
                  <i className="fas fa-home"></i>
                </ListItemIcon>
                <ListItemText primary="Home" />
              </ListItem>
            </Link>
            <Link to="/dashboard/profile">
              <ListItem button>
                <ListItemIcon>
                  <i className="fas fa-th-large"></i>
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
              </ListItem>
            </Link>
            <Link to="/dashboard/tags">
              <ListItem button>
                <ListItemIcon>
                  <i className="fas fa-tag"></i>
                </ListItemIcon>
                <ListItemText primary="My Tags" />
              </ListItem>
            </Link>
            <Link to="/dashboard/Qr">
              <ListItem button>
                <ListItemIcon>
                  <i className="fas fa-qrcode"></i>
                </ListItemIcon>
                <ListItemText primary="QR Code" />
              </ListItem>
            </Link>
            {/* <Link to="/dashboard/settings">
              <ListItem button>
                <ListItemIcon>
                  <i className="fas fa-cog"></i>
                </ListItemIcon>
                <ListItemText primary="Settings" />
              </ListItem>
            </Link> */}
            <Link to="/signout">
              <ListItem button>
                <ListItemIcon>
                  <i className="fas fa-sign-out-alt"></i>
                </ListItemIcon>
                <ListItemText primary="Signout" />
              </ListItem>
            </Link>
          </List>
        </div>
      </Menu>
      <main id="page-wrap">
        <FabTabs />
        <div className={classes.nav}>
          <img src={Logo} alt="swippy" height="50px" />
        </div>
        {children}
      </main>
    </div>
  );
};

export default BurgerMenu;
