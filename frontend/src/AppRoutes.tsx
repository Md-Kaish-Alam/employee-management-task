import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { AuthProvider } from "@/context/AuthContext";
import { Loading } from "@/components/Loading";
import ProtectedRoute from "@/components/ProtectedRoute";
import { ThemeProvider } from "./components/theme-provider";
import { Toaster } from "./components/ui/toaster";

const Home = lazy(() => import("@/pages/Home"));
const Login = lazy(() => import("@/pages/Login"));
const Register = lazy(() => import("@/pages/Register"));
const EmployeeList = lazy(() => import("@/pages/EmployeeList"));
const AddEmployee = lazy(() => import("@/pages/AddEmployee"));

const AppRoutes = () => {
  return (
    <Router>
      <ThemeProvider defaultTheme="system">
        <AuthProvider>
          <Suspense fallback={<Loading />}>
            <Routes>
              {/* Public routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              {/* Protected routes */}
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <Home />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/employee_list"
                element={
                  <ProtectedRoute>
                    <EmployeeList />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/add_employee"
                element={
                  <ProtectedRoute>
                    <AddEmployee />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </Suspense>
        </AuthProvider>
        <Toaster />
      </ThemeProvider>
    </Router>
  );
};

export default AppRoutes;
