import { t } from "i18next";
import CampaignCard from "./CampaignCard";
import { useState, useEffect } from "react";
import API from "../../components/Common/api";
import { useTranslation } from "react-i18next";
const Campaign = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // Number of items per page
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language;

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const response = await API.get("/donor/getcampaigns");
        console.log(response.data);
        const campaigns = response.data.map((campaign) => ({
          ...campaign,
          campaignTitle: campaign.campaignTitle[currentLanguage],
          campaignDescription: campaign.campaignDescription[currentLanguage],
        }));
        setCampaigns(campaigns);
      } catch (error) {
        console.error("Error fetching campaigns:", error);
      }
    };

    fetchCampaigns();
  }, [currentLanguage]); //

  // Calculate the index of the first and last item of the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = campaigns.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(campaigns.length / itemsPerPage);

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  return (
    <>
      <div className=" mx-auto mb-8 mt-5 max-w-screen-md  text-center ">
        <h2 className=" text-4xl  font-extrabold tracking-tight text-primary-600 dark:text-white">
          {t("campaigns")}
        </h2>
      </div>

      <div className="mx-auto w-full max-w-screen-xl rounded-xl bg-slate-50 p-4">
        <div className="mx-2 grid grid-cols-1 gap-5 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
          {currentItems
            .filter((campaign) => campaign.status === "active")
            .map((campaign, index) => (
              <div key={index} className="p-2">
                <CampaignCard
                  id={campaign._id}
                  title={campaign.campaignTitle}
                  description={campaign.campaignDescription}
                  date={campaign.createdAt}
                  city={campaign.hospital.city}
                  goal={campaign.target}
                  image={campaign.images[0]}
                  donations={campaign.donations}
                  raised={campaign.raisedMoney}
                  progress={campaign.raisedPercent}
                />
              </div>
            ))}
        </div>
        <div className="mt-4 flex justify-evenly">
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className="rounded bg-primary-500  px-4 py-2 text-white disabled:opacity-80"
          >
            Previous
          </button>
          <span className="px-4 py-2">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="rounded bg-primary-500 px-4 py-2 text-white disabled:opacity-80"
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};
export default Campaign;
