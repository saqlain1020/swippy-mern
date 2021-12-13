import React from "react";
import { connect } from "react-redux";
import history from "./history";
import { useDispatch } from "react-redux";
import { notify } from "reapop";
import { Route } from "react-router";

const AuthenticatedRoute = ({ auth, ...props }) => {
  const dispatch = useDispatch();

  if (!auth._id) {
    dispatch(notify("Not Authenticated.", "warning"));
    history.push("/auth");
  }

  return <Route {...props} />;
};

const mapState = (store) => ({
  auth: store.user,
});

export default connect(mapState)(AuthenticatedRoute);
