/* eslint-disable no-undef */
/* eslint-disable react-hooks/exhaustive-deps */
import Carousel from "../../components/donor/Carousel";
import DonatedCard from "../../components/donor/DonatedCard";
import HospitalProfile from "../../components/donor/HospitalProfile";
import DonationProgress from "../../components/donor/DonationProgress";

import { useEffect, useState } from "react";
import { Toaster, toast } from "sonner";
import { useSearchParams, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import API from "../../components/Common/api";
import { useTranslation } from "react-i18next";
import Loading from "../../components/Common/Loading";

const Campaign = () => {
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language;

  const [searchParams] = useSearchParams();
  const { id } = useParams();
  const navigate = useNavigate();
  const [hasProcessed, setHasProcessed] = useState(false);
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

  useEffect(() => {
    if (hasProcessed) return;

    const sessionId = searchParams.get("session_id");
    const tx_ref = searchParams.get("tx_ref");
    const success = searchParams.get("success");
    const canceled = searchParams.get("canceled");
    const donationMessage = searchParams.get("donationMessage");
    const isAnonymous = searchParams.get("isAnonymous") === "true";
    console.log(tx_ref, success, donationMessage, isAnonymous, campaignId);

    if (success && tx_ref) {
      API.post("/payment/savechapatransaction", {
        tx_ref,
        donationMessage,
        isAnonymous,
        campaignId,
      })
        .then(() => {
          toast.success(`Donation successful!`);
          navigate(`/campaigndetail/${campaignId}`);
        })
        .catch((error) => {
          console.error(
            "Error fetching session details or saving donation:",
            error,
          );
          toast.error("Failed to save donation.");
        })
        .finally(() => {
          setHasProcessed(true);
        });
    } else if (success && sessionId) {
      API.get(`/payment/stripeSessionDetails/${sessionId}`)
        .then((response) => {
          return API.post("/payment/savestripetransaction", {
            amount: response.data.amount_total / 100,
            currency: response.data.currency,
            transactionId: response.data.payment_intent,
            status: response.data.payment_status,
            donationMessage,
            isAnonymous,
            campaignId,
          });
        })
        .then(() => {
          toast.success(`Donation successful!`);
          navigate(`/campaigndetail/${campaignId}`);
        })
        .catch((error) => {
          console.error(
            "Error fetching session details or saving donation:",
            error,
          );
          toast.error("Failed to save donation.");
        })
        .finally(() => {
          setHasProcessed(true); // Mark as processed
        });
    } else if (canceled) {
      toast.info("Donation canceled.");
      setHasProcessed(true); // Mark as processed
    }
  }, [searchParams, hasProcessed, navigate, id]);
  if (campaignData === null) {
    return <Loading />;
  } else
    return (
      <div className="mx-auto mt-10  max-w-screen-xl">
        <Toaster richColors />
        <h2 className=" mx-auto mb-8 w-[90%] text-center text-3xl font-semibold  dark:text-white ">
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
                raised={campaignData?.totalRaisedMoney}
                goal={campaignData?.campaign.target}
                deadlinedate={campaignData?.deadlineDate}
                campaignId={campaignId}
              />

              <div>
                <HospitalProfile
                  image={
                    "https://images.gofundme.com/9l_J8RYXVHbf_nFGhfmysqUHL-U=/720x405/https://d2g8igdw686xgo.cloudfront.net/79670191_1713813007610813_r.jpeg"
                  }
                  name={campaignData?.campaign.hospital.hospitalName}
                  address={campaignData?.campaign.hospital.address}
                  city={campaignData?.campaign.hospital.city}
                  state={campaignData?.campaign.hospital.state}
                />
              </div>
              {/* Donations */}
              <div className="noscroll h-[430px] overflow-auto rounded-md bg-white shadow-2xl">
                {campaignData?.transactions.map((transaction, i) => (
                  <DonatedCard
                    key={i}
                    name={
                      !transaction.isAnonymous
                        ? transaction.donorId.fullname
                        : null
                    }
                    image={
                      !transaction.isAnonymous
                        ? transaction.donorId.image
                        : null
                    }
                    message={transaction?.donationMessage}
                    amount={transaction?.amount}
                    currency={transaction?.currency}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
};
export default Campaign;
