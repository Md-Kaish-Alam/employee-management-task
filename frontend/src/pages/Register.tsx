import axios from "axios";
import { useState } from "react";
import { Ban } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Logo } from "@/components/Logo";

interface FormValues {
  username: string;
  password: string;
  confirmPassword: string;
}

const defaultFormValues = {
  username: "",
  password: "",
  confirmPassword: "",
};

const BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

const Register = () => {
  const [formValues, setFormValues] = useState<FormValues>(defaultFormValues);
  const [errors, setErrors] = useState<Partial<FormValues>>({});
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<FormValues> = {};

    // Validate Username
    if (!formValues.username) {
      newErrors.username = "Username is required";
    } else if (
      formValues.username.length <= 8 ||
      formValues.username.length >= 20
    ) {
      newErrors.username = "Username must be between 8 and 20 characters long";
    }

    // validate password
    if (!formValues.password) {
      newErrors.password = "Password is required";
    } else if (
      formValues.password.length <= 8 ||
      formValues.password.length >= 20
    ) {
      newErrors.password = "Password must be between 8 and 20 characters long";
    } else if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
        formValues.password
      )
    ) {
      newErrors.password =
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character";
    }

    // Validate confirm password
    if (!formValues.confirmPassword) {
      newErrors.confirmPassword = "Confirm Password is required";
    } else if (formValues.confirmPassword !== formValues.password) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newErrors: Partial<FormValues> = {};

    if (validateForm()) {
      try {
        const response = await axios.post(`${BASE_URL}/auth/register`, {
          username: formValues.username,
          password: formValues.password,
        });

        if (response.status === 201) {
          navigate("/login");
        } else if (response.status === 409) {
          newErrors.username = "Username already exists";
        } else {
          alert(response.data.message || "Registration failed");
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          // This is an Axios error
          if (error.response && error.response.data) {
            alert(error.response.data.error || "Registration failed");
          } else {
            alert("Registration failed");
          }
        } else {
          // This is a general error
          alert("An unexpected error occurred");
        }
      }
      setFormValues(defaultFormValues);
    } else {
      alert("Form Validation Failed. Please try again.");
    }
  };
  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center gap-4 px-6 py-8 mx-auto md:h-screen lg:py-0">
        <Logo />
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign in to your account
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              {/* username */}
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
              {errors.username && (
                <div className="flex items-center gap-2 p-4 mb-4 text-sm text-red-500 rounded-lg bg-red-50">
                  <Ban className="h-4 w-4" />
                  <p className="font-medium">{errors.username}</p>
                </div>
              )}

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
              {errors.password && (
                <div className="flex items-center gap-2 p-4 mb-4 text-sm text-red-500 rounded-lg bg-red-50">
                  <Ban className="h-4 w-4" />
                  <p className="font-medium">{errors.password}</p>
                </div>
              )}

              {/* confirm password */}
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Confirm Password
                </label>
                <input
                  type="text"
                  name="confirmPassword"
                  value={formValues.confirmPassword}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="••••••••"
                  required
                />
              </div>
              {errors.confirmPassword && (
                <div className="flex items-center gap-2 p-4 mb-4 text-sm text-red-500 rounded-lg bg-red-50">
                  <Ban className="h-4 w-4" />
                  <p className="font-medium">{errors.confirmPassword}</p>
                </div>
              )}
              <button
                type="submit"
                className="w-full text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg px-5 py-2.5 text-center"
              >
                Sign In
              </button>
            </form>
            <div className="mt-6 text-sm text-gray-600 dark:text-gray-400">
              Already have an account?{" "}
              <a href="/login" className="text-blue-600">
                Sign Up
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
