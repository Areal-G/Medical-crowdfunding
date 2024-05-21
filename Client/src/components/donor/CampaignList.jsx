import { t } from "i18next";
import CampaignCard from "./CampaignCard";
import { Link } from "react-router-dom";

const Campaign = () => {
  return (
    <>
      <div className=" mx-auto mb-8 mt-5 max-w-screen-md text-center ">
        <h2 className=" text-4xl  font-extrabold tracking-tight text-primary-600 dark:text-white">
          {t("campaigns")}
        </h2>
      </div>
      <Link to={"/campaigndetail"}>
        <div className=" w-ful mx-auto max-w-screen-xl justify-items-center rounded-xl p-4 md:grid md:grid-cols-2 md:py-8 lg:grid lg:grid-cols-3">
          <CampaignCard />
          <CampaignCard />
          <CampaignCard />
          <CampaignCard />
        </div>
      </Link>
    </>
  );
};
export default Campaign;
