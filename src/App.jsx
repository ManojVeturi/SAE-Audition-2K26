import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import ThreeDScene from "./components/ThreeDScene";
import HomePage from "./pages/HomePage";

import About from "./pages/About";
import RegisterPage from "./pages/RegisterPage";
import AdminLogin from "./pages/AdminLogin/AdminLogin";
import GoogleAuth from "./pages/GoogleAuth";

import LandingLayout from "./Layouts/LandingLayout";
import MainLayout from "./Layouts/MainLayout";
import AdminDashboard from "./pages/AdminDashboard/AdminDashboard";
import Formsubmitted from "./pages/FormSubmitted/Formsubmitted";
import Background from "./pages/Background/Background";
import PrivateRoute from "./pages/PrivateRoute";
function App() {
  return (
    <>
      <Routes>
        <Route
          path="/googleAuth"
          element={
            <MainLayout>
              <GoogleAuth />
            </MainLayout>
          }
        />

        <Route
          path="/"
          element={
            <MainLayout>
              <Background/>
              <HomePage />
            </MainLayout>
          }
        />

        <Route
          path="/aboutSae"
          element={
            <MainLayout>
              <About />
            </MainLayout>
          }
        />

        <Route
          path="/register"
          element={
            <MainLayout>
              <Background/>
              <RegisterPage />
            </MainLayout>
          }
        />
        <Route
          path="/adminLogin"
          element={
            <MainLayout>
              <AdminLogin />
            </MainLayout>
          }
        />
        <Route 
          path="/sae-admin-dashboard"
          element={
            <PrivateRoute>
            <MainLayout>
              <AdminDashboard />
            </MainLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/formSubmitted"
          element={
            <MainLayout>
              <Background/>
              <Formsubmitted />
            </MainLayout>
          }
        />
      </Routes>
    </>
  );
}

export default App;
