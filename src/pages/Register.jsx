import { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./../context/AuthContext";
import { useFormik } from "formik";
import Loading from "./../components/ui/Loading";
import { registerSchema } from "../schemas";
import { EyeSlashIcon, EyeIcon } from "@heroicons/react/24/outline";
import { UserPlusIcon } from "@heroicons/react/24/outline";

const initialValues = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const Register = () => {
  const navigate = useNavigate();
  const { register, isAuthenticated, user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema: registerSchema,
      onSubmit: async (values) => {
        setError(null);
        setIsLoading(true);
        try {
          await register(
            values.name,
            values.email,
            values.password,
            values.confirmPassword,
          );
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
      navigate("/register");
    }
  }, [isAuthenticated, navigate, user]);
  return (
    <div className="flex h-screen min-h-full flex-1 flex-col justify-center bg-white px-6 py-12 dark:bg-bg_dark dark:text-white lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        {/* <img
      className="mx-auto mt-10 h-60  w-60 rounded-full"
      src="https://i.pravatar.cc/240?img=2"
      alt="Your Company"
    /> */}
        <UserPlusIcon className="mx-auto mt-10 h-40  w-40 rounded-full bg-bg_secondary p-10 text-secondary dark:bg-bg_dark_secondary dark:text-white" />

        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-secondary dark:text-white">
          Create New Account
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
          {/* name field */}
          <div className="">
            <label
              htmlFor="name"
              className="block text-sm font-medium leading-6 text-secondary dark:text-white"
            >
              Name
            </label>
            <div className="mt-2">
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                className="block w-full rounded-md border-0 py-1.5 text-secondary shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary dark:bg-gray-800 dark:text-white dark:ring-white/5 sm:text-sm sm:leading-6"
              />
              {errors.name && touched.name ? (
                <p className="text-sm text-red-500">{errors.name}</p>
              ) : null}
            </div>
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-secondary dark:text-white"
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
                className="block w-full rounded-md border-0 py-1.5 text-secondary shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary dark:bg-gray-800 dark:text-white dark:ring-white/5 sm:text-sm sm:leading-6"
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
                className="block text-sm font-medium leading-6 text-secondary dark:text-white"
              >
                Password
              </label>
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
                  className=" block w-full rounded-md border-0 py-1.5 pr-14 text-secondary shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary dark:bg-gray-800 dark:text-white dark:ring-white/5 sm:text-sm sm:leading-6"
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
                      <EyeIcon className="h-5 w-5 text-gray-400 hover:text-primary" />
                    ) : (
                      <EyeSlashIcon className="h-5 w-5 text-gray-400 hover:text-primary" />
                    )}
                  </div>
                </div>
              </div>

              {errors.password && touched.password ? (
                <p className="text-sm text-red-500">{errors.password}</p>
              ) : null}
            </div>
          </div>

          {/* confirmPassword */}
          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium leading-6 text-secondary dark:text-white"
              >
                Confirm Password
              </label>
            </div>
            <div className="mt-2">
              <div className="relative">
                <input
                  ref={confirmPasswordRef}
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={values.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  autoComplete="current-password"
                  className=" block w-full rounded-md border-0 py-1.5 pr-14 text-secondary shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary dark:bg-gray-800 dark:text-white dark:ring-white/5 sm:text-sm sm:leading-6"
                />
                <div className="absolute bottom-0 right-0 top-0 flex items-center ">
                  <div
                    onClick={(e) => {
                      // stop event bubbling
                      e.preventDefault();
                      // e.stopPropagation();
                      setShowConfirmPassword((prev) => !prev);
                      confirmPasswordRef.current.focus();
                    }}
                    className="flex  h-full cursor-pointer items-center justify-center px-3"
                  >
                    {showConfirmPassword ? (
                      <EyeIcon className="h-5 w-5 text-gray-400 hover:text-primary" />
                    ) : (
                      <EyeSlashIcon className="h-5 w-5 text-gray-400 hover:text-primary" />
                    )}
                  </div>
                </div>
              </div>

              {errors.confirmPassword && touched.confirmPassword ? (
                <p className="text-sm text-red-500">{errors.confirmPassword}</p>
              ) : null}
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="flex w-full justify-center rounded-md bg-primary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-not-allowed  disabled:bg-secondary dark:disabled:bg-bg_dark_secondary"
            >
              {isLoading ? (
                <>
                  Creating ...
                  <Loading height={20} width={30} color="#ffffff" />
                </>
              ) : (
                "Create"
              )}
            </button>
          </div>
        </form>

        <div className="mt-2 flex text-sm">
          <p className="text-secondary">Already have an account?</p>
          <Link to={"/login"} className="ml-2 font-bold text-primary">
            sign In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
