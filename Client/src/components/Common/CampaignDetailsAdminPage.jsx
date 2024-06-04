/* eslint-disable react-hooks/exhaustive-deps */
import Carousel from "../donor/Carousel";
import { useState, useEffect } from "react";
import API from "../Common/api";
import Loading from "../Common/Loading";
import { useParams } from "react-router-dom";
import { CgBlock, CgUnblock, CgSpinner } from "react-icons/cg";
import { CgCloseO } from "react-icons/cg";

const CampaignDetailsAdminPage = () => {
  const [campaignData, setCampaignData] = useState(null);
  const [isLoading, setisLoading] = useState(false);

  const { id } = useParams();
  const campaignId = id;
  const fetchData = async () => {
    try {
      const response = await API.get(`/donor/getcampaigndetail/${campaignId}`);
      setCampaignData(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching campaign details:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [campaignId]);

  const handleToggleBlock = async (newStatus) => {
    try {
      setisLoading(true);
      await API.put(`/sysadmin/updatecampaignstatus/${campaignId}`, {
        status: newStatus,
      });
      fetchData();
    } catch (err) {
      console.error(err);
    } finally {
      setisLoading(false);
    }
  };

  if (campaignData === null) {
    return <Loading />;
  } else
    return (
      <div className="mx-auto mt-10  max-w-screen-xl">
        {/* <Toaster richColors /> */}
        <h2 className=" mx-auto mb-8 w-[90%] text-center text-3xl font-semibold  dark:text-white ">
          {campaignData?.campaign.campaignTitle.en}
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
                {campaignData?.campaign.campaignDescription.en}
              </p>
            </div>
          </div>
          <div className="right lg:w-[30%]">
            <div className="mx-auto w-[90%] rounded-lg py-5  shadow-lg ">
              <div className="mx-auto w-[90%]">
                <div className="flex justify-between">
                  <p>
                    <span className="font-bold">{campaignData?.donations}</span>{" "}
                    Donations
                  </p>
                  <p className="font-bold">{campaignData?.raisedPercent} %</p>
                </div>
                <div className="my-2 h-1 rounded-full bg-gray-200 dark:bg-gray-700">
                  <div
                    className="h-1 rounded-full bg-primary-600"
                    style={{ width: `${campaignData?.raisedPercent}%` }}
                  ></div>
                </div>
                <div className="flex justify-between">
                  <p>
                    Raised:{" "}
                    <span className="font-bold">
                      {campaignData?.totalRaisedMoney.toLocaleString()}
                    </span>{" "}
                    Birr
                  </p>
                  <p>
                    Goal:{" "}
                    <span className="font-bold">
                      {campaignData?.campaign.target.toLocaleString()}{" "}
                    </span>{" "}
                    Birr
                  </p>
                </div>
                <div className="mt-4 text-right">
                  <p>
                    <span className="font-bold">
                      {campaignData?.deadlineDate}
                    </span>{" "}
                    Days left
                  </p>
                </div>
                <div>
                  <div className="flex justify-center">
                    <p
                      className={`mt-5 inline-flex rounded-full bg-opacity-10 px-3 py-1 text-center text-sm font-medium uppercase ${
                        campaignData?.campaign.status === "active"
                          ? "bg-green-500 text-green-500"
                          : campaignData?.campaign.status === "closed"
                            ? "bg-red-500 text-red-500"
                            : campaignData?.campaign.status === "pending"
                              ? "bg-yellow-500 text-yellow-500"
                              : campaignData?.campaign.status === "rejected"
                                ? "bg-gray-500 text-gray-500"
                                : "bg-blue-500 text-blue-500"
                      }`}
                    >
                      {campaignData?.campaign.status}
                    </p>
                  </div>

                  <div className="mt-5">
                    {isLoading ? (
                      <CgSpinner className="h-7 w-7 animate-spin" />
                    ) : (
                      <>
                        {campaignData?.campaign.status === "active" && (
                          <button
                            onClick={() => handleToggleBlock("closed")}
                            className="mr-3 flex items-center hover:text-red-400"
                          >
                            <CgBlock className="h-10 w-10" />
                            <p className="ml-2 font-semibold">Close</p>
                          </button>
                        )}

                        {campaignData?.campaign.status === "pending" && (
                          <div className="flex">
                            <button
                              onClick={() => handleToggleBlock("active")}
                              className="mr-3 flex items-center hover:text-green-400"
                            >
                              <CgUnblock className="h-10 w-10" />
                              <p className="ml-2 font-semibold">Approve</p>
                            </button>
                            <button
                              onClick={() => handleToggleBlock("rejected")}
                              className="mr-3 flex items-center hover:text-orange-400"
                            >
                              <CgCloseO className="h-10 w-10" />
                              <p className="ml-2 font-semibold">Reject</p>
                            </button>
                          </div>
                        )}

                        {(campaignData?.campaign.status === "closed" ||
                          campaignData?.campaign.status === "rejected") && (
                          <button
                            onClick={() => handleToggleBlock("active")}
                            className="mr-3 flex items-center hover:text-green-400"
                          >
                            <CgUnblock className="h-10 w-10" />
                            <p className="ml-2 font-semibold">Active</p>
                          </button>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
};
export default CampaignDetailsAdminPage;
