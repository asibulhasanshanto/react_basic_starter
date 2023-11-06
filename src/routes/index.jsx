import { Routes, Route } from "react-router-dom";
import NotFound from "./../pages/NotFound";
import Demo from "./../pages/Demo";
import Login from "../pages/Login";
import Profile from "../pages/Profile";
import ProtectedRoute from "../pages/ProtectedRoute";
export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Demo />} />
      <Route path="/login" element={<Login />} />

      <Route element={<ProtectedRoute />}>
        <Route path="/profile" element={<Profile />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
