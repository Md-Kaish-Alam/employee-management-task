import axios from "axios";
import { Ban } from "lucide-react";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import AuthContext from "../context/AuthContext";
import { Logo } from "@/components/Logo";
interface FormValues {
  username: string;
  password: string;
}

const defaultFormValues = {
  username: "",
  password: "",
};

const BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

const Login = () => {
  const [formValues, setFormValues] = useState<FormValues>(defaultFormValues);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${BASE_URL}/auth/login`, formValues);

      if (response.status === 200) {
        const { token, user } = response.data;
        login(token, user);
        navigate("/");
      } else if (response.status === 401) {
        setError("Invalid credentials");
      } else {
        alert(response.data.message || "Registration failed");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // This is an Axios error
        if (error.response && error.response.data) {
          alert(error.response.data.error || "Login failed");
        } else {
          alert("Login failed");
        }
      } else {
        // This is a general error
        alert("An unexpected error occurred");
      }
      setFormValues(defaultFormValues);
    }
  };
  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center gap-4 px-6 py-8 mx-auto md:h-screen lg:py-0">
        <Logo />
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign Up to your account
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              {/* Email Address */}
              <div>
                <label
                  htmlFor="username"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Enter Username
                </label>
                <input
                  type="text"
                  name="username"
                  value={formValues.username}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="username"
                  required
                />
              </div>

              {/* password */}
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Enter Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={formValues.password}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="••••••••"
                  required
                />
              </div>
              {error && (
                <div className="flex items-center gap-2 p-4 mb-4 text-sm text-red-500 rounded-lg bg-red-50">
                  <Ban className="h-4 w-4" />
                  <p className="font-medium">{error}</p>
                </div>
              )}
              <button
                type="submit"
                className="w-full text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg px-5 py-2.5 text-center"
              >
                Sign Up
              </button>
            </form>
            <div className="mt-6 text-sm text-gray-600 dark:text-gray-400">
              Don't have an account?{" "}
              <a href="/register" className="text-blue-600">
                Sign In
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
