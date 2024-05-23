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
import { t } from "i18next";
import { useTranslation } from "react-i18next";

const slides = [
  "https://www.reuters.com/resizer/v2/https%3A%2F%2Fcloudfront-us-east-2.images.arcpublishing.com%2Freuters%2FVUQLBHODHJPLZEBJ37UKOF4L3I.jpg?auth=21ebe01956eac5be545b20cc0b7a90eeb422d5d3aed1e6cad13e231b2530c5e0&width=960&quality=80",
  "https://www.reuters.com/resizer/v2/https%3A%2F%2Fcloudfront-us-east-2.images.arcpublishing.com%2Freuters%2FUJRQVRDGUBKKFOKKX4MSFS53OU.jpg?auth=e89b4eae1604a52675c1e34d1b3b0f6d4d77559c6e5f6f24500b6109515ad62f&width=960&quality=80",
  "https://www.reuters.com/resizer/v2/https%3A%2F%2Fcloudfront-us-east-2.images.arcpublishing.com%2Freuters%2FVUQLBHODHJPLZEBJ37UKOF4L3I.jpg?auth=21ebe01956eac5be545b20cc0b7a90eeb422d5d3aed1e6cad13e231b2530c5e0&width=960&quality=80",
  "https://www.reuters.com/resizer/v2/https%3A%2F%2Fcloudfront-us-east-2.images.arcpublishing.com%2Freuters%2FUJRQVRDGUBKKFOKKX4MSFS53OU.jpg?auth=e89b4eae1604a52675c1e34d1b3b0f6d4d77559c6e5f6f24500b6109515ad62f&width=960&quality=80",
];

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
    API.get(`/donor/getcampaigndetail/${campaignId}`)
      .then((response) => {
        setCampaignData(response.data);
        console.log(response.data);
        console.log(campaignData);
      })
      .catch((error) => {
        console.error("Error fetching campaign details:", error);
      });
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

  return (
    // container
    <div className="mx-auto mt-10  max-w-screen-xl">
      <Toaster richColors />
      <h2 className=" mx-auto mb-8 w-[90%] text-center text-3xl font-semibold  dark:text-white ">
        {/* {campaignData.Campaign.campaignTitle.en} */}
      </h2>
      <div className="  justify-between lg:flex">
        <div className="left mx-auto flex w-[90%] flex-col  lg:w-[70%]">
          <div className=" mx-auto h-auto w-[90%] rounded-lg shadow-lg lg:w-[80%]">
            <Carousel>
              {[
                ...slides.map((s, i) => (
                  <img key={i} className=" object-cover" src={s} />
                )),
              ]}
            </Carousel>
          </div>
          <div className=" mx-auto mt-5 rounded-lg py-5 shadow-lg lg:w-[80%]">
            <p className=" mx-auto  mt-4 w-[95%] text-pretty text-base ">
              There are few words that can truly capture the essence of the hope
              and resilience embodied by the African children battling illness
              every day. Their courage in the face of adversity, their
              unwavering spirit, and their infectious smiles serve as a beacon
              of inspiration to us all. These children, despite facing
              unimaginable challenges, continue to radiate love and joy in every
              moment. Their strength and determination remind us of the power of
              the human spirit and the importance of embracing each day with
              gratitude and optimism. Just like Jake Parker, these children have
              the innate ability to touch the lives of those around them. Their
              innocence, their laughter, and their unwavering faith in tomorrow
              remind us of the beauty and wonder of life itself. During this
              difficult time, we are reaching out to ask for your support. Your
              generous donation can make a meaningful difference in the lives of
              these incredible children, providing them with access to vital
              medical care, resources, and support they need to thrive. Your
              contribution, no matter how big or small, will help us ensure that
              these children receive the care and attention they deserve.
              Together, we can make a difference in the lives of these brave
              African children and help them write a brighter future filled with
              hope, health, and happiness. Thank you for considering a donation
              to support these extraordinary children. Your kindness and
              compassion will leave a lasting impact on their lives and inspire
              hope for a better tomorrow.
            </p>
          </div>
        </div>
        <div className="right lg:w-[30%]">
          <div className=" mx-auto  w-[90%] ">
            {/* progress bar    and look at the mt10 */}
            <DonationProgress campaignId={campaignId} />

            <div>
              <HospitalProfile
                image={
                  "https://images.gofundme.com/9l_J8RYXVHbf_nFGhfmysqUHL-U=/720x405/https://d2g8igdw686xgo.cloudfront.net/79670191_1713813007610813_r.jpeg"
                }
                name={"Hospital Name"}
                address={"Address"}
                city={"City"}
                state={"State"}
              />
            </div>
            {/* Donations */}
            <div className="">
              <DonatedCard />
              <DonatedCard />
              <DonatedCard />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Campaign;
