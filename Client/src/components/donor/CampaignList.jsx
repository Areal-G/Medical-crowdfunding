import { t } from "i18next";
import CampaignCard from "./CampaignCard";

const Campaign = () => {
  return (
    <>
      <div className="mx-auto mb-8 max-w-screen-md text-center ">
        <h2 className="mb-4 text-4xl  font-extrabold tracking-tight text-primary-600 dark:text-white">
          {t("campaigns")}
        </h2>
      </div>
      <div className=" w-ful mx-auto max-w-screen-xl justify-items-center rounded-xl p-4 md:grid md:grid-cols-2 md:py-8 lg:grid lg:grid-cols-3">
        <CampaignCard />
        <CampaignCard />
        <CampaignCard />
        <CampaignCard />
      </div>
    </>
  );
};
export default Campaign;
