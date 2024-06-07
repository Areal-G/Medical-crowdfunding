import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/img/donor/logo-black.svg";
import API from "../../components/Common/api";
import { Toaster, toast } from "sonner";
import { useTranslation } from "react-i18next";

const SignInPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userRole, setUserRole] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isOtpLoading, setIsOtpLoading] = useState(false);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otp, setOtp] = useState({ 0: "", 1: "", 2: "", 3: "" });
  const [countdown, setCountdown] = useState(60);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  function getSuccessRedirect(role) {
    switch (role) {
      case "donor":
        return "/";
      case "patient":
        return "/patient";
      case "hospital":
        return "/hospital";
      case "systemAdmin":
        return "/admin";
      default:
        return "/";
    }
  }

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleUserRoleChange = (role) => {
    setUserRole(role);
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !validateEmail(email)) {
      toast.error("Invalid email address");
      return;
    }

    if (!password || password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }

    if (!userRole) {
      toast.error("Please select a user role");
      return;
    }

    setIsLoading(true);

    const data = {
      email,
      password,
      role: userRole,
    };

    try {
      const response = await API.post("/auth/login", data);

      if (response.data.otpRequired) {
        setShowOtpModal(true);
        setIsLoading(false);
      } else {
        const redirectPath = getSuccessRedirect(response.data.role);
        navigate(redirectPath);
        setEmail("");
        setPassword("");
        setUserRole("");
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);

      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An error occurred during sign in. Please try again.");
      }
    }
  };

  const handleOtpChange = (e, index) => {
    const { value } = e.target;
    if (/^\d*$/.test(value) && value.length <= 1) {
      setOtp({ ...otp, [index]: value });
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setIsOtpLoading(true);
    const otpCode = Object.values(otp).join("");
    try {
      const response = await API.post("/auth/verify-otp", {
        email,
        otp: otpCode,
      });
      if (response.data.success) {
        const redirectPath = getSuccessRedirect(userRole);

        navigate(redirectPath);
      } else {
        toast.error(response.data.message);
        setIsOtpLoading(false);
        LogoutUser();
      }
    } catch (error) {
      toast.error("Failed to verify OTP. Please try again.");
      setIsOtpLoading(false);
    }
  };
  const LogoutUser = () => {
    API.get("/auth/logout")
      .then(() => {
        setShowOtpModal(false);
      })
      .catch((error) => {
        console.error("Logout error", error);
      });
  };

  useEffect(() => {
    let timer;
    if (showOtpModal) {
      timer = setInterval(() => {
        setCountdown((prevCountdown) => {
          if (prevCountdown <= 1) {
            clearInterval(timer);
            LogoutUser();
            return 0;
          } else {
            return prevCountdown - 1;
          }
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [showOtpModal]);

  return (
    <section className="bg-white dark:bg-gray-900 md:mb-10">
      <Toaster richColors />
      <div className="flex justify-center">
        <div className="mx-auto my-auto mt-7 flex w-full max-w-3xl items-center rounded-xl p-8 shadow-2xl lg:w-2/5 lg:px-12">
          <div className="w-full">
            <div className="mx-auto flex justify-center">
              <img className="h-7 w-auto sm:h-10" src={logo} alt="" />
            </div>

            <div className="mt-6 flex items-center justify-center">
              <a
                href="/signin"
                className="w-1/3 border-b-2 border-blue-500 pb-4 text-center font-medium capitalize text-gray-800 dark:border-blue-400 dark:text-white"
              >
                {t("signin")}
              </a>

              <Link
                to={"/signup"}
                className="w-1/3 border-b pb-4 text-center font-medium capitalize text-gray-500 dark:border-gray-400 dark:text-gray-300"
              >
                {t("signup")}
              </Link>
            </div>
            <form onSubmit={handleSubmit} className="mt-8">
              <div className="mb-5 flex justify-center " role="group">
                <button
                  type="button"
                  onClick={() => handleUserRoleChange("donor")}
                  className={`rounded-s-lg border ${
                    userRole === "donor"
                      ? " bg-primary-500 text-white hover:bg-primary-600"
                      : "bg-white"
                  } border-gray-200 px-4 py-2 text-sm font-medium text-gray-900    dark:border-gray-700  dark:text-white`}
                >
                  {t("donor")}
                </button>
                <button
                  onClick={() => handleUserRoleChange("patient")}
                  type="button"
                  className={` border ${
                    userRole === "patient"
                      ? " bg-primary-500 text-white hover:bg-primary-600"
                      : "bg-white"
                  } border-gray-200 px-4 py-2 text-sm font-medium text-gray-900    dark:border-gray-700  dark:text-white`}
                >
                  {t("patient")}
                </button>
                <button
                  onClick={() => handleUserRoleChange("hospital")}
                  type="button"
                  className={` border ${
                    userRole === "hospital"
                      ? " bg-primary-500 text-white hover:bg-primary-600"
                      : "bg-white"
                  } border-gray-200 px-4 py-2 text-sm font-medium text-gray-900    dark:border-gray-700  dark:text-white`}
                >
                  {t("hospital")}
                </button>
                <button
                  onClick={() => handleUserRoleChange("systemAdmin")}
                  type="button"
                  className={`rounded-e-lg border ${
                    userRole === "systemAdmin"
                      ? " bg-primary-500 text-white hover:bg-primary-600"
                      : "bg-white"
                  } border-gray-200 px-4 py-2 text-sm font-medium text-gray-900    dark:border-gray-700  dark:text-white`}
                >
                  {t("admin")}
                </button>
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
                  placeholder="johnsnow@example.com"
                  className="block w-full rounded-md border-gray-200 px-4 py-3 text-sm focus:border-blue-500 focus:ring-blue-500 disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                  value={email}
                  onChange={handleEmailChange}
                />
              </div>

              <div>
                <label className="mb-2 mt-8 block text-sm text-gray-600 dark:text-gray-200">
                  {t("password")}
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    className="block w-full rounded-md border-gray-200 px-4 py-3 text-sm focus:border-blue-500 focus:ring-blue-500 disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                    value={password}
                    onChange={handlePasswordChange}
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-3 top-2 p-1.5"
                  >
                    <svg
                      className="size-5 flex-shrink-0 text-gray-400 dark:text-neutral-600"
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
                </div>
              </div>
              <button
                type="submit"
                className="mt-6 w-full transform rounded-lg  bg-primary-600 px-6 py-3 text-sm font-medium capitalize tracking-wide text-white transition-colors duration-300 hover:bg-blue-700 "
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center ">
                    <svg
                      aria-hidden="true"
                      className="h-8 w-8 animate-spin  fill-blue-600 text-gray-200 dark:text-gray-600"
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
                  t("signin")
                )}
              </button>
            </form>

            <div className="mt-6 text-center ">
              <Link
                to={"/signup"}
                className="text-sm text-blue-500 hover:underline dark:text-blue-400"
              >
                {t("donthaveanaccount")}
              </Link>
            </div>
          </div>
        </div>
      </div>
      {showOtpModal && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center">
          <div className="fixed inset-0 bg-black opacity-50"></div>
          <div className="relative m-3 sm:mx-auto sm:w-full sm:max-w-lg">
            <div className="pointer-events-auto flex flex-col rounded-xl border bg-white shadow-sm dark:border-neutral-700 dark:bg-neutral-800 dark:shadow-neutral-700/70">
              <div className="flex items-center justify-between border-b px-4 py-3 dark:border-neutral-700">
                <h3 className="font-bold text-gray-800 dark:text-white"></h3>
                <button
                  type="button"
                  onClick={LogoutUser}
                  className="flex size-7 items-center justify-center rounded-full border border-transparent text-sm font-semibold text-gray-800 hover:bg-gray-100 disabled:pointer-events-none disabled:opacity-50 dark:text-white dark:hover:bg-neutral-700"
                >
                  <span className="sr-only">Close</span>
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
                </button>
              </div>

              <div className="relative flex flex-col justify-center overflow-hidden bg-gray-50">
                <div className="relative mx-auto w-full max-w-lg rounded-2xl bg-white px-6 pb-9 pt-10 shadow-xl">
                  <div className="mx-auto flex w-full max-w-md flex-col space-y-16">
                    <div className="flex flex-col items-center justify-center space-y-2 text-center">
                      <div className="text-3xl font-semibold">
                        <p>Email Verification</p>
                      </div>
                      <div className=" text-sm font-medium text-gray-400">
                        <p>We have sent a code to {email}</p>
                      </div>
                    </div>

                    <div>
                      <form onSubmit={handleOtpSubmit}>
                        <div className="flex flex-col space-y-6">
                          <div>
                            <div
                              className="flex justify-center space-x-5"
                              data-hs-pin-input=""
                            >
                              <input
                                className="block h-14 w-14 rounded-md border-gray-300 text-center text-lg placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500 disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                                type="text"
                                placeholder="○"
                                data-hs-pin-input-item=""
                                value={otp[0]}
                                onChange={(e) => handleOtpChange(e, 0)}
                                autoFocus
                              />
                              <input
                                className="block h-14 w-14 rounded-md border-gray-300 text-center text-lg placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500 disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                                type="text"
                                placeholder="○"
                                data-hs-pin-input-item=""
                                value={otp[1]}
                                onChange={(e) => handleOtpChange(e, 1)}
                              />
                              <input
                                className="block h-14 w-14 rounded-md border-gray-300 text-center text-lg placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500 disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                                type="text"
                                placeholder="○"
                                data-hs-pin-input-item=""
                                value={otp[2]}
                                onChange={(e) => handleOtpChange(e, 2)}
                              />
                              <input
                                className="block h-14 w-14 rounded-md border-gray-300 text-center text-lg placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500 disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                                type="text"
                                placeholder="○"
                                data-hs-pin-input-item=""
                                value={otp[3]}
                                onChange={(e) => handleOtpChange(e, 3)}
                              />
                            </div>
                            <div className=" flex items-center justify-center">
                              <div className="m-2  text-center sm:m-5">
                                <span className="text-2xl font-bold text-primary-600 ">
                                  {countdown}
                                </span>
                                <p>Seconds</p>
                              </div>
                            </div>
                          </div>

                          <div className="flex flex-col space-y-5">
                            <button
                              type="submit"
                              className="mt-6 w-full transform rounded-lg  bg-primary-600 px-6 py-3 text-sm font-medium capitalize tracking-wide text-white transition-colors duration-300 hover:bg-blue-700 "
                              disabled={isOtpLoading}
                            >
                              {isOtpLoading ? (
                                <div className="flex items-center justify-center ">
                                  <svg
                                    aria-hidden="true"
                                    className="h-8 w-8 animate-spin  fill-blue-600 text-gray-200 dark:text-gray-600"
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
                                "Submit"
                              )}
                            </button>

                            {/* <div className="flex flex-row items-center justify-center space-x-1 text-center text-sm font-medium text-gray-500">
                              <p>Didn't recieve code?</p>{" "}
                              <a
                                className="flex flex-row items-center text-blue-600"
                                href="http://"
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                Resend
                              </a>
                            </div> */}
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
export default SignInPage;
