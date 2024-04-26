import { Link } from "react-router-dom";
import logo from "../../assets/img/logo.svg";

const SignIn = () => {
  return (
    <section className="bg-white dark:bg-gray-900">
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
            <form className="mt-8">
              <div
                className="mb-5 flex justify-center rounded-md shadow-sm"
                role="group"
              >
                <button
                  type="button"
                  className="rounded-s-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:text-blue-700 focus:ring-2 focus:ring-blue-700 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white dark:focus:text-white dark:focus:ring-blue-500"
                >
                  Donor
                </button>
                <button
                  type="button"
                  className="border-b border-t border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:text-blue-700 focus:ring-2 focus:ring-blue-700 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white dark:focus:text-white dark:focus:ring-blue-500"
                >
                  Patient
                </button>
                <button
                  type="button"
                  className="border-b border-t border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:text-blue-700 focus:ring-2 focus:ring-blue-700 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white dark:focus:text-white dark:focus:ring-blue-500"
                >
                  Hospital
                </button>
                <button
                  type="button"
                  className="rounded-e-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:text-blue-700 focus:ring-2 focus:ring-blue-700 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white dark:focus:text-white dark:focus:ring-blue-500"
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
                />
              </div>
            </form>
            <div className="mt-6">
              <button className="w-full transform rounded-lg  bg-primary-600 px-6 py-3 text-sm font-medium capitalize tracking-wide text-white transition-colors duration-300 hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                Sign In
              </button>

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
      </div>
    </section>
  );
};
export default SignIn;
