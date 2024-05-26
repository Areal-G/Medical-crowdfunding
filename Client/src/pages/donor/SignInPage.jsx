import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/img/donor/logo-black.svg";
import { useNavigate } from "react-router-dom";
import API from "../../components/Common/api";
const SignInPage = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userRole, setUserRole] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const data = {
      email: email,
      password: password,
      role: userRole,
    };

    try {
      const response = await API.post("/auth/login", data);
      const redirectPath = getSuccessRedirect(response.data.role);

      navigate(redirectPath);
      // Reset form fields
      setEmail("");
      setPassword("");
      setUserRole("");
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  return (
    <section className="bg-white dark:bg-gray-900 md:mb-10">
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
                sign in
              </a>

              <Link
                to={"/signup"}
                className="w-1/3 border-b pb-4 text-center font-medium capitalize text-gray-500 dark:border-gray-400 dark:text-gray-300"
              >
                sign up
              </Link>
            </div>
            <form onSubmit={handleSubmit} className="mt-8">
              <div
                className="mb-5 flex justify-center rounded-md shadow-sm"
                role="group"
              >
                <button
                  type="button"
                  onClick={() => handleUserRoleChange("donor")}
                  className={`rounded-s-lg border ${
                    userRole === "donor"
                      ? " bg-primary-500 text-white hover:bg-primary-600"
                      : "bg-white"
                  } border-gray-200 px-4 py-2 text-sm font-medium text-gray-900    dark:border-gray-700  dark:text-white`}
                >
                  Donor
                </button>
                <button
                  onClick={() => handleUserRoleChange("patient")}
                  type="button"
                  className={`rounded-s-lg border ${
                    userRole === "patient"
                      ? " bg-primary-500 text-white hover:bg-primary-600"
                      : "bg-white"
                  } border-gray-200 px-4 py-2 text-sm font-medium text-gray-900    dark:border-gray-700  dark:text-white`}
                >
                  Patient
                </button>
                <button
                  onClick={() => handleUserRoleChange("hospital")}
                  type="button"
                  className={`rounded-s-lg border ${
                    userRole === "hospital"
                      ? " bg-primary-500 text-white hover:bg-primary-600"
                      : "bg-white"
                  } border-gray-200 px-4 py-2 text-sm font-medium text-gray-900    dark:border-gray-700  dark:text-white`}
                >
                  Hospital
                </button>
                <button
                  onClick={() => handleUserRoleChange("systemAdmin")}
                  type="button"
                  className={`rounded-s-lg border ${
                    userRole === "systemAdmin"
                      ? " bg-primary-500 text-white hover:bg-primary-600"
                      : "bg-white"
                  } border-gray-200 px-4 py-2 text-sm font-medium text-gray-900    dark:border-gray-700  dark:text-white`}
                >
                  Sys Admin
                </button>
              </div>

              <div>
                <label className="mb-2 block text-sm text-gray-600 dark:text-gray-200">
                  Email address
                </label>
                <input
                  type="email"
                  placeholder="johnsnow@example.com"
                  className="mt-2 block w-full rounded-lg border border-gray-200 bg-white px-5 py-3 text-gray-700 placeholder-gray-400 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-400 focus:ring-opacity-40 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:placeholder-gray-600 dark:focus:border-blue-400"
                  value={email}
                  onChange={handleEmailChange}
                />
              </div>

              <div>
                <label className="mb-2 mt-8 block text-sm text-gray-600 dark:text-gray-200">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  className="mt-2 block w-full rounded-lg border border-gray-200 bg-white px-5 py-3 text-gray-700 placeholder-gray-400 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-400 focus:ring-opacity-40 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:placeholder-gray-600 dark:focus:border-blue-400"
                  value={password}
                  onChange={handlePasswordChange}
                />
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
                  "Sign In"
                )}
              </button>
            </form>

            <div className="mt-6 text-center ">
              <a
                href="#"
                className="text-sm text-blue-500 hover:underline dark:text-blue-400"
              >
                Dont have an account?
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default SignInPage;
