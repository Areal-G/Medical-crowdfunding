import logo from "../../assets/img/donor/logo.svg";
import { useState } from "react";
import et from "../../assets/img/donor/et.svg";
import en from "../../assets/img/donor/en.svg";
import avatar from "../../assets/img/donor/avatar.png";
import { Link } from "react-router-dom";

const Nav = () => {
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

  const [isChecked, setIsChecked] = useState(true);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };
  return (
    <nav className=" rounded-md shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] dark:bg-gray-900">
      <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-4 lg:text-lg">
        <a href="" className=" flex items-center space-x-3 rtl:space-x-reverse">
          <img src={logo} className="h-12 " alt="Logo" />
        </a>
        <div className=" relative flex items-center space-x-3 md:order-2 md:space-x-0 rtl:space-x-reverse">
          <button
            type="button"
            onClick={toggleProfileMenu}
            className="flex h-8 w-8 overflow-hidden rounded-full bg-gray-800 text-sm focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600 md:me-0"
          >
            <img
              className=" h-full w-full object-cover"
              src={avatar}
              alt="user photo"
            />
          </button>
          {/* // Dropdown menu */}

          <div
            className={` ${isProfileOpen ? "absolute" : "hidden"} right-0 top-8 z-50 my-4 list-none  divide-y divide-gray-100 rounded-lg bg-white text-base shadow dark:divide-gray-600 dark:bg-gray-700 lg:top-6`}
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

          {/* //hamburger */}
          <button
            data-collapse-toggle="navbar-user"
            onClick={toggleNavMenu}
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 md:hidden"
          >
            <svg
              className="h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>

        {/* nav  buttons */}
        <div
          className={`${isNavOpen ? "" : "hidden"} w-full items-center justify-between md:order-1 md:flex md:w-auto`}
          id="navbar-user"
        >
          <ul className="mt-4 flex flex-col rounded-lg border border-gray-100 bg-gray-50 p-4 font-medium dark:border-gray-700 dark:bg-gray-800 md:mt-0 md:flex-row md:space-x-8 md:border-0 md:bg-white md:p-0 md:dark:bg-gray-900 rtl:space-x-reverse">
            <li>
              <Link
                to={"/"}
                className="block rounded bg-blue-700 px-3 py-2 text-white md:bg-transparent md:p-0 md:text-blue-700 md:dark:text-blue-500"
              >
                Home
              </Link>
            </li>
            <li>
              <a
                href="#"
                className="block rounded px-3 py-2 text-gray-900 hover:bg-gray-100 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:p-0 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-blue-500"
              >
                About
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block rounded px-3 py-2 text-gray-900 hover:bg-gray-100 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:p-0 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-blue-500"
              >
                Services
              </a>
            </li>

            <li>
              <a
                href="#"
                className="block rounded px-3 py-2 text-gray-900 hover:bg-gray-100 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:p-0 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-blue-500"
              >
                Contact
              </a>
            </li>
            <li className="">
              {/* //toggle */}

              <label className="inline-flex cursor-pointer items-center lg:ml-32 ">
                <div className="mr-2 h-6 w-6">
                  <img className="h-full w-full rounded-full" src={et} alt="" />
                </div>
                <input
                  type="checkbox"
                  value=""
                  className="peer sr-only"
                  checked={isChecked}
                  onChange={handleCheckboxChange}
                />
                <div className="peer relative h-6 w-11 rounded-full bg-gray-200 after:absolute after:start-[2px] after:top-0.5 after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:ring-4 peer-focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-blue-800 rtl:peer-checked:after:-translate-x-full"></div>
                <div className="ml-2 h-6 w-6">
                  <img className="h-full w-full rounded-full" src={en} alt="" />
                </div>
              </label>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
export default Nav;
