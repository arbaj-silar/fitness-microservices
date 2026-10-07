import { Box, Button, Typography } from "@mui/material";
import { useContext, useEffect } from "react";
import { AuthContext } from "react-oauth2-code-pkce";
import { useDispatch } from "react-redux";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import "./App.css";

import { setCredentials } from "./store/authSlice";

import ActivityForm from "./components/ActivityForm";
import ActivityList from "./components/ActivityList";
import ActivityDetails from "./components/ActivityDetails";


const ActivitiesPage = () => {
  return (
    <Box className="app-content">

      <Box className="form-box">
        <Typography
          variant="h5"
          sx={{
            color: "#ffffff",
            fontWeight: "bold",
            mb: 3,
          }}
        >
          Add New Activity
        </Typography>

        <ActivityForm
          onActivityAdded={() => window.location.reload()}
        />
      </Box>

      <Box>
        <Typography
          variant="h5"
          sx={{
            color: "#ffffff",
            fontWeight: "bold",
            mb: 3,
          }}
        >
          My Activities
        </Typography>

        <ActivityList />
      </Box>

    </Box>
  );
};



function App() {

  const {
    token,
    tokenData,
    logIn,
    logOut,
  } = useContext(AuthContext);

  const dispatch = useDispatch();

  useEffect(() => {

    if (token) {

      localStorage.setItem("token", token);

      if (tokenData?.sub) {
        localStorage.setItem(
          "userId",
          tokenData.sub
        );
      }

      dispatch(
        setCredentials({
          token,
          user: tokenData,
        })
      );

    }

  }, [token, tokenData, dispatch]);


  const handleLogout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("userId");

    logOut();
  };


  return (
    <Router>

      <Box className="app">

        {!token ? (

          <Box className="login-container">

            <Box className="login-box">

              <Typography
                variant="h3"
                sx={{
                  color: "#ffffff",
                  fontWeight: "bold",
                  mb: 2,
                }}
              >
                Fitness Tracker
              </Typography>


              <Typography
                variant="h6"
                sx={{
                  color: "#ffffff",
                  mb: 1,
                }}
              >
                Welcome Back
              </Typography>


              <Typography
                variant="body1"
                sx={{
                  color: "#ffe6eb",
                  mb: 4,
                }}
              >
                Track your workouts and get AI-powered
                fitness recommendations.
              </Typography>


              <Button
                variant="contained"
                size="large"
                className="crimson-button"
                onClick={logIn}
                sx={{
                  minWidth: 180,
                }}
              >
                LOGIN
              </Button>

            </Box>

          </Box>

        ) : (
          <>

            {/* Header */}

            <Box className="app-header">

              <Typography className="app-title">
                🏋️ Fitness Tracker
              </Typography>


              <Button
                variant="contained"
                className="crimson-button"
                onClick={handleLogout}
              >
                Logout
              </Button>

            </Box>

            <Routes>

              <Route
                path="/activities"
                element={<ActivitiesPage />}
              />

              <Route
                path="/activities/:id"
                element={
                  <Box className="app-content">
                    <ActivityDetails />
                  </Box>
                }
              />

              <Route
                path="/"
                element={
                  <Navigate
                    to="/activities"
                    replace
                  />
                }
              />

            </Routes>

          </>

        )}

      </Box>

    </Router>
  );
}


export default App;
