import React from "react";
import { Button, Divider, Grid, makeStyles, TextField, Typography } from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { connect } from "react-redux";
import { changePasswordUsingToken } from "./../../Redux/user/userActions";
import { useParams } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 20,
    "& .MuiSvgIcon-root": {
      color: "rgba(0,0,0,0.25)",
    },
  },
  forgot: {
    fontSize: 16,
    fontWeight: 600,
    cursor: "pointer",
    marginTop: 3,
  },
  dividers: {
    display: "grid",
    gridTemplateColumns: "1fr min-content 1fr",
    alignItems: "center",
  },
}));

const ChangePassword = ({ history, changePasswordUsingToken }) => {
  const classes = useStyles();
  const [state, setState] = React.useState({
    password: "",
    confirmPassword: "",
  });

  const { resetToken } = useParams();

  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const submit = (e) => {
    e.preventDefault();
    changePasswordUsingToken({
      password: state.password,
      confirmPassword: state.confirmPassword,
      resetToken,
    });
  };

  return (
    <form className={classes.root} onSubmit={submit}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            color="primary"
            fullWidth
            type="password"
            value={state.password}
            name="password"
            required
            onChange={handleChange}
            placeholder="Enter Password"
            InputProps={{
              startAdornment: <LockOutlinedIcon />,
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            color="primary"
            fullWidth
            type="password"
            value={state.confirmPassword}
            name="confirmPassword"
            required
            onChange={handleChange}
            placeholder="Confirm Password"
            InputProps={{
              startAdornment: <LockOutlinedIcon />,
            }}
            error={state.password !== state.confirmPassword}
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" color="primary" fullWidth type="submit">
            Change Password
          </Button>
        </Grid>
        <Grid item xs={12}>
          <div className={classes.dividers}>
            <Divider />
            <Typography style={{ margin: "0px 5px" }}>OR</Typography>
            <Divider />
          </div>
        </Grid>
        <Grid item xs={12}>
          <Button variant="outlined" fullWidth onClick={() => history.push("/auth")}>
            Log in
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

const actions = {
  changePasswordUsingToken,
};

export default connect(null, actions)(ChangePassword);
