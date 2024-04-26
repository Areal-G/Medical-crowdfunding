const DonationProgress = () => {
  return (
    <div className=" rounded-lg py-5 shadow-lg hover:shadow-blue-400 ">
      <div className=" mx-auto w-[90%]">
        <div className="flex justify-between">
          <p>
            <span className=" font-bold"> 245 </span> Donations
          </p>
          <p className=" font-bold">45%</p>
        </div>
        <div className=" my-2 h-1 rounded-full bg-gray-200 dark:bg-gray-700">
          <div className="h-1 w-[45%] rounded-full bg-primary-600"></div>
        </div>
        <div className=" flex justify-between">
          <p>
            Raised: <span className=" font-bold"> $600 </span>
          </p>
          <p>
            Goal: <span className=" font-bold"> $1000 </span>
          </p>
        </div>

        <div className="mt-4 text-right ">
          <p>
            <span className=" font-bold">23 </span> Days left
          </p>
        </div>
        {/* Donate button */}
        <div className="mt-5 flex justify-center">
          <a
            href="#"
            className="inline-flex items-center justify-center rounded-lg bg-primary-600 px-12 py-3 text-center text-base font-medium text-white hover:bg-primary-700 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900"
          >
            Donate
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
        </div>
      </div>
    </div>
  );
};
export default DonationProgress;
