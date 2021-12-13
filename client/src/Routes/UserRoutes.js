import React from "react";
import BurgerMenu from "src/Pages/BurgerMenu/BurgerMenu";
import Profile from "src/Pages/Profile/Profile";
import AuthenticatedRoute from "./AuthenticatedRoute";
import QR from './../Pages/QR/QR';
import Tags from './../Pages/Tags/Tags';

const UserRoutes = () => {
  return (
    <>
      <BurgerMenu>
        <AuthenticatedRoute path="/dashboard/profile" component={Profile} />
        <AuthenticatedRoute path="/dashboard/Qr" component={QR} />
        <AuthenticatedRoute path="/dashboard/tags" component={Tags} />
      </BurgerMenu>
    </>
  );
};

export default UserRoutes;
