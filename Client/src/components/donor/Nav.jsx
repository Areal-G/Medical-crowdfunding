import logowhite from "../../assets/img/donor/logo-white.svg";
import logoblack from "../../assets/img/donor/logo-black.svg";
import { useState, useEffect } from "react";
import et from "../../assets/img/donor/et.svg";
import en from "../../assets/img/donor/en.svg";
import { Link } from "react-router-dom";
import Select from "react-select";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import API from "../../components/Common/api";
import DonationStars from "./DonationStars";

import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "sonner";

const Nav = () => {
  const [scroll, setScroll] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const { i18n, t } = useTranslation();
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const [Data, setData] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate();

  const LogoutUser = () => {
    API.get("/auth/logout")
      .then(() => {
        toast.success("Logged out successfully");
        setIsProfileOpen(false);

        navigate("/signin");
        navigate("/signin");
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
        const response = await API.get(`/donor/getdonornavdata`);
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

  const languageOptions = [
    { value: "am", label: "አማርኛ", image: et },
    { value: "en", label: "English", image: en },
  ];

  const formatOptionLabel = ({ label, image }) => (
    <div style={{ display: "flex", alignItems: "center" }}>
      <img
        src={image}
        alt={label}
        style={{ width: 25, height: 25, marginRight: 10 }}
      />
      {label}
    </div>
  );

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 150) {
        setScroll(true);
      } else {
        setScroll(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const isActive = (path) => location.hash === path;

  return (
    <nav
      className={`${isHomePage ? "fixed" : ""} left-0 top-0 z-50 w-full transition-all duration-300 ${
        isHomePage
          ? scroll
            ? "bg-white text-black shadow-md"
            : "bg-black bg-opacity-5 text-white backdrop-blur-sm"
          : "bg-white text-black shadow-md"
      }`}
    >
      <Toaster richColors />
      <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between pb-2 pt-3 lg:text-lg">
        <Link to={"/"} className=" flex items-center space-x-3">
          {scroll || !isHomePage ? (
            <img src={logoblack} className="h-12 " alt="Logo" />
          ) : (
            <img src={logowhite} className="h-12 " alt="Logo" />
          )}
        </Link>
        <div className=" relative flex items-center space-x-3 md:order-2 md:space-x-0">
          {isLoggedIn ? (
            <button
              type="button"
              onClick={toggleProfileMenu}
              className="h-10 w-10 overflow-hidden rounded-full text-sm focus:ring-4 focus:ring-primary-500 dark:focus:ring-gray-600 md:me-0"
            >
              <img
                className="h-full w-full object-cover"
                src={Data?.donor?.image} // Use optional chaining in case Data is undefined
                alt="user photo"
              />
            </button>
          ) : (
            <Link
              to="/signin"
              className="rounded-full bg-primary-600 px-4 py-2 text-base font-light text-white hover:bg-blue-700"
            >
              {t("signin")}
            </Link>
          )}
          {/* // Dropdown menu */}

          <div
            className={` ${isProfileOpen ? "absolute" : "hidden"} right-0 top-8 z-50 my-4 list-none  divide-y divide-gray-100 rounded-lg bg-white text-base shadow dark:divide-gray-600 dark:bg-gray-700 lg:top-6`}
            id="user-dropdown"
          >
            <DonationStars raisedMoney={Data?.raisedMoney} />
            <div className="px-4 py-3 ">
              <span className="block text-sm text-gray-900 dark:text-white">
                {Data?.donor.fullname}
              </span>
              <span className="block truncate  text-sm text-gray-500 dark:text-gray-400">
                {Data?.donor.email}
              </span>
            </div>
            <ul className="py-2">
              <li>
                <Link
                  to={"/donations"}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  {t("mydonations")}
                </Link>
              </li>
              {/* <li>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  profile
                </a>
              </li> */}

              <li>
                <button
                  onClick={LogoutUser}
                  className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  {t("signout")}
                </button>
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

        <div
          className={`${isNavOpen ? "" : "hidden"} w-full items-center justify-between md:order-1 md:flex md:w-auto`}
          id="navbar-user"
        >
          <ul className="mt-4 flex flex-col items-center rounded-lg border border-gray-100 p-4 font-medium dark:border-gray-700 dark:bg-gray-800 md:mt-0 md:flex-row md:gap-8 md:border-0 md:p-0 md:dark:bg-gray-900">
            <li>
              <Link
                to="/#main"
                className={`block rounded px-3 py-2 ${
                  isActive("#main")
                    ? "text-primary-500"
                    : `${isHomePage && !scroll ? "text-white" : "text-black"} hover:text-primary-800 md:bg-transparent md:p-0`
                }`}
              >
                {t("home")}
              </Link>
            </li>
            <li>
              <Link
                to="/#campaigns"
                className={`block rounded px-3 py-2 ${
                  isActive("#campaigns")
                    ? "text-primary-500"
                    : `${isHomePage && !scroll ? "text-white" : "text-black"} hover:text-primary-800 md:bg-transparent md:p-0`
                }`}
              >
                {t("campaigns")}
              </Link>
            </li>
            <li>
              <Link
                to="/#about"
                className={`block rounded px-3 py-2 ${
                  isActive("#about")
                    ? "text-primary-500"
                    : `${isHomePage && !scroll ? "text-white" : "text-black"} hover:text-primary-800 md:bg-transparent md:p-0`
                }`}
              >
                {t("about")}
              </Link>
            </li>
            <li>
              <Link
                to="/#contact"
                className={`block rounded px-3 py-2 ${
                  isActive("#contact")
                    ? "text-primary-500"
                    : `${isHomePage && !scroll ? "text-white" : "text-black"} hover:text-primary-800 md:bg-transparent md:p-0`
                }`}
              >
                {t("contact")}
              </Link>
            </li>

            {/* Language dropdown */}
            <li className=" text-black md:ml-20">
              <Select
                value={languageOptions.find(
                  (option) => option.value === i18n.language,
                )}
                onChange={(option) => i18n.changeLanguage(option.value)}
                options={languageOptions}
                formatOptionLabel={formatOptionLabel}
                isSearchable={false}
                styles={{
                  control: (base) => ({
                    ...base,
                    background: "transparent",
                    width: "45px",
                    padding: "1px",
                    border: "none",
                  }),
                  dropdownIndicator: (base) => ({
                    ...base,
                    display: "none",
                  }),
                  indicatorSeparator: (base) => ({
                    // Add this style
                    ...base,
                    display: "none",
                  }),
                  menu: (base) => ({
                    ...base,
                    width: "200px",
                    padding: "5px",
                  }),
                }}
              />
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
export default Nav;
