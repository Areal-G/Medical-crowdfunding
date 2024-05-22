/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

const CampaignCard = (props) => {
  return (
    <Link
      className="mx-auto max-w-96 rounded-lg bg-white "
      to={`/campaigndetail/${props.id}`}
    >
      <div className="max-w-sm rounded-lg border shadow-primary-700 hover:shadow-2xl dark:bg-gray-800">
        <div className="relative mx-auto w-[95%] overflow-hidden rounded-lg">
          <img className="rounded-lg" src={props.image} alt="" />
          <div className="absolute bottom-0 left-0 px-2 pb-1 text-sm text-white backdrop-blur-sm">
            {`${props.date}`}
          </div>
          <div className="absolute bottom-0 right-0 px-2 pb-1 text-[15px] text-white backdrop-blur-sm">
            {`${props.city}`}
          </div>
        </div>

        <div className="rounded-xl p-4">
          <h5 className="mb-2 text-2xl font-semibold tracking-tight text-primary-600 dark:text-white">
            {props.title.length > 20
              ? `${props.title.slice(0, 20)}...`
              : props.title}
          </h5>
          <div className="mb-1 h-[1px] w-full bg-slate-400"></div>
          <p className="mb-3 text-base text-gray-700 dark:text-gray-400">
            {props.description.length > 20
              ? `${props.description.slice(0, 20)}...`
              : props.description}
          </p>
          <div className="mb-1 h-[0.8px] w-full bg-slate-400"></div>
          {/* progress bar */}
          <div className="mx-auto">
            <div className="flex justify-between">
              <p>
                <span className="font-semibold">{`${props.donations}`}</span>{" "}
                Donations
              </p>
              <p className="font-semibold">{`${props.progress}`}</p>
            </div>
            <div className="my-2 h-1 rounded-full bg-gray-200 dark:bg-gray-700">
              <div
                className={`h-1 w-[${props.progress}] rounded-full bg-primary-600`}
              ></div>
            </div>
          </div>
          <div className="flex justify-between">
            <p>
              Raised:
              <span className="font-semibold">${`${props.raised}`}</span>
            </p>
            <p>
              Goal: <span className="font-semibold">${`${props.goal}`}</span>
            </p>
          </div>
        </div>
      </div>
      <div className="h-2 w-full rounded-b-lg bg-primary-400"></div>
    </Link>
  );
};
export default CampaignCard;
