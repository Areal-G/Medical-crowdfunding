/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import API from "../Common/api";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const DonationProgress = (props) => {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [donationAmount, setDonationAmount] = useState("");
  const [donationMessage, setDonationMessage] = useState(""); // New state for message
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [paymentSystem, setPaymentSystem] = useState("local");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const response = await API.get(`/auth/isloggedin`);
        setIsLoggedIn(response.data.isLoggedIn);
      } catch (error) {
        console.error("Error checking login status:", error);
      }
    };

    checkLoginStatus();
  }, [location]);

  const handleModalToggle = () => {
    if (isLoggedIn) {
      setIsModalOpen(!isModalOpen);
    } else {
      navigate("/signin");
    }
  };

  const handleDonate = async () => {
    if (paymentSystem === "international") {
      try {
        const response = await API.post("/payment/stripepay", {
          donationAmount: donationAmount,
          donationMessage: donationMessage,
          isAnonymous: isAnonymous,
          campaignId: props.campaignId,
        });
        window.location.href = response.data.url;
      } catch (error) {
        console.error("Error creating checkout session", error);
      }
    } else if (paymentSystem === "local") {
      try {
        const response = await API.post("/payment/chapapay", {
          amount: donationAmount,
          message: donationMessage,
          isAnonymous: isAnonymous,
          campaignId: props.campaignId,
        });
        window.location.href = response.data;
      } catch (error) {
        console.error("Error creating checkout session", error);
      }
    }
  };
  return (
    <div className="rounded-lg py-5 shadow-lg hover:shadow-blue-400">
      <div className="mx-auto w-[90%]">
        <div className="flex justify-between">
          <p>
            <span className="font-bold">{props.donations}</span>{" "}
            {t("donations")}
          </p>
          <p className="font-bold">{props.donationpercent}%</p>
        </div>
        <div className="my-2 h-1 rounded-full bg-gray-200 dark:bg-gray-700">
          <div
            className="h-1 rounded-full bg-primary-600"
            style={{ width: `${props.donationpercent}%` }}
          ></div>
        </div>
        <div className="flex justify-between">
          <p>
            {t("raised")}
            <span className="font-bold">
              {props.raised?.toLocaleString()}
            </span>{" "}
            {t("birr")}
          </p>
          <p>
            {t("goal")}
            <span className="font-bold">
              {props.goal?.toLocaleString()}{" "}
            </span>{" "}
            {t("birr")}
          </p>
        </div>
        <div className="mt-4 text-right">
          <p>
            <span className="font-bold">
              {props.deadlinedate ? props.deadlinedate : ""}
            </span>{" "}
            {props.deadlinedate ? t("daysleft") : ""}
          </p>
        </div>
        {/* Donate button */}
        {!props.noDonateButton && (
          <div className="mt-5 flex justify-center">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-lg bg-primary-600 px-12 py-3 text-center text-base font-medium text-white hover:bg-primary-700 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900"
              onClick={handleModalToggle}
            >
              {t("donate")}
              <svg
                className="-mr-1 ml-2 h-5 w-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center">
          <div
            className="fixed inset-0 bg-black opacity-50"
            onClick={handleModalToggle}
          ></div>
          <div className="relative m-3 sm:mx-auto sm:w-full sm:max-w-lg">
            <div className="pointer-events-auto flex flex-col rounded-xl border bg-white shadow-sm dark:border-neutral-700 dark:bg-neutral-800 dark:shadow-neutral-700/70">
              <div className="flex items-center justify-between border-b px-4 py-3 dark:border-neutral-700">
                <h3 className="font-bold text-gray-800 dark:text-white">
                  {t("donate")}
                </h3>
                <button
                  type="button"
                  className="flex size-7 items-center justify-center rounded-full border border-transparent text-sm font-semibold text-gray-800 hover:bg-gray-100 disabled:pointer-events-none disabled:opacity-50 dark:text-white dark:hover:bg-neutral-700"
                  onClick={handleModalToggle}
                >
                  <span className="sr-only">Close</span>
                  <svg
                    className="size-4 flex-shrink-0"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M18 6 6 18"></path>
                    <path d="m6 6 12 12"></path>
                  </svg>
                </button>
              </div>
              <div className="mt-4">
                <label className="flex items-center justify-evenly text-gray-700 dark:text-white">
                  {t("paymentsystem")}
                </label>
                <div className="mt-3 flex justify-center gap-x-2">
                  <button
                    type="button"
                    className={`inline-flex items-center gap-x-2 rounded-lg border px-3 py-2 text-sm font-medium ${
                      paymentSystem === "local"
                        ? "bg-blue-600 text-white"
                        : "bg-white text-gray-800"
                    } shadow-sm  dark:border-neutral-700 dark:bg-neutral-900 dark:text-white `}
                    onClick={() => setPaymentSystem("local")}
                  >
                    {t("local")}
                  </button>
                  <button
                    type="button"
                    className={`inline-flex items-center gap-x-2 rounded-lg border px-3 py-2 text-sm font-medium ${
                      paymentSystem === "international"
                        ? "bg-blue-600 text-white"
                        : "bg-white text-gray-800"
                    } shadow-sm  dark:border-neutral-700 dark:bg-neutral-900 dark:text-white `}
                    onClick={() => setPaymentSystem("international")}
                  >
                    {t("international")}
                  </button>
                </div>
              </div>
              <div className="overflow-y-auto p-4">
                <div className="mt-4">
                  <label className="block text-gray-700 dark:text-white">
                    {t("donationamount")}
                  </label>
                  <input
                    type="number"
                    className="mt-1 w-full rounded-lg border-gray-300 shadow-sm dark:border-neutral-700 dark:bg-neutral-900 dark:text-white"
                    value={donationAmount}
                    onChange={(e) => setDonationAmount(e.target.value)}
                    placeholder="$ 0.00"
                  />
                </div>
                <div className="mt-4">
                  <label className="block text-gray-700 dark:text-white">
                    {t("donationmessage")}
                  </label>
                  <input
                    type="text"
                    className="mt-1 w-full rounded-lg border-gray-300 shadow-sm dark:border-neutral-700 dark:bg-neutral-900 dark:text-white"
                    value={donationMessage}
                    onChange={(e) => setDonationMessage(e.target.value)}
                    placeholder="Type your message here..."
                  />
                </div>
                <div className="mt-4">
                  <label className="flex items-center text-gray-700 dark:text-white">
                    <input
                      type="checkbox"
                      className="mr-2"
                      checked={isAnonymous}
                      onChange={(e) => setIsAnonymous(e.target.checked)}
                    />
                    {t("donateanonymously")}
                  </label>
                </div>
              </div>
              <div className="flex items-center justify-end gap-x-2 border-t px-4 py-3 dark:border-neutral-700">
                <button
                  type="button"
                  onClick={handleDonate}
                  className="inline-flex items-center gap-x-2 rounded-lg border border-transparent bg-blue-600 px-3 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:pointer-events-none disabled:opacity-50"
                >
                  {t("donate")}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DonationProgress;
