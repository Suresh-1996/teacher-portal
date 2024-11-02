// src/App.js
import React from "react";
import {
  BrowserRouter as Router, //browser naviagtion,ex:home page to about page(not api route)
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { useSelector } from "react-redux";
import AuthForm from "./components/AuthForm";
import Dashboard from "./components/Dashboard";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  const { user } = useSelector((state) => state.auth); // useSeclector is redux hook that access redux state.auth and descructuring user object
  //{Object Descructuring}

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      {/* wrapper */}
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              user ? (
                <Navigate to="/dashboard" />
              ) : (
                <AuthForm isSignUp={false} />
              )
            }
          />
          <Route path="/signup" element={<AuthForm isSignUp={true} />} />
          <Route
            path="/dashboard"
            element={user ? <Dashboard /> : <Navigate to="/" />}
          />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
