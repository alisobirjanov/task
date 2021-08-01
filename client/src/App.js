import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { useRoutes } from "./routes";
import { AuthContext } from "./context/AuthContext";
import { useAuth } from "./hooks/auth.hook";

import "materialize-css";
import "./App.css";

function App() {
  const { token, login, logout, userId, isAdmin } = useAuth();
  const isAuthenticated = !!token;
  const routes = useRoutes(isAuthenticated, isAdmin);

  
  return (
   
    <AuthContext.Provider
      value={{
        token,
        login,
        logout,
        userId,
        isAuthenticated,
      }}
    >
      <Router>
        <div className="container">{routes}</div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
