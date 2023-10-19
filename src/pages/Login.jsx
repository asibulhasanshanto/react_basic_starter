import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./../context/AuthContext";
import { useFormik } from "formik";
import Loading from "./../components/ui/Loading";
import { loginSchema } from "../schemas";
import { EyeSlashIcon, EyeIcon } from "@heroicons/react/24/outline";

const initialValues = {
  email: "",
  password: "",
};

const Login = () => {
  const navigate = useNavigate();
  const { login, isAuthenticated, user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const passwordRef = useRef(null);

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema: loginSchema,
      onSubmit: async (values) => {
        setError(null);
        setIsLoading(true);
        try {
          await login(values.email, values.password);
        } catch (err) {
          setError(err.message);
        }
        setIsLoading(false);
      },
    });

  useEffect(() => {
    if (isAuthenticated && user !== null) {
      navigate("/");
    } else if (isAuthenticated && user === null) {
      navigate("/not-found");
    } else {
      navigate("/login");
    }
  }, [isAuthenticated, navigate, user]);
  return (
    <div className="flex h-screen min-h-full flex-1 flex-col justify-center bg-white px-6 py-12 dark:bg-bg_dark dark:text-white lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className="mx-auto mt-10 h-60  w-60"
          src="https://i.pravatar.cc/240?img=2"
          alt="Your Company"
        />

        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 dark:text-white">
          Sign in to your account
        </h2>
        {error && (
          <div className="error mt-5 w-full rounded-md bg-red-500 p-4 font-bold text-white">
            {error}
          </div>
        )}
      </div>

      <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
        <form
          onSubmit={handleSubmit}
          className="space-y-6"
          action="#"
          method="POST"
        >
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900 dark:text-white"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                className="focus:ring-primary block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset dark:bg-gray-800 dark:text-white dark:ring-white/5 sm:text-sm sm:leading-6"
              />
              {errors.email && touched.email ? (
                <p className="text-sm text-red-500">{errors.email}</p>
              ) : null}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900 dark:text-white"
              >
                Password
              </label>
              <div className="text-sm">
                <div className="text-primary hover:text-primary font-semibold">
                  Forgot password?
                </div>
              </div>
            </div>
            <div className="mt-2">
              <div className="relative">
                <input
                  ref={passwordRef}
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  autoComplete="current-password"
                  className=" focus:ring-primary block w-full rounded-md border-0 py-1.5 pr-14 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset dark:bg-gray-800 dark:text-white dark:ring-white/5 sm:text-sm sm:leading-6"
                />
                <div className="absolute bottom-0 right-0 top-0 flex items-center ">
                  <div
                    onClick={(e) => {
                      // stop event bubbling
                      e.preventDefault();
                      // e.stopPropagation();
                      setShowPassword((prev) => !prev);
                      passwordRef.current.focus();
                    }}
                    className="flex  h-full cursor-pointer items-center justify-center px-3"
                  >
                    {showPassword ? (
                      <EyeIcon className="hover:text-primary h-5 w-5 text-gray-400" />
                    ) : (
                      <EyeSlashIcon className="hover:text-primary h-5 w-5 text-gray-400" />
                    )}
                  </div>
                </div>
              </div>

              {errors.password && touched.password ? (
                <p className="text-sm text-red-500">{errors.password}</p>
              ) : null}
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="bg-primary hover:bg-primary focus-visible:outline-primary disabled:bg-secondary flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2  disabled:cursor-not-allowed dark:disabled:bg-bg_dark_secondary"
            >
              {isLoading ? (
                <>
                  Signing in
                  <Loading height={20} width={30} color="#ffffff" />
                </>
              ) : (
                "Sign in"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
