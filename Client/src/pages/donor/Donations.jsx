import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import API from "../../components/Common/api";
import { Link } from "react-router-dom";

const Donations = () => {
  const { t } = useTranslation();
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language;
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const response = await API.get("/donor/mydonations");
        setCampaigns(response.data.transactions);
      } catch (error) {
        console.error("Error fetching campaigns:", error);
      }
    };

    fetchCampaigns();
  }, []);

  return (
    <>
      <div className=" mx-auto mb-8 mt-5 max-w-screen-lg  text-center ">
        <h2 className=" text-4xl  font-extrabold tracking-tight text-primary-600 dark:text-white">
          {t("mydonations")}
        </h2>
      </div>

      <div className="mx-auto w-full max-w-screen-xl rounded-xl bg-slate-50 p-4">
        <div className="mx-2 grid grid-cols-1 gap-5 gap-y-10 md:grid-cols-2 lg:grid-cols-2">
          {campaigns?.map((transaction, index) => (
            <div key={index} className="p-2">
              <Link
                to={`/mydonatedcampaign/${transaction.campaignId._id}`}
                className="rounded-xl border bg-white shadow-sm dark:border-neutral-700 dark:bg-neutral-900 dark:shadow-neutral-700/70 sm:flex"
              >
                <div className="relative w-full flex-shrink-0 overflow-hidden rounded-t-xl pt-[40%] sm:max-w-60 sm:rounded-s-xl md:max-w-xs md:rounded-se-none">
                  <img
                    className="absolute start-0 top-0 size-full object-cover"
                    src={transaction.campaignId.images[0]}
                  />
                </div>
                <div className="flex flex-wrap">
                  <div className="flex h-full flex-col p-4 sm:p-7">
                    <h3 className="text-lg font-semibold uppercase  text-gray-800 dark:text-white">
                      {transaction.campaignId.campaignTitle[currentLanguage]}
                    </h3>
                    <hr className=" mt-3"></hr>
                    <p className="mt-5  dark:text-neutral-400">
                      {t("amount")} :
                      <span className="font-semibold uppercase">
                        {transaction.amount.toLocaleString()}{" "}
                        {transaction.currency === "usd"
                          ? t("dollar")
                          : t("birr")}{" "}
                      </span>
                    </p>
                    <div className="mt-5 sm:mt-auto">
                      <p className="text-xs text-gray-500 dark:text-neutral-500">
                        {transaction.createdAt
                          ? new Date(transaction.createdAt).toLocaleDateString(
                              "en-US",
                              {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              },
                            )
                          : "Invalid Date"}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
export default Donations;
