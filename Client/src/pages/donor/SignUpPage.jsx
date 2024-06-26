/* eslint-disable react-refresh/only-export-components */
import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/img/donor/logo.svg";
import useFileUploader from "../../components/Common/useFileUploader";
import API from "../../components/Common/api";
import { Toaster, toast } from "sonner";
import {
  validatePassword,
  validatePhoneNumber,
} from "../../components/Common/Validation";
import { useTranslation } from "react-i18next";

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { handleFilesChange, uploadFiles } = useFileUploader();
  const [formData, setFormData] = useState({
    fullname: "",
    phoneNumber: "",
    email: "",
    country: "",
    city: "",
    image: [],
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };
  const resetForm = () => {
    setFormData({
      fullname: "",
      phoneNumber: "",
      email: "",
      country: "",
      city: "",
      image: [],
      password: "",
      confirmPassword: "",
    });
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      setIsLoading(false);
      return;
    }

    if (!validatePassword(formData.password)) {
      toast.error(
        "Password must be at least 6 characters long and include uppercase letters, numbers, and symbols.",
      );
      setIsLoading(false);
      return;
    }

    if (!validatePhoneNumber(formData.phoneNumber)) {
      toast.error(
        "Phone number must be 10 digits long and start with 09 or 07.",
      );
      setIsLoading(false);
      return;
    }
    try {
      const imageUrl = await uploadFiles();
      const updatedFormData = {
        ...formData,
        image: imageUrl,
      };

      const response = await API.post("/donor/register", updatedFormData);
      toast.success(response.data);

      resetForm();
      navigate("/signin");
    } catch (error) {
      toast.error("There was an error!", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <section className="bg-white dark:bg-gray-900">
        <Toaster richColors />
        <div className="flex justify-center">
          <div className="mx-auto my-auto mt-7 flex w-full max-w-3xl items-center rounded-xl p-8 shadow-2xl lg:w-2/5 lg:px-12">
            <div className="w-full">
              <div className="mx-auto flex justify-center">
                <img className="h-7 w-auto sm:h-10" src={logo} alt="Logo" />
              </div>
              <div className="mt-6 flex items-center justify-center">
                <Link
                  to="/signin"
                  className="w-1/3 border-b pb-4 text-center font-medium capitalize text-gray-500 dark:border-gray-400 dark:text-gray-300"
                >
                  {t("signin")}
                </Link>
                <a className="w-1/3 border-b-2 border-blue-500 pb-4 text-center font-medium capitalize text-gray-800 dark:border-blue-400 dark:text-white">
                  {t("signup")}
                </a>
              </div>
              <form onSubmit={handleSubmit} className="mt-8 ">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div>
                    <label
                      htmlFor="fullname"
                      className="mb-2 block text-sm text-gray-600 dark:text-gray-200"
                    >
                      {t("fullname")}
                    </label>
                    <input
                      type="text"
                      id="fullname"
                      name="fullname"
                      value={formData.fullname}
                      onChange={handleChange}
                      placeholder="John Snow"
                      className="block w-full rounded-md border-gray-200 px-4 py-3 text-sm focus:border-blue-500 focus:ring-blue-500 disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="phoneNumber"
                      className="mb-2 block text-sm text-gray-600 dark:text-gray-200"
                    >
                      {t("phonenum")}
                    </label>
                    <input
                      type="text"
                      name="phoneNumber"
                      id="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      placeholder="XXX-XX-XXXX-XXX"
                      className="block w-full rounded-md border-gray-200 px-4 py-3 text-sm focus:border-blue-500 focus:ring-blue-500 disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="mb-2 block text-sm text-gray-600 dark:text-gray-200"
                    >
                      {t("emailaddress")}
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="johnsnow@example.com"
                      className="block w-full rounded-md border-gray-200 px-4 py-3 text-sm focus:border-blue-500 focus:ring-blue-500 disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="country"
                      className="mb-2 block text-sm text-gray-600 dark:text-gray-200"
                    >
                      {t("country")}
                    </label>
                    <input
                      type="text"
                      name="country"
                      id="country"
                      value={formData.country}
                      onChange={handleChange}
                      placeholder="Country"
                      className="block w-full rounded-md border-gray-200 px-4 py-3 text-sm focus:border-blue-500 focus:ring-blue-500 disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="city"
                      className="mb-2 block text-sm text-gray-600 dark:text-gray-200"
                    >
                      {t("city")}
                    </label>
                    <input
                      type="text"
                      name="city"
                      id="city"
                      value={formData.city}
                      onChange={handleChange}
                      placeholder="City"
                      className="block w-full rounded-md border-gray-200 px-4 py-3 text-sm focus:border-blue-500 focus:ring-blue-500 disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="image"
                      className="mb-3 block text-sm text-gray-600 dark:text-gray-200"
                    >
                      {t("attachprofile")}
                    </label>
                    <input
                      type="file"
                      name="image"
                      id="image"
                      accept="image/*"
                      ref={inputRef}
                      onChange={handleFilesChange}
                      className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-white outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-primary-400 file:px-5 file:py-3 file:text-white hover:file:bg-blue-700 focus:border-primary-200 active:border-primary-200 disabled:cursor-default disabled:bg-white dark:file:bg-white/30 dark:file:text-white"
                    />
                  </div>

                  <div className="max-w-sm">
                    <div className="flex">
                      <div className="relative flex-1">
                        <label
                          htmlFor="password"
                          className="mb-2 block text-sm text-gray-600 dark:text-gray-200"
                        >
                          {t("password")}
                        </label>
                        <input
                          name="password"
                          type={showPassword ? "text" : "password"}
                          value={formData.password}
                          onChange={handleChange}
                          id="hs-strong-password-with-indicator-and-hint-in-popover"
                          className="block w-full rounded-md border-gray-200 px-4 py-3 text-sm focus:border-blue-500 focus:ring-blue-500 disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                          placeholder="Enter password"
                        />
                        <button
                          type="button"
                          onClick={togglePasswordVisibility}
                          className="absolute right-0 top-7 p-3.5"
                        >
                          <svg
                            className="size-3.5 flex-shrink-0 text-gray-400 dark:text-neutral-600"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path
                              className={showPassword ? "hidden" : "block"}
                              d="M9.88 9.88a3 3 0 1 0 4.24 4.24"
                            ></path>
                            <path
                              className={showPassword ? "hidden" : "block"}
                              d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"
                            ></path>
                            <path
                              className={showPassword ? "hidden" : "block"}
                              d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"
                            ></path>
                            <line
                              className={showPassword ? "hidden" : "block"}
                              x1="2"
                              x2="22"
                              y1="2"
                              y2="22"
                            ></line>
                            <path
                              className={showPassword ? "block" : "hidden"}
                              d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"
                            ></path>
                            <circle
                              className={showPassword ? "block" : "hidden"}
                              cx="12"
                              cy="12"
                              r="3"
                            ></circle>
                          </svg>
                        </button>
                        <div
                          id="hs-strong-password-popover"
                          className="absolute z-10 hidden w-full rounded-lg bg-white p-4 shadow-md dark:divide-neutral-700 dark:border dark:border-neutral-700 dark:bg-neutral-800"
                        >
                          <div
                            id="hs-strong-password-in-popover"
                            data-hs-strong-password='{
                "target": "#hs-strong-password-with-indicator-and-hint-in-popover",
                "hints": "#hs-strong-password-popover",
                "stripClasses": "hs-strong-password:opacity-100 hs-strong-password-accepted:bg-blue-500 h-2 flex-auto rounded-full bg-blue-500 opacity-50 mx-1",
                "mode": "popover"
              }'
                            className="-mx-1 mt-2 flex"
                          ></div>

                          <h4 className="mt-3 text-sm font-semibold text-gray-800 dark:text-white">
                            Your password must contain:
                          </h4>

                          <ul className="space-y-1 text-sm text-gray-500 dark:text-neutral-500">
                            <li
                              data-hs-strong-password-hints-rule-text="min-length"
                              className="hs-strong-password-active:text-blue-500 flex items-center gap-x-2"
                            >
                              <span className="hidden" data-check="">
                                <svg
                                  className="size-4 flex-shrink-0"
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                >
                                  <polyline points="20 6 9 17 4 12"></polyline>
                                </svg>
                              </span>
                              <span data-uncheck="">
                                <svg
                                  className="size-4 flex-shrink-0"
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                >
                                  <path d="M18 6 6 18"></path>
                                  <path d="m6 6 12 12"></path>
                                </svg>
                              </span>
                              Minimum number of characters is 6.
                            </li>
                            <li
                              data-hs-strong-password-hints-rule-text="lowercase"
                              className="hs-strong-password-active:text-blue-500 flex items-center gap-x-2"
                            >
                              <span className="hidden" data-check="">
                                <svg
                                  className="size-4 flex-shrink-0"
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                >
                                  <polyline points="20 6 9 17 4 12"></polyline>
                                </svg>
                              </span>
                              <span data-uncheck="">
                                <svg
                                  className="size-4 flex-shrink-0"
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                >
                                  <path d="M18 6 6 18"></path>
                                  <path d="m6 6 12 12"></path>
                                </svg>
                              </span>
                              Should contain lowercase.
                            </li>
                            <li
                              data-hs-strong-password-hints-rule-text="uppercase"
                              className="hs-strong-password-active:text-blue-500 flex items-center gap-x-2"
                            >
                              <span className="hidden" data-check="">
                                <svg
                                  className="size-4 flex-shrink-0"
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                >
                                  <polyline points="20 6 9 17 4 12"></polyline>
                                </svg>
                              </span>
                              <span data-uncheck="">
                                <svg
                                  className="size-4 flex-shrink-0"
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                >
                                  <path d="M18 6 6 18"></path>
                                  <path d="m6 6 12 12"></path>
                                </svg>
                              </span>
                              Should contain uppercase.
                            </li>
                            <li
                              data-hs-strong-password-hints-rule-text="numbers"
                              className="hs-strong-password-active:text-blue-500 flex items-center gap-x-2"
                            >
                              <span className="hidden" data-check="">
                                <svg
                                  className="size-4 flex-shrink-0"
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                >
                                  <polyline points="20 6 9 17 4 12"></polyline>
                                </svg>
                              </span>
                              <span data-uncheck="">
                                <svg
                                  className="size-4 flex-shrink-0"
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                >
                                  <path d="M18 6 6 18"></path>
                                  <path d="m6 6 12 12"></path>
                                </svg>
                              </span>
                              Should contain numbers.
                            </li>
                            <li
                              data-hs-strong-password-hints-rule-text="special-characters"
                              className="hs-strong-password-active:text-blue-500 flex items-center gap-x-2"
                            >
                              <span className="hidden" data-check="">
                                <svg
                                  className="size-4 flex-shrink-0"
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                >
                                  <polyline points="20 6 9 17 4 12"></polyline>
                                </svg>
                              </span>
                              <span data-uncheck="">
                                <svg
                                  className="size-4 flex-shrink-0"
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                >
                                  <path d="M18 6 6 18"></path>
                                  <path d="m6 6 12 12"></path>
                                </svg>
                              </span>
                              Should contain special characters.
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex">
                    <div className="relative flex-1">
                      <label
                        htmlFor="confirmPassword"
                        className="mb-2 block text-sm text-gray-600 dark:text-gray-200"
                      >
                        {t("confirmpassword")}
                      </label>
                      <input
                        name="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        id="hs-strong-password-with-indicator-and-hint-in-popover-confirm"
                        className="block w-full rounded-md border-gray-200 px-4 py-3 text-sm focus:border-blue-500 focus:ring-blue-500 disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                        placeholder="Enter your password"
                      />
                      <button
                        type="button"
                        onClick={toggleConfirmPasswordVisibility}
                        className="absolute right-0 top-7 p-3.5"
                      >
                        <svg
                          className="size-3.5 flex-shrink-0 text-gray-400 dark:text-neutral-600"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path
                            className={showConfirmPassword ? "hidden" : "block"}
                            d="M9.88 9.88a3 3 0 1 0 4.24 4.24"
                          ></path>
                          <path
                            className={showConfirmPassword ? "hidden" : "block"}
                            d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"
                          ></path>
                          <path
                            className={showConfirmPassword ? "hidden" : "block"}
                            d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"
                          ></path>
                          <line
                            className={showConfirmPassword ? "hidden" : "block"}
                            x1="2"
                            x2="22"
                            y1="2"
                            y2="22"
                          ></line>
                          <path
                            className={showConfirmPassword ? "block" : "hidden"}
                            d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"
                          ></path>
                          <circle
                            className={showConfirmPassword ? "block" : "hidden"}
                            cx="12"
                            cy="12"
                            r="3"
                          ></circle>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  value="Sign Up"
                  className="mt-6 w-full transform rounded-lg bg-primary-600 px-6 py-3 text-sm font-medium capitalize tracking-wide text-white transition-colors duration-300 hover:bg-blue-700"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center ">
                      <svg
                        aria-hidden="true"
                        className="h-8 w-8 animate-spin fill-blue-600 text-gray-200 dark:text-gray-600"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                          fill="currentColor"
                        />
                        <path
                          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                          fill="currentFill"
                        />
                      </svg>
                    </div>
                  ) : (
                    t("signup")
                  )}
                </button>
              </form>
              <div className="mt-6">
                <div className="mt-6 text-center">
                  <a
                    href="#"
                    className="text-sm text-blue-500 hover:underline dark:text-blue-400"
                  >
                    {t("alreadyhaveanaccount")}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SignUpPage;
