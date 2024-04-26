import CampaignCard from "./CampaignCard";

const Campaign = () => {
  return (
    <>
      <div className="mx-auto mb-8 max-w-screen-md text-center ">
        <h2 className="text-primary-600 mb-4  text-4xl font-extrabold tracking-tight dark:text-white">
          Campiagns
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
