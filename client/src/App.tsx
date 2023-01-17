import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Callback from "components/Callback";
import Home from "components/Home";
import Layout from "components/Layout";
import Login from "components/Login";
import Profile from "components/Profile";
import ProtectedRoute from "components/ProtectedRoute";
import { magic } from "lib/magic";

function App() {
  const [user, setUser] = useState<any>(null);

  const checkLoggedIn = async () => {
    const isLoggedIn = await magic.user.isLoggedIn();
    if (isLoggedIn) {
      const userData = await magic.user.getMetadata();
      setUser(userData);
    } else {
      setUser(null);
    }
  };

  useEffect(() => {
    checkLoggedIn();
  }, []);

  const logout = () => {
    magic.user.logout().then(() => {
      setUser({ user: null });
      window.location.href = "/login";
    });
  };

  return (
    <>
      <BrowserRouter>
        <Layout user={user} logout={logout}>
          <Routes>
            <Route path="/" element={<Home user={user} />} />
            <Route
              path="/login"
              element={
                <ProtectedRoute>
                  <Login setUser={setUser}/>
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile user={user} setUser={setUser}/>
                </ProtectedRoute>
              }
            />
            <Route path="/callback" element={<Callback setUser={setUser}/>} />
          </Routes>
        </Layout>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
}

export default App;
