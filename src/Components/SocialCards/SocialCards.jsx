import React from "react";
import { Button, Container, Grid, makeStyles } from "@material-ui/core";
import SocialLink from "./../SocialLink/SocialLink";
import { v4 as uuid } from "uuid";
import AddIcon from "@material-ui/icons/Add";
import AddSocialDialog from "./../AddSocialDialog/AddSocialDialog";
import { connect } from "react-redux";

const useStyles = makeStyles((theme) => ({
  addBtn: {
    width: 130,
    height: 130,
    borderRadius: 30,
  },
  addIco: {
    width: 60,
    height: 60,
    color: "grey",
  },
  addContainer: {
    display: "flex",
    justifyContent: "center",
  },
}));

const SocialCards = ({ style, className, user: { socialLinks }, data }) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  return (
    <Container
      maxWidth="lg"
      style={{ paddingLeft: 30, paddingRight: 30, paddingBottom: 30, ...style }}
      className={className}
    >
      <Grid container spacing={2}>
        {!data &&
          socialLinks &&
          socialLinks.map((item, index) => (
            <Grid key={uuid()} item xs={6} sm={4} md={3} className="center">
              <SocialLink {...item} index={index} />
            </Grid>
          ))}
        {data &&
          data.socialLinks &&
          data.socialLinks.map((item) => (
            <Grid key={uuid()} item xs={6} sm={4} md={3} className="center">
              <SocialLink {...item} />
            </Grid>
          ))}
        {!data && (
          <Grid item xs={6} sm={4} md={3} className={classes.addContainer}>
            <Button
              variant="outlined"
              color="primary"
              className={classes.addBtn}
              onClick={() => setOpen(true)}
            >
              <AddIcon className={classes.addIco} />
            </Button>
          </Grid>
        )}
      </Grid>
      <AddSocialDialog
        key={uuid()}
        open={open}
        onClose={() => setOpen(false)}
      />
    </Container>
  );
};

const mapState = (store) => ({
  user: store.user,
});

export default connect(mapState)(SocialCards);
