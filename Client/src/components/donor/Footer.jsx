import logo from "../../assets/img/donor/logo.svg";
import { useTranslation } from "react-i18next";
const Footer = () => {
  const { t } = useTranslation();
  return (
    <footer className=" m-4 rounded-lg bg-white shadow-[0_3px_10px_rgb(0,0,0,0.2)]  dark:bg-gray-900">
      <div className="mx-auto w-full max-w-screen-xl p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <a
            href=""
            className="mb-4 flex items-center space-x-3 sm:mb-0 rtl:space-x-reverse"
          >
            <img src={logo} className="h-10" alt="Logo" />
          </a>
          <ul className="mb-6 flex flex-wrap items-center text-sm font-medium text-gray-500 dark:text-gray-400 sm:mb-0">
            <li>
              <a href="#" className="me-4 hover:underline md:me-6">
                {t("about")}
              </a>
            </li>
            <li>
              <a href="#" className="me-4 hover:underline md:me-6">
                {t("campaigns")}
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                {t("contactus")}
              </a>
            </li>
          </ul>
        </div>
        <hr className="my-6 border-gray-200 dark:border-gray-700 sm:mx-auto lg:my-8" />
        <span className="block text-sm text-gray-500 dark:text-gray-400 sm:text-center">
          © 2024{" "}
          <a href="" className="hover:underline">
            Entadeg™
          </a>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
};
export default Footer;
