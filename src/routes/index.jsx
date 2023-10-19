import { Routes, Route } from "react-router-dom";
import NotFound from "./../pages/NotFound";
import Demo from "./../pages/Demo";
import Login from "../pages/Login";
import Profile from "../pages/Profile";
import ProtectedLayout from "../pages/ProtectedLayout";
export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Demo />} />
      <Route path="/login" element={<Login />} />

      <Route
        path="/profile"
        element={
          <ProtectedLayout>
            <Profile />
          </ProtectedLayout>
        }
      />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
