import { Link } from "react-router-dom";
import logo from "../../assets/img/donor/logo.svg";

const SignUp = () => {
  return (
    <>
      <section className=" bg-white dark:bg-gray-900">
        <div className="flex justify-center">
          <div className="mx-auto my-auto mt-7 flex w-full max-w-3xl items-center rounded-xl p-8 shadow-2xl lg:w-2/5 lg:px-12">
            <div className="w-full">
              <div className="mx-auto flex justify-center">
                <img className="h-7 w-auto sm:h-10" src={logo} alt="" />
              </div>

              <div className="mt-6 flex items-center justify-center">
                <Link
                  to={"/signin"}
                  className="w-1/3 border-b pb-4 text-center font-medium capitalize text-gray-500 dark:border-gray-400 dark:text-gray-300"
                >
                  sign in
                </Link>

                <a
                  href="#"
                  className="w-1/3 border-b-2 border-blue-500 pb-4 text-center font-medium capitalize text-gray-800 dark:border-blue-400 dark:text-white"
                >
                  sign up
                </a>
              </div>
              <form className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm text-gray-600 dark:text-gray-200">
                    First Name
                  </label>
                  <input
                    type="text"
                    placeholder="John"
                    className="mt-2 block w-full rounded-lg border border-gray-200 bg-white px-5 py-3 text-gray-700 placeholder-gray-400 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-400 focus:ring-opacity-40 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:placeholder-gray-600 dark:focus:border-blue-400"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm text-gray-600 dark:text-gray-200">
                    Last name
                  </label>
                  <input
                    type="text"
                    placeholder="Snow"
                    className="mt-2 block w-full rounded-lg border border-gray-200 bg-white px-5 py-3 text-gray-700 placeholder-gray-400 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-400 focus:ring-opacity-40 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:placeholder-gray-600 dark:focus:border-blue-400"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm text-gray-600 dark:text-gray-200">
                    Phone number
                  </label>
                  <input
                    type="text"
                    placeholder="XXX-XX-XXXX-XXX"
                    className="mt-2 block w-full rounded-lg border border-gray-200 bg-white px-5 py-3 text-gray-700 placeholder-gray-400 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-400 focus:ring-opacity-40 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:placeholder-gray-600 dark:focus:border-blue-400"
                  />
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
                  <label className="mb-2 block text-sm text-gray-600 dark:text-gray-200">
                    Password
                  </label>
                  <input
                    type="password"
                    placeholder="Enter your password"
                    className="mt-2 block w-full rounded-lg border border-gray-200 bg-white px-5 py-3 text-gray-700 placeholder-gray-400 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-400 focus:ring-opacity-40 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:placeholder-gray-600 dark:focus:border-blue-400"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm text-gray-600 dark:text-gray-200">
                    Confirm password
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
                  Sign Up
                </button>

                <div className="mt-6 text-center ">
                  <a
                    href="#"
                    className="text-sm text-blue-500 hover:underline dark:text-blue-400"
                  >
                    Already have an account?
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
export default SignUp;
