import { Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import PrivateRoute from "./utils/PrivateRoute";
import { useState } from "react";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));

  return (
    <>
      <Navbar token={token} setToken={setToken} />
      <Routes>
        <Route path="*" element={<Navigate to="/" />} />
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route path="/signup" element={<Signup setToken={setToken} />} />

        <Route
          path="/home"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />

        <Route
          path="/"
          element={<Navigate to={token ? "/home" : "/login"} />}
        />
      </Routes>
    </>
  );
}

export default App;
