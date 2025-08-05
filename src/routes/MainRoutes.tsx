import { Route, Routes, useNavigate } from "react-router-dom";
import { RoutesList } from "../hooks/paths";
import type { RouteType } from "../@types";
import ProtectedRoute from "./protected";
import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";

const MainRoutes = () => {
  const [cookies] = useCookies(['token']);
  const navigate = useNavigate();
  const token = cookies.token;
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (!token) {
      navigate("/login", { replace: true });
    } else {
      setIsReady(true);
    }
  }, [token, navigate]);

  if (!isReady) return null; // yoki loading bo‘lsa loading chiqarish mumkin

  return (
    <Routes>
      {RoutesList.map((item: RouteType) => (
        <Route
          key={item.id}
          path={item.path}
          element={
            <ProtectedRoute>
              {item.element}
            </ProtectedRoute>
          }
        />
      ))}
    </Routes>
  );
};

export default MainRoutes;
