import e from "../assets/img/e.jpeg";
const CampaignCard = () => {
  return (
    <div className="card mx-auto mt-5 max-w-96 rounded-xl shadow-2xl">
      <div className="max-w-sm bg-white dark:bg-gray-800">
        <div className="  mx-auto mt-8 h-60 w-80 overflow-hidden rounded-lg shadow-xl">
          <a href="#">
            <img className=" " src={e} alt="" />
          </a>
        </div>

        <div className="rounded-xl p-5">
          <a href="#">
            <h5 className="text-primary-600 mb-2 text-2xl font-bold tracking-tight dark:text-white">
              Erdata to the website
            </h5>
          </a>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio
            consequuntur dicta, molestiae soluta ullam sunt cumque,
          </p>
          <a
            href="#"
            className="bg-primary-600 inline-flex items-center rounded-lg px-3 py-2 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Read more
            <svg
              className="ms-2 h-3.5 w-3.5 rtl:rotate-180"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};
export default CampaignCard;
