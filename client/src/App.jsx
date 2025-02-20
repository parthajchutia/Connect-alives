import React, { lazy, Suspense, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";

import axios from "axios";
import { LayoutLoader } from "./components/AppLayout/Loaders";
import ProtectRoute from "./components/ProtechRoute/ProtectRoute";
import { Server } from "./constants/config";
import AdminLogin from "./pages/admin/AdminLogin";
const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Groups = lazy(() => import("./pages/Groups"));
const Chat = lazy(() => import("./pages/Chat"));
const Dashboard = lazy(() => import("./pages/admin/Dashboard"));

const NotFound = lazy(() => import("./pages/NotFound"));

let user = true;

function App() {
  useEffect(() => {
    const fetchUser = async () => await axios.get(`${Server}/api/v1/user/me`);
    fetchUser();
  }, []);

  return (
    <BrowserRouter>
      <Suspense fallback={<LayoutLoader />}>
        <Routes>
          <Route element={<ProtectRoute user={user} />}>
            <Route path="/" element={<Home />} />
            <Route path="/Chat/:chatId" element={<Chat />} />
            <Route path="/login" element={<Login />} />
            <Route path="/Groups" element={<Groups />} />
          </Route>
          <Route
            path="/login"
            element={
              <ProtectRoute user={!user} redirect="/">
                <Login />
              </ProtectRoute>
            }
          />
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<Dashboard />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
