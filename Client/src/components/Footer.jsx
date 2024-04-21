import logo from "../assets/img/logo.svg";
const Footer = () => {
  return (
    <footer className="m-4 rounded-lg bg-white shadow  dark:bg-gray-900">
      <div className="mx-auto w-full max-w-screen-2xl p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <a
            href=""
            className="mb-4 flex items-center space-x-3 sm:mb-0 rtl:space-x-reverse"
          >
            <img src={logo} className="h-10" alt="Logo" />
          </a>
          <ul className="mb-6 flex flex-wrap items-center text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
            <li>
              <a href="#" className="me-4 hover:underline md:me-6">
                About
              </a>
            </li>
            <li>
              <a href="#" className="me-4 hover:underline md:me-6">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Contact
              </a>
            </li>
          </ul>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto lg:my-8 dark:border-gray-700" />
        <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
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
