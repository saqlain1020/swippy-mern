import React from "react";
import {
  Button,
  Divider,
  Grid,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import MailOutlineRoundedIcon from "@material-ui/icons/MailOutlineRounded";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import VisibilityOffOutlinedIcon from "@material-ui/icons/VisibilityOffOutlined";
import VisibilityOutlinedIcon from "@material-ui/icons/VisibilityOutlined";
import FaceIcon from "@material-ui/icons/Face";
import { connect } from "react-redux";
import { signup } from "../../Redux/user/userActions";

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

const Signup = ({ history, signup, tagPage }) => {
  const classes = useStyles();
  const [show, setShow] = React.useState(false);
  const [state, setState] = React.useState({
    email: "",
    password: "",
    username: "",
  });

  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const submit = async (e) => {
    e.preventDefault();
    await signup(state.username, state.email, state.password);
    !tagPage && history.push("/dashboard/profile");
  };

  return (
    <form className={classes.root} onSubmit={submit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            color="primary"
            fullWidth
            required
            type="text"
            size="small"
            value={state.username}
            name="username"
            onChange={handleChange}
            placeholder="Enter Username"
            style={{ marginBottom: 4 }}
            InputProps={{
              startAdornment: <FaceIcon />,
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            color="primary"
            fullWidth
            type="email"
            size="small"
            required
            value={state.email}
            name="email"
            onChange={handleChange}
            placeholder="Enter email"
            style={{ marginBottom: 4 }}
            InputProps={{
              startAdornment: <MailOutlineRoundedIcon />,
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            placeholder="Password"
            type={!show ? "password" : "text"}
            size="small"
            style={{ marginBottom: 4 }}
            value={state.password}
            name="password"
            required
            onChange={handleChange}
            InputProps={{
              startAdornment: <LockOutlinedIcon />,
              endAdornment: !show ? (
                <VisibilityOffOutlinedIcon
                  style={{ cursor: "pointer" }}
                  onClick={() => setShow(true)}
                />
              ) : (
                <VisibilityOutlinedIcon
                  style={{ cursor: "pointer" }}
                  onClick={() => setShow(false)}
                />
              ),
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" color="primary" fullWidth type="submit">
            Sign up
          </Button>
        </Grid>
        {!tagPage && (
          <>
            <Grid item xs={12}>
              <div className={classes.dividers}>
                <Divider />
                <Typography style={{ margin: "0px 5px" }}>OR</Typography>
                <Divider />
              </div>
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="outlined"
                fullWidth
                onClick={() => history.push("/auth")}
              >
                Log in
              </Button>
            </Grid>
          </>
        )}
      </Grid>
    </form>
  );
};

const actions = {
  signup,
};

export default connect(null, actions)(Signup);
