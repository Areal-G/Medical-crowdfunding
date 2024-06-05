import logo from "../../assets/img/donor/logo.svg";
import { useState, useEffect } from "react";
import { FaListUl } from "react-icons/fa";
import { IoPersonAddOutline } from "react-icons/io5";
import { NavLink } from "react-router-dom";
import { LuFileCheck2 } from "react-icons/lu";
import { MdOutlineReport } from "react-icons/md";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "sonner";
import API from "../../components/Common/api";
import { Link } from "react-router-dom";

const HospitalAdminNav = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [Data, setData] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const LogoutUser = () => {
    API.get("/auth/logout")
      .then(() => {
        setIsProfileOpen(false);
        toast.success("Logged out successfully");

        setTimeout(() => {
          navigate("/signin");
        }, 1000);
      })
      .catch((error) => {
        console.error("Logout error", error);
      });
  };

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const response = await API.get(`/auth/isloggedin`);
        setIsLoggedIn(response.data.isLoggedIn);
      } catch (error) {
        console.error("Error checking login status:", error);
      }
    };

    checkLoginStatus();
  }, [location]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await API.get(`/hospital/gethospitalnavdata`);
        setData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (isLoggedIn) {
      fetchData();
    }
  }, [isLoggedIn, location]);

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
      <nav className="fixed left-0 right-4 top-0 z-50 border-b border-gray-200 bg-white px-4 py-2.5 dark:border-gray-700 dark:bg-gray-800 lg:left-72">
        <Toaster richColors />
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
                className="h-10 w-10 rounded-full object-cover"
                src={Data?.image}
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
                  {Data?.hospitalName}
                </span>
                <span className="block truncate  text-sm text-gray-500 dark:text-gray-400">
                  {Data?.email}
                </span>
              </div>
              <ul className="py-2">
                {/* <li>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Campaigns
                  </a>
                </li> */}
                <li>
                  <Link
                    to={"/hospital/setting"}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    profile
                  </Link>
                </li>

                <li>
                  <button
                    onClick={LogoutUser}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Sign Out
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
      {/* side bar */}
      <aside
        className={` ${isNavOpen ? "translate-x-0" : "lg:translate-x-0"} fixed left-0 top-0 z-40 h-screen w-72 -translate-x-full border-r border-gray-200 bg-white pt-14 transition-transform dark:border-gray-700 dark:bg-gray-800 lg:pt-0 `}
      >
        <div className="hidden items-center justify-center lg:flex">
          <a href="" className="  mt-6 flex items-center justify-between">
            <img src={logo} className=" h-10" alt="" />
          </a>
        </div>

        <div className="h-full overflow-y-auto bg-white px-3 py-5 dark:bg-gray-800 lg:pl-12">
          <ul className="ml-3 gap-4 text-base font-semibold text-black dark:text-white lg:mt-16 ">
            <li>
              <NavLink
                to=""
                className={({ isActive }) =>
                  `flex items-center rounded-lg p-2 pb-4 ${
                    isActive
                      ? " text-primary-500"
                      : "hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`
                }
                end
              >
                <svg
                  className="fill-current"
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6.10322 0.956299H2.53135C1.5751 0.956299 0.787598 1.7438 0.787598 2.70005V6.27192C0.787598 7.22817 1.5751 8.01567 2.53135 8.01567H6.10322C7.05947 8.01567 7.84697 7.22817 7.84697 6.27192V2.72817C7.8751 1.7438 7.0876 0.956299 6.10322 0.956299ZM6.60947 6.30005C6.60947 6.5813 6.38447 6.8063 6.10322 6.8063H2.53135C2.2501 6.8063 2.0251 6.5813 2.0251 6.30005V2.72817C2.0251 2.44692 2.2501 2.22192 2.53135 2.22192H6.10322C6.38447 2.22192 6.60947 2.44692 6.60947 2.72817V6.30005Z"
                    fill=""
                  />
                  <path
                    d="M15.4689 0.956299H11.8971C10.9408 0.956299 10.1533 1.7438 10.1533 2.70005V6.27192C10.1533 7.22817 10.9408 8.01567 11.8971 8.01567H15.4689C16.4252 8.01567 17.2127 7.22817 17.2127 6.27192V2.72817C17.2127 1.7438 16.4252 0.956299 15.4689 0.956299ZM15.9752 6.30005C15.9752 6.5813 15.7502 6.8063 15.4689 6.8063H11.8971C11.6158 6.8063 11.3908 6.5813 11.3908 6.30005V2.72817C11.3908 2.44692 11.6158 2.22192 11.8971 2.22192H15.4689C15.7502 2.22192 15.9752 2.44692 15.9752 2.72817V6.30005Z"
                    fill=""
                  />
                  <path
                    d="M6.10322 9.92822H2.53135C1.5751 9.92822 0.787598 10.7157 0.787598 11.672V15.2438C0.787598 16.2001 1.5751 16.9876 2.53135 16.9876H6.10322C7.05947 16.9876 7.84697 16.2001 7.84697 15.2438V11.7001C7.8751 10.7157 7.0876 9.92822 6.10322 9.92822ZM6.60947 15.272C6.60947 15.5532 6.38447 15.7782 6.10322 15.7782H2.53135C2.2501 15.7782 2.0251 15.5532 2.0251 15.272V11.7001C2.0251 11.4188 2.2501 11.1938 2.53135 11.1938H6.10322C6.38447 11.1938 6.60947 11.4188 6.60947 11.7001V15.272Z"
                    fill=""
                  />
                  <path
                    d="M15.4689 9.92822H11.8971C10.9408 9.92822 10.1533 10.7157 10.1533 11.672V15.2438C10.1533 16.2001 10.9408 16.9876 11.8971 16.9876H15.4689C16.4252 16.9876 17.2127 16.2001 17.2127 15.2438V11.7001C17.2127 10.7157 16.4252 9.92822 15.4689 9.92822ZM15.9752 15.272C15.9752 15.5532 15.7502 15.7782 15.4689 15.7782H11.8971C11.6158 15.7782 11.3908 15.5532 11.3908 15.272V11.7001C11.3908 11.4188 11.6158 11.1938 11.8971 11.1938H15.4689C15.7502 11.1938 15.9752 11.4188 15.9752 11.7001V15.272Z"
                    fill=""
                  />
                </svg>
                <span className="ml-3">Dashboard</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"register"}
                className={({ isActive }) =>
                  `flex items-center rounded-lg p-2 pb-4 ${
                    isActive
                      ? " text-primary-500"
                      : "hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`
                }
              >
                <IoPersonAddOutline className=" h-[20px] w-[20px]" />
                <span className="ml-3">Register Patient</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"patients"}
                className={({ isActive }) =>
                  `flex items-center rounded-lg p-2 pb-4 ${
                    isActive
                      ? " text-primary-500"
                      : "hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`
                }
              >
                <FaListUl className=" h-[20px] w-[20px]" />
                <span className="ml-3">Patients</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"campaigns"}
                className={({ isActive }) =>
                  `flex items-center rounded-lg p-2 pb-4 ${
                    isActive
                      ? " text-primary-500"
                      : "hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`
                }
              >
                <FaListUl className=" h-[20px] w-[20px]" />
                <span className="ml-3">Campaigns</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"approve"}
                className={({ isActive }) =>
                  `flex items-center rounded-lg p-2 pb-4 ${
                    isActive
                      ? " text-primary-500"
                      : "hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`
                }
              >
                <LuFileCheck2 className=" h-[20px] w-[20px]" />
                <span className="ml-3">Approve Campaign</span>
              </NavLink>
            </li>
            {/* <li>
              <NavLink
                to={"dddd"}
                className={({ isActive }) =>
                  `flex items-center rounded-lg p-2 pb-4 ${
                    isActive
                      ? " text-primary-500"
                      : "hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`
                }
              >
                <MdOutlineReport className=" h-[24px] w-[24px]" />

                <span className="ml-3">Reported</span>
              </NavLink>
            </li> */}
          </ul>
        </div>
      </aside>
    </div>
  );
};
export default HospitalAdminNav;
