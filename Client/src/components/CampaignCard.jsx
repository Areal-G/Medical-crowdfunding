import { Link } from "react-router-dom";
import e from "../assets/img/e.jpeg";
const CampaignCard = () => {
  return (
    <Link to={"/campaign"}>
      <div className="card mx-auto mt-5 max-w-96 rounded-xl shadow-2xl">
        <div className="max-w-sm rounded-xl bg-white dark:bg-gray-800">
          <div className="  mx-auto mt-8 h-60 w-80 overflow-hidden rounded-lg shadow-xl">
            <a href="#">
              <img className=" " src={e} alt="" />
            </a>
          </div>

          <div className="rounded-xl p-5">
            <a href="#">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-primary-600 dark:text-white">
                Erdata to the website
              </h5>
            </a>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Distinctio consequuntur dicta, molestiae soluta ullam sunt cumque,
            </p>
            {/* progress bar */}
            <div className="mb-5 mt-5 h-2.5 w-[90%] rounded-full bg-gray-200 dark:bg-gray-700">
              <div className="h-2.5 w-[45%] rounded-full bg-primary-600"></div>
            </div>
          </div>
        </div>
      </div>{" "}
    </Link>
  );
};
export default CampaignCard;
