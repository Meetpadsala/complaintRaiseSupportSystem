import "./App.css";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashbord";
import Contact from "./pages/Contact";
import UserDashboard from "./pages/UserDashboard";
import ResetPassword from "./pages/ResetPassword";
import { Routes, Route } from "react-router-dom";

// this is for the user pages direction
import UserDashboardPage from "./pages/user/dashboard/Page";

function App() {
  return (
    <>
      <Routes>
        <Route path={"/"} element={<Home />} />
        <Route path={"/contact"} element={<Contact />} />
        <Route path={"/dashboard"} element={<Dashboard />} />
        <Route path={"/Page"} element={<UserDashboardPage />} />
        <Route path={"/userDashboard"} element={<UserDashboard />} />
        <Route path={"/reset-password"} element={<ResetPassword />} />
      </Routes>
    </>
  );
}

export default App;
