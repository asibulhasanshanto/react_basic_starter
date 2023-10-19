import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useFormik } from "formik";
import Loading from "../components/ui/Loading";
import { EyeSlashIcon, EyeIcon } from "@heroicons/react/24/outline";
import { updateMeSchema, updatePasswordSchema } from "../schemas";
import toast from "react-hot-toast";
import Layout from "../components/layouts/Layout";
import { Link } from "react-router-dom";

const Profile = () => {
  const { user, logout } = useAuth();
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const initialUserValues = {
    name: user?.username,
  };
  const initialPasswordValues = {
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  };

  const {
    values: updateMeValues,
    errors: updateMeErrors,
    touched: updateMeTouched,
    handleChange: updateMeHandleChange,
    handleSubmit: handleUpdateMeSubmit,
    isSubmitting: isUpdateMeSubmitting,
  } = useFormik({
    initialValues: initialUserValues,
    validationSchema: updateMeSchema,
    onSubmit: async (values, actions) => {
      toast.success("updated " + values.name);
      actions.resetForm({
        values: {
          name: values.name,
        },
      });
    },
  });

  const {
    values: updatePasswordValues,
    errors: updatePasswordErrors,
    touched: updatePasswordTouched,
    handleChange: updatePasswordHandleChange,
    handleSubmit: handleUpdatePasswordSubmit,
    isSubmitting: isUpdatePasswordSubmitting,
  } = useFormik({
    initialValues: initialPasswordValues,
    validationSchema: updatePasswordSchema,
    onSubmit: async () => {
      toast.success("Password updated successfully");
      logout();
    },
  });

  return (
    <Layout>
      <div className="container">
        <div className="text-secondary relative  p-4">
          {/* go to home button */}
          <Link
            to={"/"}
            className="text-secondary rounded-md bg-bg_secondary px-3 py-2 dark:bg-bg_dark_secondary"
          >
            go home
          </Link>
          {/* Settings forms */}
          <div className="divide-y divide-black/5 dark:divide-white/5">
            <div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
              <div>
                <h2 className="text-secondary text-base font-semibold leading-7">
                  Personal Information
                </h2>
              </div>

              <form onSubmit={handleUpdateMeSubmit} className="md:col-span-2">
                <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
                  <div className="col-span-full flex items-center gap-x-8">
                    <img
                      src={user?.avatar}
                      alt=""
                      className="h-24 w-24 flex-none rounded-lg bg-bg object-cover dark:bg-bg_dark"
                    />
                  </div>

                  <div className="sm:col-span-full">
                    <label
                      htmlFor="name"
                      className="text-secondary block text-sm font-medium leading-6"
                    >
                      Name
                    </label>
                    <div className="mt-2">
                      <div className="relative">
                        <input
                          type="text"
                          name="name"
                          id="name"
                          value={updateMeValues.name}
                          onChange={updateMeHandleChange}
                          onBlur={updateMeHandleChange}
                          autoComplete="given-name"
                          className="text-secondary focus:ring-primary dark:focus:ring-primary block w-full rounded-md border-0 bg-bg_secondary py-1.5 shadow-sm ring-1 ring-inset ring-black/10 focus:ring-2 focus:ring-inset dark:bg-bg_dark_secondary dark:ring-white/10 sm:text-sm sm:leading-6"
                        />
                      </div>
                      {updateMeErrors.name && updateMeTouched.name ? (
                        <p className="text-sm text-red-500">
                          {updateMeErrors.name}
                        </p>
                      ) : null}
                    </div>
                  </div>

                  <div className="col-span-full">
                    <label
                      htmlFor="email"
                      className="text-secondary block text-sm font-medium leading-6"
                    >
                      Email address
                    </label>
                    <div className="mt-2">
                      <input
                        disabled
                        id="email"
                        name="email"
                        type="email"
                        value={"abcd@gmail.com"}
                        autoComplete="email"
                        className="text-secondary focus:ring-primary block w-full rounded-md border-0 bg-bg_secondary py-1.5 shadow-sm ring-1 ring-inset ring-black/10 focus:ring-2 focus:ring-inset disabled:cursor-not-allowed dark:bg-bg_dark_secondary dark:ring-white/10 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex">
                  <button
                    type="submit"
                    disabled={isUpdateMeSubmitting}
                    className="bg-primary disabled:bg-secondary flex rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline  focus-visible:outline-2  focus-visible:outline-offset-2 dark:disabled:bg-bg_dark_secondary"
                  >
                    {isUpdateMeSubmitting && (
                      <Loading height={20} width={30} color="#ffffff" />
                    )}
                    <p className="ml-1">Save</p>
                  </button>
                </div>
              </form>
            </div>

            <div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
              <div>
                <h2 className="text-secondary text-base font-semibold leading-7">
                  Change password
                </h2>
                <p className="mt-1 text-sm leading-6 text-gray-400">
                  Update your password associated with your account.
                </p>
              </div>

              <form
                onSubmit={handleUpdatePasswordSubmit}
                className="md:col-span-2"
              >
                <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
                  <div className="col-span-full">
                    <label
                      htmlFor="current-password"
                      className="text-secondary block text-sm font-medium leading-6"
                    >
                      Current password
                    </label>
                    <div className="mt-2">
                      <div className="relative">
                        <input
                          id="current-password"
                          name="currentPassword"
                          type={showCurrentPassword ? "text" : "password"}
                          value={updatePasswordValues.currentPassword}
                          onChange={updatePasswordHandleChange}
                          onBlur={updatePasswordHandleChange}
                          autoComplete="current-password"
                          className="text-secondary focus:ring-primary block w-full rounded-md border-0 bg-bg_secondary py-1.5 shadow-sm ring-1 ring-inset ring-black/10 focus:ring-2 focus:ring-inset dark:bg-bg_dark_secondary dark:ring-white/10 sm:text-sm sm:leading-6"
                        />
                        <div className="absolute bottom-0 right-0 top-0 flex items-center ">
                          <div
                            onClick={(e) => {
                              // stop event bubbling
                              e.preventDefault();
                              // e.stopPropagation();
                              setShowCurrentPassword((prev) => !prev);
                            }}
                            className="flex  h-full cursor-pointer items-center justify-center px-3"
                          >
                            {showCurrentPassword ? (
                              <EyeIcon className="hover:text-primary h-5 w-5 text-gray-400" />
                            ) : (
                              <EyeSlashIcon className="hover:text-primary h-5 w-5 text-gray-400" />
                            )}
                          </div>
                        </div>
                      </div>

                      {updatePasswordErrors.currentPassword &&
                      updatePasswordTouched.currentPassword ? (
                        <p className="text-sm text-red-500">
                          {updatePasswordErrors.currentPassword}
                        </p>
                      ) : null}
                    </div>
                  </div>

                  <div className="col-span-full">
                    <label
                      htmlFor="new-password"
                      className="text-secondary block text-sm font-medium leading-6"
                    >
                      New password
                    </label>
                    <div className="mt-2">
                      <div className="relative">
                        <input
                          id="new-password"
                          name="newPassword"
                          type={showNewPassword ? "text" : "password"}
                          value={updatePasswordValues.newPassword}
                          onChange={updatePasswordHandleChange}
                          onBlur={updatePasswordHandleChange}
                          autoComplete="new-password"
                          className="text-secondary focus:ring-primary block w-full rounded-md border-0 bg-bg_secondary py-1.5 shadow-sm ring-1 ring-inset ring-black/10 focus:ring-2 focus:ring-inset dark:bg-bg_dark_secondary dark:ring-white/10 sm:text-sm sm:leading-6"
                        />
                        <div className="absolute bottom-0 right-0 top-0 flex items-center ">
                          <div
                            onClick={(e) => {
                              // stop event bubbling
                              e.preventDefault();
                              // e.stopPropagation();
                              setShowNewPassword((prev) => !prev);
                            }}
                            className="flex  h-full cursor-pointer items-center justify-center px-3"
                          >
                            {showNewPassword ? (
                              <EyeIcon className="hover:text-primary h-5 w-5 text-gray-400" />
                            ) : (
                              <EyeSlashIcon className="hover:text-primary h-5 w-5 text-gray-400" />
                            )}
                          </div>
                        </div>
                      </div>
                      {updatePasswordErrors.newPassword &&
                      updatePasswordTouched.newPassword ? (
                        <p className="text-sm text-red-500">
                          {updatePasswordErrors.newPassword}
                        </p>
                      ) : null}
                    </div>
                  </div>

                  <div className="col-span-full">
                    <label
                      htmlFor="confirm-password"
                      className="text-secondary block text-sm font-medium leading-6"
                    >
                      Confirm password
                    </label>
                    <div className="mt-2">
                      <div className="relative">
                        <input
                          id="confirm-password"
                          name="confirmPassword"
                          value={updatePasswordValues.confirmPassword}
                          onChange={updatePasswordHandleChange}
                          onBlur={updatePasswordHandleChange}
                          type={showConfirmPassword ? "text" : "password"}
                          autoComplete="new-password"
                          className="text-secondary focus:ring-primary block w-full rounded-md border-0 bg-bg_secondary py-1.5 shadow-sm ring-1 ring-inset ring-black/10 focus:ring-2 focus:ring-inset dark:bg-bg_dark_secondary dark:ring-white/10 sm:text-sm sm:leading-6"
                        />
                        <div className="absolute bottom-0 right-0 top-0 flex items-center ">
                          <div
                            onClick={(e) => {
                              // stop event bubbling
                              e.preventDefault();
                              // e.stopPropagation();
                              setShowConfirmPassword((prev) => !prev);
                            }}
                            className="flex  h-full cursor-pointer items-center justify-center px-3"
                          >
                            {showConfirmPassword ? (
                              <EyeIcon className="hover:text-primary h-5 w-5 text-gray-400" />
                            ) : (
                              <EyeSlashIcon className="hover:text-primary h-5 w-5 text-gray-400" />
                            )}
                          </div>
                        </div>
                      </div>
                      {updatePasswordErrors.confirmPassword &&
                      updatePasswordTouched.confirmPassword ? (
                        <p className="text-sm text-red-500">
                          {updatePasswordErrors.confirmPassword}
                        </p>
                      ) : null}
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex">
                  <button
                    type="submit"
                    disabled={isUpdatePasswordSubmitting}
                    className="bg-primary disabled:bg-secondary flex rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline  focus-visible:outline-2 focus-visible:outline-offset-2 dark:disabled:bg-bg_dark_secondary "
                  >
                    {isUpdatePasswordSubmitting && (
                      <Loading height={20} width={30} color="#ffffff" />
                    )}
                    <p className="ml-1">Save</p>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
