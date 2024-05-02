import logo from "../../assets/img/donor/logo.svg";
import { useState } from "react";

const HospitalAdminNav = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleProfileMenu = () => {
    setIsProfileOpen(!isProfileOpen);
    setIsNavOpen(false);
  };

  const toggleNavMenu = () => {
    setIsNavOpen(!isNavOpen);
    setIsProfileOpen(false);
  };

  return (
    <div>
      <nav className="fixed left-0 right-0 top-0 z-50 border-b border-gray-200 bg-white px-4 py-2.5 dark:border-gray-700 dark:bg-gray-800 lg:left-64">
        <div className="flex flex-wrap items-center justify-between">
          <div className="flex items-center justify-start">
            {/* humberger */}
            <button
              onClick={toggleNavMenu}
              className="mr-2 cursor-pointer rounded-lg p-2 text-gray-600 hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:ring-2 focus:ring-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:bg-gray-700 dark:focus:ring-gray-700 lg:hidden"
            >
              <svg
                className="h-6 w-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <svg
                className="hidden h-6 w-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
            <a
              href=""
              className="mr-4 flex items-center justify-between lg:hidden"
            >
              <img src={logo} className="mr-3 h-12" alt="" />
            </a>
          </div>
          <div className="flex items-center lg:order-2">
            {/* <!-- profile button --> */}

            <button
              type="button"
              className="mx-3   flex rounded-full bg-gray-800 text-sm focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600 md:mr-10"
              onClick={toggleProfileMenu}
            >
              <img
                className="h-110 w-10 rounded-full"
                src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/michael-gough.png"
                alt="user photo"
              />
            </button>

            {/* <!-- profile dropdown --> */}
            <div
              className={` ${isProfileOpen ? "absolute" : "hidden"} right-12 top-6 z-50 my-4 list-none  divide-y divide-gray-100 rounded-lg bg-white text-base shadow dark:divide-gray-600 dark:bg-gray-700 lg:top-10`}
              id="user-dropdown"
            >
              <div className="px-4 py-3 ">
                <span className="block text-sm text-gray-900 dark:text-white">
                  Areal Gizaw
                </span>
                <span className="block truncate  text-sm text-gray-500 dark:text-gray-400">
                  arealgizaw@gmail.com
                </span>
              </div>
              <ul className="py-2">
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Campaigns
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    profile
                  </a>
                </li>

                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Sign out
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
      {/* side bar */}
      <aside
        className={` ${isNavOpen ? "translate-x-0" : "lg:translate-x-0"} fixed left-0 top-0 z-40 h-screen w-64 -translate-x-full border-r border-gray-200 bg-white pt-14 transition-transform dark:border-gray-700 dark:bg-gray-800 lg:pt-0 `}
      >
        <div className="hidden items-center justify-center lg:flex">
          <a href="" className="  mt-6 flex items-center justify-between">
            <img src={logo} className=" h-10" alt="" />
          </a>
        </div>

        <div className="h-full overflow-y-auto bg-white px-3 py-5 dark:bg-gray-800">
          <ul className="space-y-2">
            <li>
              <a
                href="#"
                className="group flex items-center rounded-lg p-2 text-base font-medium text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
              >
                <svg
                  className="h-6 w-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
                  <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
                </svg>
                <span className="ml-3">Overview</span>
              </a>
            </li>
          </ul>
        </div>
      </aside>
    </div>
  );
};
export default HospitalAdminNav;
