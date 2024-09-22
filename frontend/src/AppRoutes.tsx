import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { Loading } from "@/components/Loading";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/context/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import { ThemeProvider } from "@/components/theme-provider";

const Home = lazy(() => import("@/pages/Home"));
const Login = lazy(() => import("@/pages/Login"));
const Register = lazy(() => import("@/pages/Register"));
const EmployeeList = lazy(() => import("@/pages/EmployeeList"));
const AddEmployee = lazy(() => import("@/pages/AddEmployee"));
const UpdateEmployee = lazy(() => import("@/pages/UpdateEmployee"));

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
              <Route
                path="/update_employee/:id"
                element={
                  <ProtectedRoute>
                    <UpdateEmployee />
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
