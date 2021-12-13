import React from "react";
import { Backdrop, CircularProgress, makeStyles } from "@material-ui/core";
import { connect } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    zIndex: 99999,
  },
}));

const Loading = ({ loading }) => {
  const classes = useStyles();

  return (
    <Backdrop open={loading} className={classes.root}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

const mapState = (store) => ({
  loading: store.loading,
});

export default connect(mapState)(Loading);
