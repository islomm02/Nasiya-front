import { Route, Routes, Navigate } from "react-router-dom";
import { paths } from "../hooks/paths";
import { lazy } from "react";

const Login = lazy(() => import("../pages/Login"));

const LoginRoutes = () => {
  return (
    <Routes>
      <Route path={paths.login} element={<Login />} />
      {/* Har qanday boshqa route token yo‘qligida /login ga yo‘naltiriladi */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

export default LoginRoutes;
