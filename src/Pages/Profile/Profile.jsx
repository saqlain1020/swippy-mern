import React from "react";
import { makeStyles } from "@material-ui/core";
import ProfileHeadingCard from "src/Components/ProfileHeadingCard/ProfileHeadingCard";
import SocialCards from "src/Components/SocialCards/SocialCards";

const useStyles = makeStyles((theme) => ({
  root: {
    background: theme.colors.bg,
    position: "relative",
    marginTop:20,
    // top: -50,
    // borderRadius: 50,
  }, 
}));

const Profile = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <ProfileHeadingCard />
      <SocialCards style={{ marginTop: 30 }} />
    </div>
  );
};

export default Profile;
