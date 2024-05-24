import Carousel from "../../components/donor/Carousel";

import { useState, useEffect } from "react";
import API from "../../components/Common/api";
import Loading from "../../components/Common/Loading";

const MyCampaign = () => {
  const [campaignData, setCampaignData] = useState(null);

  useEffect(() => {
    const fetchCampaignData = async () => {
      try {
        const response = await API.get(`/patient/getcampaigndetail`);
        setCampaignData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching campaign details:", error);
      }
    };

    fetchCampaignData();
  }, []);

  if (campaignData === null) {
    return <Loading />;
  } else
    return (
      <div className="mx-auto mt-10  max-w-screen-xl">
        <h2 className=" mx-auto mb-8 w-[90%] text-center text-3xl font-semibold  dark:text-white ">
          {campaignData?.campaignTitle.en}
        </h2>
        <div className="  justify-between lg:flex">
          <div className="l mx-auto flex w-[90%]  flex-col">
            <div className=" mx-auto w-[90%] rounded-lg shadow-lg ">
              {campaignData && (
                <Carousel>
                  {campaignData.images.map((image, index) => (
                    <img
                      key={index}
                      className="center object-cover"
                      src={image}
                    />
                  ))}
                </Carousel>
              )}
            </div>
            <div className=" mx-auto mt-5 rounded-lg py-5 shadow-lg ">
              <p className=" mx-auto  mt-4 w-[95%] text-pretty text-base ">
                {campaignData?.campaignDescription.en}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
};
export default MyCampaign;
