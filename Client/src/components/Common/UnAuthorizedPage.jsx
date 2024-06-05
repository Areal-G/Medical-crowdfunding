import unauthorized from "../../assets/common/unauthorized.svg";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
const UnAuthorizedPage = () => {
  const { t } = useTranslation();
  return (
    <div className="flex h-screen w-screen items-center justify-center gap-12 py-8 ">
      <img className="h-[70%]" src={unauthorized} alt="" />
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-center text-3xl font-medium">
          {t("unauthorized")}
        </h1>
        <p className="text-center text-xl ">{t("unauthorizedmessage")}</p>
        <Link
          to="/#campaigns"
          className=" mt-4 inline-flex items-center justify-center rounded-lg bg-primary-700 px-5 py-3 text-center  text-lg font-medium text-white hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900"
        >
          {t("home")}
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
  );
};
export default UnAuthorizedPage;
