/* eslint-disable no-undef */
/* eslint-disable react-hooks/exhaustive-deps */
import Carousel from "../../components/donor/Carousel";

import HospitalProfile from "../../components/donor/HospitalProfile";
import DonationProgress from "../../components/donor/DonationProgress";

import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import API from "../../components/Common/api";
import { useTranslation } from "react-i18next";
import Loading from "../../components/Common/Loading";
const MyDonatedCampaignDetailPage = () => {
  const { i18n, t } = useTranslation();
  const currentLanguage = i18n.language;

  const { id } = useParams();

  const campaignId = id;
  const [campaignData, setCampaignData] = useState(null);

  useEffect(() => {
    const fetchCampaignData = async () => {
      try {
        const response = await API.get(
          `/donor/getcampaigndetail/${campaignId}`,
        );
        setCampaignData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching campaign details:", error);
      }
    };

    fetchCampaignData();
  }, [campaignId]);

  if (campaignData === null) {
    return <Loading />;
  } else
    return (
      <div className="mx-auto mt-10  max-w-screen-xl">
        <h2 className=" mx-auto mb-8 w-[90%] text-center text-3xl font-semibold uppercase  dark:text-white ">
          {campaignData?.campaign.campaignTitle[currentLanguage]}
        </h2>
        <div className="  justify-between lg:flex">
          <div className="left mx-auto flex w-[90%] flex-col  lg:w-[70%]">
            <div className=" mx-auto w-[90%] rounded-lg shadow-lg lg:w-[80%]">
              {campaignData && (
                <Carousel>
                  {campaignData.campaign.images.map((image, index) => (
                    <img
                      key={index}
                      className="center object-cover"
                      src={image}
                    />
                  ))}
                </Carousel>
              )}
            </div>
            <div className=" mx-auto mt-5 rounded-lg py-5 shadow-lg lg:w-[80%]">
              <p className=" mx-auto  mt-4 w-[95%] text-pretty text-base ">
                {campaignData?.campaign.campaignDescription[currentLanguage]}
              </p>
            </div>
          </div>
          <div className="right lg:w-[30%]">
            <div className=" mx-auto  w-[90%] ">
              {/* progress bar    and look at the mt10 */}
              <DonationProgress
                donations={campaignData?.donations}
                donationpercent={campaignData?.raisedPercent}
                campaignId={campaignId}
                raised={campaignData?.totalRaisedMoney}
                goal={campaignData?.campaign.target}
                {...(campaignData?.campaign.isUpdate ||
                campaignData?.campaign.status === "closed"
                  ? { deadlinedate: campaignData?.deadlineDate }
                  : {})}
                {...(campaignData?.campaign.isUpdate
                  ? { noDonateButton: true }
                  : {})}
              />
              <div>
                <HospitalProfile
                  image={campaignData?.campaign.hospital.image}
                  name={campaignData?.campaign.hospital.hospitalName}
                  address={campaignData?.campaign.hospital.address}
                  city={campaignData?.campaign.hospital.city}
                  state={campaignData?.campaign.hospital.state}
                />
              </div>
            </div>
          </div>
        </div>
        {campaignData.campaign.isUpdate ? (
          <div>
            <hr className="mt-8 border-2 border-primary-500 " />
            <h2 className=" mx-auto my-10 w-[90%] text-center text-4xl font-semibold dark:text-white ">
              {t("update")}
            </h2>
            <div className=" mx-auto w-[90%] rounded-lg shadow-lg lg:w-[80%]">
              {campaignData && (
                <Carousel>
                  {campaignData.campaign.updateImages?.map((image, index) => (
                    <img
                      key={index}
                      className="center object-cover"
                      src={image}
                    />
                  ))}
                </Carousel>
              )}
            </div>
            <div className=" mx-auto mt-5 rounded-lg py-5 shadow-lg lg:w-[80%]">
              <p className=" mx-auto  mt-4 w-[60%] text-pretty text-base ">
                {campaignData?.campaign.isUpdate
                  ? campaignData.campaign.update[currentLanguage]
                  : ""}
              </p>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    );
};
export default MyDonatedCampaignDetailPage;
