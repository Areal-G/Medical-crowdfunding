/* eslint-disable no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
import { useState, useRef, useEffect } from "react";
import useFileUploader from "../../components/Common/useFileUploader";
import { useNavigate } from "react-router-dom";
import API from "../../components/Common/api";
import { Toaster, toast } from "sonner";
import {
  validatePassword,
  validatePhoneNumber,
} from "../../components/Common/Validation";

import Loading from "../../components/Common/Loading";
const HospitalAdminSettingPage = () => {
  const navigate = useNavigate();

  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoadingPhoto, setIsLoadingPhoto] = useState(false);
  const [isLoadingPassword, setIsLoadingPassword] = useState(false);
  const [isLoadingDetails, setIsLoadingDetails] = useState(false);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [data, setData] = useState(null);
  const [imageData] = useState([]);
  const { handleFilesChange, uploadFiles } = useFileUploader();
  const inputRef = useRef();

  const [detailsData, setDetailsData] = useState({
    hospitalName: "",
    email: "",
    state: "",
    address: "",
    city: "",
    phoneNumber: "",
    bankAccount: {
      accountHolderName: "",
      accountNumber: "",
      bankName: "",
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await API.get("/hospital/gethospitalnavdata");
        setData(response.data);

        const {
          hospitalName,
          email,
          state,
          address,
          city,
          phoneNumber,
          bankAccount: { accountHolderName, accountNumber, bankName },
        } = response.data;

        setDetailsData({
          hospitalName,
          email,
          state,
          address,
          city,
          phoneNumber,
          bankAccount: {
            accountHolderName,
            accountNumber,
            bankName,
          },
        });
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchData();
  }, []);

  ///////////////////////////////////////////////////////////////////////////////////////////////////////
  const handlePhotoChange = (event) => {
    const file = event.target.files[0];

    const reader = new FileReader();
    reader.onload = (e) => {
      setPhotoPreview(e.target.result);
    };
    reader.readAsDataURL(file);
  };

  const handleButtonClick = () => {
    inputRef.current.click();
  };

  const handleImageSubmit = async (event) => {
    event.preventDefault();
    setIsLoadingPhoto(true);

    try {
      const uploadedImages = await uploadFiles();
      const updatedImageData = {
        ...imageData,
        image: uploadedImages,
      };

      const response = await API.put("/hospital/updateimage", updatedImageData);
      console.log(response.data);
      toast.success("Image uploaded successfully!");
      navigate("/");
      navigate("/hospital/setting", { replace: true });
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setIsLoadingPhoto(false);
    }
  };

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    password: "",
    confirmPassword: "",
  });

  const toggleOldPasswordVisibility = () => {
    setShowOldPassword(!showOldPassword);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData({ ...passwordData, [name]: value });
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setIsLoadingPassword(true);

    if (passwordData.password !== passwordData.confirmPassword) {
      toast.error("Passwords do not match");
      setIsLoadingPassword(false);
      return;
    }

    if (!validatePassword(passwordData.password)) {
      toast.error(
        "Password must be at least 6 characters long and include uppercase letters, numbers, and symbols.",
      );
      setIsLoadingPassword(false);
      return;
    }

    try {
      // eslint-disable-next-line no-unused-vars
      const response = await API.put("/hospital/updatepassword", passwordData);
      toast.success("Password updated successfully");
      console.log(response.data);
    } catch (error) {
      console.error("Error updating password:", error);
      // eslint-disable-next-line no-unused-vars
      toast.error(
        "There was an error!",
        error.response?.data?.message || error.message,
      );
    } finally {
      setIsLoadingPassword(false);
    }
  };
  /////////////////////////////////////////////////////////////////////////////////

  const handleDetailsChange = (e) => {
    const { name, value } = e.target;
    if (name in data.bankAccount) {
      setDetailsData({
        ...detailsData,
        bankAccount: {
          ...detailsData.bankAccount,
          [name]: value,
        },
      });
    } else {
      setDetailsData({
        ...detailsData,
        [name]: value,
      });
    }
  };

  const handleDetailsSubmit = async (e) => {
    e.preventDefault();
    setIsLoadingDetails(true);

    if (!validatePhoneNumber(detailsData.phoneNumber)) {
      toast.error(
        "Phone number must be 10 digits long and start with 09 or 07.",
      );
      setIsLoadingDetails(false);
      return;
    }
    try {
      // eslint-disable-next-line no-unused-vars
      const response = await API.put(
        "/hospital/updatepersonaldetails",
        detailsData,
      );
      toast.success("Details updated successfully!");
    } catch (error) {
      toast.error("There was an error updating your details!", error.message);
    } finally {
      setIsLoadingDetails(false);
    }
  };
  //////////////////////////////////////////////////////////////////////////////////////
  if (data === null) {
    return <Loading />;
  } else
    return (
      <>
        <Toaster richColors />
        <div className="justify-evenly bg-white  dark:bg-gray-900 lg:flex">
          <div className="left">
            <div className="mx-auto my-auto mt-7 flex w-full items-center rounded-xl border p-8 shadow-md  lg:px-12">
              <form className=" w-full" onSubmit={handleDetailsSubmit}>
                <h2 className="mb-8 text-center text-lg font-semibold text-black">
                  Personal Details
                </h2>
                <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
                  {/* Hospital Name Input */}
                  <div>
                    <label className="mb-2 block text-sm text-gray-600 dark:text-gray-200">
                      Hospital Name
                    </label>
                    <input
                      type="text"
                      name="hospitalName"
                      placeholder="John Snow"
                      value={detailsData.hospitalName}
                      onChange={handleDetailsChange}
                      className="block w-full rounded-md border-gray-200 px-4 py-3 text-sm focus:border-blue-500 focus:ring-blue-500 disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                    />
                  </div>
                  {/* Email Input */}
                  <div>
                    <label className="mb-2 block text-sm text-gray-600 dark:text-gray-200">
                      Email address
                    </label>
                    <input
                      type="email"
                      name="email"
                      placeholder="johnsnow@example.com"
                      value={detailsData.email}
                      onChange={handleDetailsChange}
                      className="block w-full rounded-md border-gray-200 px-4 py-3 text-sm focus:border-blue-500 focus:ring-blue-500 disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                    />
                  </div>
                  {/* State Input */}
                  <div>
                    <label className="mb-2 block text-sm text-gray-600 dark:text-gray-200">
                      State
                    </label>
                    <input
                      type="text"
                      name="state"
                      placeholder="Sidama"
                      value={detailsData.state}
                      onChange={handleDetailsChange}
                      className="block w-full rounded-md border-gray-200 px-4 py-3 text-sm focus:border-blue-500 focus:ring-blue-500 disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                    />
                  </div>
                  {/* Address Input */}
                  <div>
                    <label className="mb-2 block text-sm text-gray-600 dark:text-gray-200">
                      Address
                    </label>
                    <input
                      type="text"
                      name="address"
                      placeholder="Besides Tabor mountain"
                      value={detailsData.address}
                      onChange={handleDetailsChange}
                      className="block w-full rounded-md border-gray-200 px-4 py-3 text-sm focus:border-blue-500 focus:ring-blue-500 disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                    />
                  </div>
                  {/* City Input */}
                  <div>
                    <label className="mb-2 block text-sm text-gray-600 dark:text-gray-200">
                      City
                    </label>
                    <input
                      type="text"
                      name="city"
                      placeholder="Hawassa"
                      value={detailsData.city}
                      onChange={handleDetailsChange}
                      className="block w-full rounded-md border-gray-200 px-4 py-3 text-sm focus:border-blue-500 focus:ring-blue-500 disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                    />
                  </div>
                  {/* Phone Number Input */}
                  <div>
                    <label className="mb-2 block text-sm text-gray-600 dark:text-gray-200">
                      Phone Number
                    </label>
                    <input
                      type="text"
                      name="phoneNumber"
                      placeholder="+251911234567"
                      value={detailsData.phoneNumber}
                      onChange={handleDetailsChange}
                      className="block w-full rounded-md border-gray-200 px-4 py-3 text-sm focus:border-blue-500 focus:ring-blue-500 disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                    />
                  </div>
                  {/* Account Holder Name Input */}
                  <div>
                    <label className="mb-2 block text-sm text-gray-600 dark:text-gray-200">
                      Account Holder Name
                    </label>
                    <input
                      type="text"
                      name="accountHolderName"
                      placeholder="Account Holder Name"
                      value={detailsData.bankAccount.accountHolderName}
                      onChange={handleDetailsChange}
                      className="block w-full rounded-md border-gray-200 px-4 py-3 text-sm focus:border-blue-500 focus:ring-blue-500 disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                    />
                  </div>
                  {/* Account Number Input */}
                  <div>
                    <label className="mb-2 block text-sm text-gray-600 dark:text-gray-200">
                      Account Number
                    </label>
                    <input
                      type="text"
                      name="accountNumber"
                      placeholder="Account Number"
                      value={detailsData.bankAccount.accountNumber}
                      onChange={handleDetailsChange}
                      className="block w-full rounded-md border-gray-200 px-4 py-3 text-sm focus:border-blue-500 focus:ring-blue-500 disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                    />
                  </div>
                  {/* Bank Name Input */}
                  <div>
                    <label className="mb-2 block text-sm text-gray-600 dark:text-gray-200">
                      Bank Name
                    </label>
                    <input
                      type="text"
                      name="bankName"
                      placeholder="Bank Name"
                      value={detailsData.bankAccount.bankName}
                      onChange={handleDetailsChange}
                      className="block w-full rounded-md border-gray-200 px-4 py-3 text-sm focus:border-blue-500 focus:ring-blue-500 disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                    />
                  </div>
                </div>
                <div className="mt-6">
                  <button
                    type="submit"
                    disabled={isLoadingDetails}
                    className="w-full transform rounded-lg bg-blue-500 px-6 py-3 text-sm font-medium capitalize tracking-wide text-white transition-colors duration-300 hover:bg-blue-400 focus:bg-blue-400 focus:outline-none"
                  >
                    {isLoadingDetails ? (
                      <div className="flex items-center justify-center ">
                        <svg
                          aria-hidden="true"
                          className="h-8 w-8 animate-spin fill-blue-600 text-gray-200 dark:text-gray-600"
                          viewBox="0 0 100 101"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                            fill="currentColor"
                          />
                          <path
                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                            fill="currentFill"
                          />
                        </svg>
                      </div>
                    ) : (
                      "Update"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="right">
            <div className="col-span-6S w-full rounded-xl border p-8 shadow-md sm:col-span-4">
              <input
                type="file"
                id="photoInput"
                className="hidden"
                ref={inputRef}
                onChange={(e) => {
                  handlePhotoChange(e);
                  handleFilesChange(e);
                }}
              />

              <label
                className="mb-2 block text-center text-lg font-semibold text-black"
                htmlFor="photo"
              >
                Profile Photo
              </label>

              <div className="text-center">
                {!photoPreview ? (
                  <div className="mt-2">
                    <img
                      src={data?.image}
                      className="m-auto h-36 w-36 rounded-full object-cover shadow"
                      alt="Current Profile"
                    />
                  </div>
                ) : (
                  <div className="mt-2">
                    <span
                      className="m-auto block h-36 w-36 rounded-full shadow"
                      style={{
                        backgroundSize: "cover",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "center center",
                        backgroundImage: `url(${photoPreview})`,
                      }}
                    />
                  </div>
                )}
                <button
                  type="button"
                  className="focus:shadow-outline-blue mt-5 inline-flex items-center rounded-md border border-gray-300 bg-white px-2 py-2 text-xs font-semibold uppercase tracking-widest text-gray-700 shadow-sm transition duration-150 ease-in-out hover:text-gray-500 focus:border-blue-400 focus:outline-none active:bg-gray-50 active:text-gray-800"
                  onClick={handleButtonClick}
                >
                  Select New Photo
                </button>

                <button
                  type="submit"
                  className="mt-6 w-[70%] transform rounded-lg bg-primary-600 px-6 py-3 text-sm font-medium capitalize tracking-wide text-white transition-colors duration-300 hover:bg-blue-700"
                  disabled={isLoadingPhoto}
                  onClick={handleImageSubmit}
                >
                  {isLoadingPhoto ? (
                    <div className="flex items-center justify-center ">
                      <svg
                        aria-hidden="true"
                        className="h-8 w-8 animate-spin fill-blue-600 text-gray-200 dark:text-gray-600"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                          fill="currentColor"
                        />
                        <path
                          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                          fill="currentFill"
                        />
                      </svg>
                    </div>
                  ) : (
                    "Upload"
                  )}
                </button>
              </div>
            </div>
            <div className="mt-7 rounded-xl border p-8 shadow-md">
              <h2 className="mb-2 block text-center text-lg font-semibold text-black">
                Change password
              </h2>
              <form onSubmit={handlePasswordSubmit}>
                <div className="mt-2 flex">
                  <div className="relative  flex-1">
                    <label
                      htmlFor="oldPassword"
                      className="mb-2 block text-sm text-gray-600 dark:text-gray-200"
                    >
                      Old Password
                    </label>
                    <input
                      name="oldPassword"
                      type={showOldPassword ? "text" : "password"}
                      value={passwordData.oldPassword}
                      onChange={handlePasswordChange}
                      id="old-password"
                      className="block w-full rounded-md border-gray-200 px-4 py-3 text-sm focus:border-blue-500 focus:ring-blue-500 disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                      placeholder="Enter your old password"
                    />
                    <button
                      type="button"
                      onClick={toggleOldPasswordVisibility}
                      className="absolute right-0 top-7 p-3.5"
                    >
                      <svg
                        className="size-3.5 flex-shrink-0 text-gray-400 dark:text-neutral-600"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path
                          className={showOldPassword ? "hidden" : "block"}
                          d="M9.88 9.88a3 3 0 1 0 4.24 4.24"
                        ></path>
                        <path
                          className={showOldPassword ? "hidden" : "block"}
                          d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"
                        ></path>
                        <path
                          className={showOldPassword ? "hidden" : "block"}
                          d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"
                        ></path>
                        <line
                          className={showOldPassword ? "hidden" : "block"}
                          x1="2"
                          x2="22"
                          y1="2"
                          y2="22"
                        ></line>
                        <path
                          className={showOldPassword ? "block" : "hidden"}
                          d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"
                        ></path>
                        <circle
                          className={showOldPassword ? "block" : "hidden"}
                          cx="12"
                          cy="12"
                          r="3"
                        ></circle>
                      </svg>
                    </button>
                  </div>
                </div>

                <div className="max-w-sm">
                  <div className="flex">
                    <div className="relative flex-1">
                      <label
                        htmlFor="password"
                        className="mb-2 block text-sm text-gray-600 dark:text-gray-200"
                      >
                        New Password
                      </label>
                      <input
                        name="password"
                        type={showPassword ? "text" : "password"}
                        value={passwordData.password}
                        onChange={handlePasswordChange}
                        id="hs-strong-password-with-indicator-and-hint-in-popover"
                        className="block w-full rounded-md border-gray-200 px-4 py-3 text-sm focus:border-blue-500 focus:ring-blue-500 disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                        placeholder="Enter password"
                      />
                      <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className="absolute right-0 top-7 p-3.5"
                      >
                        <svg
                          className="size-3.5 flex-shrink-0 text-gray-400 dark:text-neutral-600"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path
                            className={showPassword ? "hidden" : "block"}
                            d="M9.88 9.88a3 3 0 1 0 4.24 4.24"
                          ></path>
                          <path
                            className={showPassword ? "hidden" : "block"}
                            d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"
                          ></path>
                          <path
                            className={showPassword ? "hidden" : "block"}
                            d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"
                          ></path>
                          <line
                            className={showPassword ? "hidden" : "block"}
                            x1="2"
                            x2="22"
                            y1="2"
                            y2="22"
                          ></line>
                          <path
                            className={showPassword ? "block" : "hidden"}
                            d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"
                          ></path>
                          <circle
                            className={showPassword ? "block" : "hidden"}
                            cx="12"
                            cy="12"
                            r="3"
                          ></circle>
                        </svg>
                      </button>
                      <div
                        id="hs-strong-password-popover"
                        className="absolute z-10 hidden w-full rounded-lg bg-white p-4 shadow-md dark:divide-neutral-700 dark:border dark:border-neutral-700 dark:bg-neutral-800"
                      >
                        <div
                          id="hs-strong-password-in-popover"
                          data-hs-strong-password='{
                "target": "#hs-strong-password-with-indicator-and-hint-in-popover",
                "hints": "#hs-strong-password-popover",
                "stripClasses": "hs-strong-password:opacity-100 hs-strong-password-accepted:bg-blue-500 h-2 flex-auto rounded-full bg-blue-500 opacity-50 mx-1",
                "mode": "popover"
              }'
                          className="-mx-1 mt-2 flex"
                        ></div>

                        <h4 className="mt-3 text-sm font-semibold text-gray-800 dark:text-white">
                          Your password must contain:
                        </h4>

                        <ul className="space-y-1 text-sm text-gray-500 dark:text-neutral-500">
                          <li
                            data-hs-strong-password-hints-rule-text="min-length"
                            className="hs-strong-password-active:text-blue-500 flex items-center gap-x-2"
                          >
                            <span className="hidden" data-check="">
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
                                <polyline points="20 6 9 17 4 12"></polyline>
                              </svg>
                            </span>
                            <span data-uncheck="">
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
                            </span>
                            Minimum number of characters is 6.
                          </li>
                          <li
                            data-hs-strong-password-hints-rule-text="lowercase"
                            className="hs-strong-password-active:text-blue-500 flex items-center gap-x-2"
                          >
                            <span className="hidden" data-check="">
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
                                <polyline points="20 6 9 17 4 12"></polyline>
                              </svg>
                            </span>
                            <span data-uncheck="">
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
                            </span>
                            Should contain lowercase.
                          </li>
                          <li
                            data-hs-strong-password-hints-rule-text="uppercase"
                            className="hs-strong-password-active:text-blue-500 flex items-center gap-x-2"
                          >
                            <span className="hidden" data-check="">
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
                                <polyline points="20 6 9 17 4 12"></polyline>
                              </svg>
                            </span>
                            <span data-uncheck="">
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
                            </span>
                            Should contain uppercase.
                          </li>
                          <li
                            data-hs-strong-password-hints-rule-text="numbers"
                            className="hs-strong-password-active:text-blue-500 flex items-center gap-x-2"
                          >
                            <span className="hidden" data-check="">
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
                                <polyline points="20 6 9 17 4 12"></polyline>
                              </svg>
                            </span>
                            <span data-uncheck="">
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
                            </span>
                            Should contain numbers.
                          </li>
                          <li
                            data-hs-strong-password-hints-rule-text="special-characters"
                            className="hs-strong-password-active:text-blue-500 flex items-center gap-x-2"
                          >
                            <span className="hidden" data-check="">
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
                                <polyline points="20 6 9 17 4 12"></polyline>
                              </svg>
                            </span>
                            <span data-uncheck="">
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
                            </span>
                            Should contain special characters.
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-3 flex">
                  <div className="relative flex-1">
                    <label
                      htmlFor="confirmPassword"
                      className="mb-2 block text-sm text-gray-600 dark:text-gray-200"
                    >
                      Confirm Password
                    </label>
                    <input
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      value={passwordData.confirmPassword}
                      onChange={handlePasswordChange}
                      id="confirm-password"
                      className="block w-full rounded-md border-gray-200 px-4 py-3 text-sm focus:border-blue-500 focus:ring-blue-500 disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                      placeholder="Confirm new password"
                    />
                    <button
                      type="button"
                      onClick={toggleConfirmPasswordVisibility}
                      className="absolute right-0 top-7 p-3.5"
                    >
                      <svg
                        className="size-3.5 flex-shrink-0 text-gray-400 dark:text-neutral-600"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path
                          className={showConfirmPassword ? "hidden" : "block"}
                          d="M9.88 9.88a3 3 0 1 0 4.24 4.24"
                        ></path>
                        <path
                          className={showConfirmPassword ? "hidden" : "block"}
                          d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"
                        ></path>
                        <path
                          className={showConfirmPassword ? "hidden" : "block"}
                          d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"
                        ></path>
                        <line
                          className={showConfirmPassword ? "hidden" : "block"}
                          x1="2"
                          x2="22"
                          y1="2"
                          y2="22"
                        ></line>
                        <path
                          className={showConfirmPassword ? "block" : "hidden"}
                          d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"
                        ></path>
                        <circle
                          className={showConfirmPassword ? "block" : "hidden"}
                          cx="12"
                          cy="12"
                          r="3"
                        ></circle>
                      </svg>
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  className="mt-4 flex w-full items-center justify-center rounded-lg bg-blue-500 px-5 py-2.5 text-white transition hover:bg-blue-600 focus:outline-none focus:ring"
                  disabled={isLoadingPassword}
                >
                  {isLoadingPassword ? (
                    <svg
                      className="mr-2 h-5 w-5 animate-spin text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 017-7.94V0l4 4-4 4V4.26A8.013 8.013 0 004 12z"
                      ></path>
                    </svg>
                  ) : (
                    "Change Password"
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </>
    );
};

export default HospitalAdminSettingPage;
