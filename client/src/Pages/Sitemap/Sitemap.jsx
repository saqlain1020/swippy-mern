import React from "react";
import { makeStyles, Container, List, ListItem, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: 50,
  },
  link: {
    marginRight: 20,
    marginLeft: 20,
    color: "blue !important",
  },
}));

const listOfLinks = [
  {
    name: "Login",
    link: "/auth",
  },
  {
    name: "Signup",
    link: "/auth/signup",
  },
  {
    name: "Public Profile",
    link: "/profile/user2",
  },
  {
    name: "Scanned Tag",
    link: "/tag/serialnum",
  },
  {
    name: "Dashboard",
    link: "/dashboard",
  },
  {
    name: "Profile",
    link: "/dashboard/profile",
  },
  {
    name: "QR",
    link: "/dashboard/qr",
  },
  {
    name: "Tags",
    link: "/dashboard/tags",
  },
  {
    name: "Auto Signout",
    link: "/signout",
  },
  {
    name: "Sitemap",
    link: "/sitemap",
  },
];

const Sitemap = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Container maxWidth="lg">
        <Typography variant="h2">Sitemap</Typography>
        <List>
          {listOfLinks.map((item, index) => (
            <ListItem key={index}>
              •
              <Link to={item.link} className={classes.link}>
                {item.name}
              </Link>
              {item.link}
            </ListItem>
          ))}
        </List>
      </Container>
    </div>
  );
};

export default Sitemap;
