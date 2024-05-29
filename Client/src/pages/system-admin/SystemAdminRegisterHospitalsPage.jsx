import { useState, useRef } from "react";
import { Toaster, toast } from "sonner";
import useFileUploader from "../../components/Common/useFileUploader";
import API from "../../components/Common/api";

const SystemAdminRegisterHospitalsPage = () => {
  const { handleFilesChange, uploadFiles } = useFileUploader();
  const [formData, setFormData] = useState({
    hospitalName: "",
    email: "",
    image: [],
    state: "",
    address: "",
    city: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    bankAccount: {
      accountHolderName: "",
      accountNumber: "",
      bankName: "",
    },
  });

  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef();

  const resetForm = () => {
    setFormData({
      hospitalName: "",
      email: "",
      image: [],
      state: "",
      address: "",
      city: "",
      phoneNumber: "",
      password: "",
      confirmPassword: "",
      bankAccount: {
        accountHolderName: "",
        accountNumber: "",
        bankName: "",
      },
    });
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name in formData.bankAccount) {
      setFormData({
        ...formData,
        bankAccount: {
          ...formData.bankAccount,
          [name]: value,
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const validatePassword = (password) => {
    const passwordRegex =
      /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    return passwordRegex.test(password);
  };

  const validatePhoneNumber = (phoneNumber) => {
    const phoneRegex = /^(09|07)\d{8}$/;
    return phoneRegex.test(phoneNumber);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      setIsLoading(false);
      return;
    }

    if (!validatePassword(formData.password)) {
      toast.error(
        "Password must be at least 8 characters long and include uppercase letters, numbers, and symbols.",
      );
      setIsLoading(false);
      return;
    }

    if (!validatePhoneNumber(formData.phoneNumber)) {
      toast.error(
        "Phone number must be 10 digits long and start with 09 or 07.",
      );
      setIsLoading(false);
      return;
    }

    try {
      const imageUrl = await uploadFiles();
      const updatedFormData = {
        ...formData,
        image: imageUrl,
      };

      const response = await API.post("/sysadmin/register", updatedFormData);
      toast.success(response.data);

      resetForm();
    } catch (error) {
      toast.error("There was an error!", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="dark:bg-gray-900">
      <Toaster richColors />
      <div className="flex justify-center">
        <div className="mx-auto my-auto mt-7 flex w-full max-w-4xl items-center rounded-xl bg-white p-8 shadow-2xl lg:w-[50%] lg:px-12">
          <div className="w-full">
            <div className="mx-auto flex justify-center">
              <h1 className="text-2xl">Register Hospital</h1>
            </div>

            <form onSubmit={handleSubmit}>
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
                    value={formData.hospitalName}
                    onChange={handleChange}
                    className="mt-2 block w-full rounded-lg border border-gray-200 bg-white px-5 py-3 text-gray-700 placeholder-gray-400 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-400 focus:ring-opacity-40 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:placeholder-gray-600 dark:focus:border-blue-400"
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
                    value={formData.email}
                    onChange={handleChange}
                    className="mt-2 block w-full rounded-lg border border-gray-200 bg-white px-5 py-3 text-gray-700 placeholder-gray-400 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-400 focus:ring-opacity-40 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:placeholder-gray-600 dark:focus:border-blue-400"
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
                    value={formData.state}
                    onChange={handleChange}
                    className="mt-2 block w-full rounded-lg border border-gray-200 bg-white px-5 py-3 text-gray-700 placeholder-gray-400 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-400 focus:ring-opacity-40 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:placeholder-gray-600 dark:focus:border-blue-400"
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
                    value={formData.address}
                    onChange={handleChange}
                    className="mt-2 block w-full rounded-lg border border-gray-200 bg-white px-5 py-3 text-gray-700 placeholder-gray-400 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-400 focus:ring-opacity-40 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:placeholder-gray-600 dark:focus:border-blue-400"
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
                    value={formData.city}
                    onChange={handleChange}
                    className="mt-2 block w-full rounded-lg border border-gray-200 bg-white px-5 py-3 text-gray-700 placeholder-gray-400 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-400 focus:ring-opacity-40 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:placeholder-gray-600 dark:focus:border-blue-400"
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
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    className="mt-2 block w-full rounded-lg border border-gray-200 bg-white px-5 py-3 text-gray-700 placeholder-gray-400 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-400 focus:ring-opacity-40 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:placeholder-gray-600 dark:focus:border-blue-400"
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
                    value={formData.bankAccount.accountHolderName}
                    onChange={handleChange}
                    className="mt-2 block w-full rounded-lg border border-gray-200 bg-white px-5 py-3 text-gray-700 placeholder-gray-400 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-400 focus:ring-opacity-40 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:placeholder-gray-600 dark:focus:border-blue-400"
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
                    value={formData.bankAccount.accountNumber}
                    onChange={handleChange}
                    className="mt-2 block w-full rounded-lg border border-gray-200 bg-white px-5 py-3 text-gray-700 placeholder-gray-400 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-400 focus:ring-opacity-40 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:placeholder-gray-600 dark:focus:border-blue-400"
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
                    value={formData.bankAccount.bankName}
                    onChange={handleChange}
                    className="mt-2 block w-full rounded-lg border border-gray-200 bg-white px-5 py-3 text-gray-700 placeholder-gray-400 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-400 focus:ring-opacity-40 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:placeholder-gray-600 dark:focus:border-blue-400"
                  />
                </div>

                {/* Image Input */}
                <div>
                  <label className="mb-3 block text-sm text-gray-600 dark:text-gray-200">
                    Attach Profile picture
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    ref={inputRef}
                    onChange={handleFilesChange}
                    className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-white outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-primary-400 file:px-5 file:py-3 file:text-white hover:file:bg-blue-700 focus:border-primary-200 active:border-primary-200 disabled:cursor-default disabled:bg-white dark:file:bg-white/30 dark:file:text-white"
                  />
                </div>
                {/* Password Input */}
                <div>
                  <label className="mb-2 block text-sm text-gray-600 dark:text-gray-200">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                    className="mt-2 block w-full rounded-lg border border-gray-200 bg-white px-5 py-3 text-gray-700 placeholder-gray-400 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-400 focus:ring-opacity-40 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:placeholder-gray-600 dark:focus:border-blue-400"
                  />
                </div>
                {/* Confirm Password Input */}
                <div>
                  <label className="mb-2 block text-sm text-gray-600 dark:text-gray-200">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="mt-2 block w-full rounded-lg border border-gray-200 bg-white px-5 py-3 text-gray-700 placeholder-gray-400 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-400 focus:ring-opacity-40 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:placeholder-gray-600 dark:focus:border-blue-400"
                  />
                </div>
              </div>
              <div className="mt-6">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full transform rounded-lg bg-blue-500 px-6 py-3 text-sm font-medium capitalize tracking-wide text-white transition-colors duration-300 hover:bg-blue-400 focus:bg-blue-400 focus:outline-none"
                >
                  {isLoading ? (
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
                    "Register"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
export default SystemAdminRegisterHospitalsPage;
