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
import { connect } from "react-redux";
import { sendPasswordResetEmail } from "./../../Redux/user/userActions";

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

const Login = ({ history, sendPasswordResetEmail }) => {
  const classes = useStyles();
  const [state, setState] = React.useState({
    email: "",
  });

  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const submit = (e) => {
    e.preventDefault();
    sendPasswordResetEmail(state.email);
  };

  return (
    <form className={classes.root} onSubmit={submit}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            color="primary"
            fullWidth
            type="email"
            value={state.email}
            name="email"
            required
            onChange={handleChange}
            placeholder="Enter email"
            InputProps={{
              startAdornment: <MailOutlineRoundedIcon />,
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" color="primary" fullWidth type="submit">
            Send Email
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
          <Button
            variant="outlined"
            fullWidth
            onClick={() => history.push("/auth")}
          >
            Log in
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="outlined"
            fullWidth
            onClick={() => history.push("/auth/signup")}
          >
            Sign up
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

const actions = {
  sendPasswordResetEmail,
};

export default connect(null, actions)(Login);
