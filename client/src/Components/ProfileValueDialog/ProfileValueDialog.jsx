import React from "react";
import {
  Button,
  Dialog,
  Divider,
  Grid,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import { connect } from "react-redux";
import { updateUserInfo } from "src/Redux/user/userActions";

const useStyles = makeStyles((theme) => ({
  root: {},
  btnsContainer: {
    // borderTop:"1px solid grey"
    // boxShadow: "0px -5px 5px rgba(0,0,0,0.1)"
  },
  paper: {
    // padding:0,
  },
}));

const ProfileValueDialog = ({ open, onClose, user, updateUserInfo }) => {
  const classes = useStyles();
  const [description, setDescription] = React.useState(user.description || "");
  const [name,setName] = React.useState(user.name || "");

  const submit = async (e) => {
    e.preventDefault();
    let obj = {
      name,
      description,
    };    
    await updateUserInfo(obj);
    onClose();
  };

  return (
    <Dialog
      PaperProps={{ className: classes.paper }}
      disableBackdropClick
      open={open}
      maxWidth="xs"
      onClose={onClose}
      className={classes.root}
    >
      <form onSubmit={submit}>
        <Grid container spacing={5}>
          <Grid item xs={12}>
            <Typography variant="h5" color="primary">
              <b>Profile Details</b>
            </Typography>
            <Divider />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Enter Name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              required
              rows={5}
              label="Description"
              value={description}
              onChange={(e) => {setDescription(e.target.value)}}
            />
          </Grid>
          <Grid item xs={12} className={classes.btnsContainer}>
            <Typography align="right">
              <Button variant="outlined" color="primary" onClick={onClose}>
                Cancel
              </Button>
              &nbsp;&nbsp;
              <Button variant="contained" color="primary" type="submit">
                Submit
              </Button>
            </Typography>
          </Grid>
        </Grid>
      </form>
    </Dialog>
  );
};

const mapState = (store) => ({
  user: store.user,
});

const actions = {
  updateUserInfo,
};

export default connect(mapState, actions)(ProfileValueDialog);
