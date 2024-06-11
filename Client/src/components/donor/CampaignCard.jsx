/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const CampaignCard = (props) => {
  const { t } = useTranslation();
  const cappedProgress = Math.min(props.progress, 100);
  return (
    <Link
      className="mx-auto max-w-96 rounded-lg bg-white md:h-[630px] "
      to={`/campaigndetail/${props.id}`}
    >
      <div className="max-w-sm rounded-lg border shadow-primary-700 hover:shadow-2xl dark:bg-gray-800">
        <div className="relative mx-auto mt-2 flex h-80 w-[95%] items-center justify-center overflow-hidden rounded-lg">
          <img
            className="absolute inset-0 h-full w-full object-cover"
            src={props.image}
            alt=""
          />
          <div className="absolute bottom-0 left-0 rounded-tr-lg bg-primary-500 px-2 py-2 text-sm text-white">
            {props.date
              ? new Date(props.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })
              : "Invalid Date"}
          </div>
          <div className="absolute bottom-0 right-0 rounded-tl-lg bg-primary-500 px-2 py-2 text-sm text-white">
            {`${props.city.toUpperCase()}`}
          </div>
        </div>

        <div className="rounded-xl p-4 md:h-[270px]">
          <h5 className="mb-2 text-xl font-semibold uppercase tracking-tight text-primary-600 dark:text-white">
            {props.title.length > 100
              ? `${props.title.slice(0, 100)}...`
              : props.title}
          </h5>
          <div className="mb-1 h-[1px] w-full bg-slate-400"></div>
          <p className="mb-3 text-base text-gray-700 dark:text-gray-400">
            {props.description.length > 142
              ? `${props.description.slice(0, 142)}...`
              : props.description}
          </p>
          <div className="mb-1 h-[0.8px] w-full bg-slate-400"></div>
          {/* progress bar */}
          <div className="mx-auto">
            <div className="flex justify-between">
              <p>
                <span className="font-semibold">{`${props.donations}`}</span>{" "}
                {t("donations")}
              </p>
              <p className="font-semibold">{`${props.progress}%`}</p>
            </div>
            <div className="my-2 h-1 rounded-full bg-gray-200 dark:bg-gray-700">
              <div
                className="h-1 rounded-full bg-primary-600"
                style={{ width: `${cappedProgress}%` }}
              ></div>
            </div>
          </div>
          <div className="flex justify-between">
            <p>
              {t("raised")}
              <span className="font-semibold">
                {`${props.raised.toLocaleString()}`}
                {t("birr")}
              </span>
            </p>
            <p>
              {t("goal")}
              <span className="font-semibold">
                {props.goal.toLocaleString()}
              </span>
              {t("birr")}
            </p>
          </div>
        </div>
        <div className="h-2 w-full rounded-b-lg bg-primary-400"></div>
      </div>
    </Link>
  );
};
export default CampaignCard;
