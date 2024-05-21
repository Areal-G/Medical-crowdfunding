import { Link } from "react-router-dom";
import mainbg from "../../assets/img/donor/mainbg.jpg";
import { useTranslation } from "react-i18next";

const Secondmain = () => {
  const { t } = useTranslation();
  return (
    <div
      className="relative h-screen w-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${mainbg})` }}
    >
      {/* Main Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 p-4 text-white">
        <h1 className="mb-4 text-center text-4xl font-bold md:text-7xl">
          <span className=" text-primary-400">Happiness </span> comes from{" "}
          <br /> <span className=" text-primary-400">your action.</span>
        </h1>
        <p className=" mb-8 text-center md:text-lg">
          Be a part of the breakthrough and make someone's dream come true.
        </p>
        <div className="space-x-4">
          <Link
            to="/#campaigns"
            className=" mt-4 inline-flex items-center justify-center rounded-lg bg-primary-700 px-5 py-3 text-center  text-lg font-medium text-white hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900"
          >
            {t("donate")}
            <svg
              className="-mr-1 ml-2 h-5 w-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Secondmain;
