import React from "react";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {},
}));

const TextPage = ({
  match: {
    params: { text },
  },
}) => {
  const classes = useStyles();
  console.log(text);
  return <div className={classes.root}>{text}</div>;
};

export default TextPage;
