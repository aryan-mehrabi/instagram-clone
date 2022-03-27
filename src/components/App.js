import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { connect } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../api/Firebase";
import Home from "../pages/Home";
import Dashboard from "../pages/Dashboard";
import SignUp from "../pages/SignUp";
import Post from "../pages/Post";
import User from "../pages/User";
import { authChanged } from "../actions";

const App = ({ authChanged }) => {
  useEffect(() => {
    onAuthStateChanged(auth, user => {
      if (user) {
        authChanged(user.uid);
      } else {
        authChanged();
      }
    });
  }, []);

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/p/:post" element={<Post />} />
          <Route path="/:userId" element={<User />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default connect(null, { authChanged })(App);
