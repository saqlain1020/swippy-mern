import React from "react";
import { Route, Switch } from "react-router";
import Test from "./../Pages/Test/Test";
import AuthenticatedRoute from "./AuthenticatedRoute";
import Auth from "./../Pages/Auth/Auth";
import UserRoutes from "./UserRoutes";
import Signout from "./../Components/Signout/Signout";
import history from "./history";
import ProfilePage from "src/Components/ProfilePage/ProfilePage";
import TagSerial from "src/Pages/TagSerial/TagSerial";
import TextPage from "src/Pages/TextPage/TextPage";
import Sitemap from "src/Pages/Sitemap/Sitemap";

const Routes = () => {
  return (
    <Switch>
      <Route path={"/"} render={() => history.push("/auth")} exact />
      <Route path="/sitemap" component={Sitemap} exact />
      <Route path="/profile/:username" component={ProfilePage} exact />
      <Route path={"/test"} component={Test} />
      <Route path={"/auth"} component={Auth} />
      <Route path={"/tag/:serial"} component={TagSerial} exact />
      <Route path= {"/text/:text"} component={TextPage} exact/>
      <AuthenticatedRoute
        path={"/dashboard"}
        render={(props) => <UserRoutes />}
      />
      <Route path="/signout" component={Signout} />
    </Switch>
  );
};

export default Routes;
