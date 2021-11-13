import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  profileTop: {
    paddingTop: 20,
    marginLeft: 20,
    width: 350,
    [theme.breakpoints.down("xs")]: {
      width: 220,
      marginLeft: 10,
      paddingTop: 5,
    },
  },
  avatarBadge: {
    width: "150px",
    height: "150px",

    // position: "absolute",
    // top: "-100px",
    // left: "calc(50% - 100px)",
    zIndex: 1,
    "& .MuiBadge-badge": {
      padding: 8,
      height: "auto",
      borderRadius: 360,
      "& svg": {
        width: 30,
        height: 30,
      },
      [theme.breakpoints.down("xs")]: {
        padding: 5,
        "& svg": {
          width: 20,
          height: 20,
        },
      },
    },
    [theme.breakpoints.down("xs")]: {
      width: "100px",
      height: "100px",
    },
  },
  avatar: {
    background: "white",
    width: "150px",
    height: "150px",
    [theme.breakpoints.down("xs")]: {
      width: "100px",
      height: "100px",
    },
  },
  heading: {
    fontWeight: 600,
    [theme.breakpoints.down("xs")]: {
      fontSize: 25,
    },
  },
  description: {
    maxWidth: 350,
    whiteSpace: "pre",
    margin: "auto",
    [theme.breakpoints.down("xs")]: {
      fontSize: 13,
    },
  },
  directBtn: {
    fontSize: 12,
    whiteSpace: "pre",
    // maxWidth: 250,
    [theme.breakpoints.down("xs")]: {
      fontSize: 10,
    },
  },
  editIco: {
    overflow: "hidden",
    cursor: "pointer",
  },
  icon: {
    color: theme.palette.primary.main,
    [theme.breakpoints.down("xs")]: {
      width: 15,
      height: 15,
    },
  },
  grid: {
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    margin: "auto",
  },
  chip: {
    marginTop: 10,
    fontSize: 14,
    color: "#222",
    fontWeight: 600,
    letterSpacing: 0,
  },
}));

export default useStyles;
