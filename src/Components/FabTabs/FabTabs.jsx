import React from "react";
import { Fab, makeStyles } from "@material-ui/core";
import { withRouter } from "react-router";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "fixed",
    top: "calc(100% - 100px)",
    left: "calc(50vw - 120px)",
    background: "white",
    borderRadius: 360,
    boxShadow: theme.custom.shadow.icon,
    zIndex: 99,
    width: 240,

    display: "flex",
    justifyContent: "center",
    [theme.breakpoints.down("xs")]: {
      top: "calc(100% - 70px)",
    },
  },
  fab: {
    background: "white",
    boxShadow: "none",
    height: 45,
    width: 45,
    margin: "0px 10px",
    transition: "all 500ms",
    "&:hover": {
      // background: theme.palette.primary.dark,
    },
  },
  fabActive: {
    background: theme.palette.primary.main,
    transition: "all 500ms",
    boxShadow: "none",
    height: 45,
    transform: "scale(1.5)",
    width: 45,
    margin: "0px 10px",
    "& i": {
      color: "white !important",
    },
    "&:hover": {
      background: theme.palette.primary.dark,
    },
  },
  icon: {
    color: "grey",
    transition: "all 500ms",
    fontSize: 25,
  },
}));

const FabTabs = ({ history }) => {
  const classes = useStyles();
  const [val, setVal] = React.useState(0);
  const handleChange = (v) => {
    v === 0 && history.push("/dashboard/qr");
    v === 1 && history.push("/dashboard/profile");
    v === 2 && history.push("/dashboard/tags");
    v === 3 && history.push("/dashboard/settings");
    setVal(v);
  };

  React.useEffect(() => {
    let path = history.location.pathname;
    if (path.includes("tag")) {
      setVal(2);
    } else if (path.includes("Qr")) {
      setVal(0);
    } else if (path.includes("profile")) {
      setVal(1);
    } else if (path.includes("setting")) {
      setVal(3);
    }
  }, [history.location.pathname]);

  return (
    <div className={classes.root}>
      <Fab
        className={val === 0 ? classes.fabActive : classes.fab}
        onClick={() => handleChange(0)}
      >
        <i className={`fas fa-qrcode ${classes.icon}`}></i>
      </Fab>
      <Fab
        className={val === 1 ? classes.fabActive : classes.fab}
        onClick={() => handleChange(1)}
      >
        <i className={`fas fa-user ${classes.icon}`}></i>
      </Fab>
      <Fab
        className={val === 2 ? classes.fabActive : classes.fab}
        onClick={() => handleChange(2)}
      >
        <i className={`fas fa-tags ${classes.icon}`}></i>
      </Fab>
      {/* <Fab
        className={val === 3 ? classes.fabActive : classes.fab}
        onClick={() => handleChange(3)}
      >
        <i className={`fas fa-cog ${classes.icon}`}></i>
      </Fab> */}
    </div>
  );
};

export default withRouter(FabTabs);
