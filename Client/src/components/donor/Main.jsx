import mainSection from "../../assets/img/donor/mainSection.png";
import chapa from "../../assets/img/donor/chapa.svg";
import stripe from "../../assets/img/donor/stripe.svg";
import { useTranslation } from "react-i18next";

const Main = () => {
  const { t } = useTranslation();
  return (
    <section className=" mb-28 mt-20 bg-white dark:bg-gray-900">
      <div className=" mx-auto  grid max-w-screen-xl px-4 py-8 lg:mt-3 lg:grid-cols-12 lg:gap-8 lg:py-16 xl:gap-0">
        <div className="mr-auto place-self-center lg:col-span-7">
          <h1 className=" mb-4 max-w-2xl text-4xl font-extrabold leading-none tracking-tight text-primary-700 dark:text-white md:text-5xl xl:text-6xl">
            {t("entadeg")}
          </h1>
          <p className="mb-6 max-w-2xl font-light text-gray-500 dark:text-gray-400 md:text-lg lg:mb-8 lg:text-xl">
            {t("headertext")}
          </p>
          <a
            href="#"
            className="mr-3 inline-flex items-center justify-center rounded-lg bg-primary-700 px-5 py-3 text-center text-base font-medium text-white hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900"
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
          </a>
          <a
            href="#"
            className="inline-flex items-center justify-center rounded-lg border border-gray-300 px-5 py-3 text-center text-base font-medium text-gray-900 hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-800"
          >
            {t("contactus")}
          </a>
        </div>

        <img
          className=" hidden h-60 items-end rounded-2xl shadow-2xl lg:col-span-5 lg:ml-20 lg:mt-0 lg:flex"
          src={mainSection}
          alt=""
        />
      </div>
      <div className="ml-32 hidden items-center  gap-10 lg:flex">
        <img className=" h-14" src={chapa} alt="" />
        <img className=" h-8" src={stripe} alt="" />
      </div>
    </section>
  );
};
export default Main;
