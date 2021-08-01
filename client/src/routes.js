import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { AdminPage } from "./pages/AdminPage";
import { SendMessage } from "./pages/SendMessage";
import { DetailPage } from "./pages/DetailPage";
import { AuthPage } from "./pages/AuthPage";

export const useRoutes = (isAuthenticated, admin) => {
  
  if (isAuthenticated && !admin) {
    return (
      <Switch>
        <Route path="/create">
          <SendMessage />
        </Route>
        <Route path="/admin">
          <AdminPage />
        </Route>
        
        <Redirect to="/create" />
      </Switch>
    );
  }

  if (isAuthenticated && admin) {
    return (
      <Switch>
        <Route path="/admin" exact>
          <AdminPage />
        </Route>
        <Route path="/detail/:id" >
          <DetailPage />
        </Route>
        <Redirect to="/admin" />
      </Switch>
    );
  }

  return (
    <Switch>
      <Route path="/" exact>
        <AuthPage />
      </Route>
      <Redirect to="/" />
    </Switch>
  );
};
