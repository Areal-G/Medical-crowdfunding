import { useState, useRef } from "react";
import API from "../../components/Common/api";
import { Toaster, toast } from "sonner";
import useFileUploader from "../../components/Common/useFileUploader";

const HospitalAdminRegisterPatientForm = () => {
  const { handleFilesChange, uploadFiles } = useFileUploader();
  const [formData, setFormData] = useState({
    patientName: "",
    email: "",
    image: [],
    city: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef();

  const resetForm = () => {
    setFormData({
      patientName: "",
      email: "",
      image: [],
      city: "",
      phoneNumber: "",
      password: "",
      confirmPassword: "",
    });
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
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

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (!validatePassword(formData.password)) {
      toast.error(
        "Password must be at least 8 characters long and include uppercase letters, numbers, and symbols.",
      );
      return;
    }

    if (!validatePhoneNumber(formData.phoneNumber)) {
      toast.error(
        "Phone number must be 10 digits long and start with 09 or 07.",
      );
      return;
    }

    try {
      const imageUrl = await uploadFiles();
      const updatedFormData = {
        ...formData,
        image: imageUrl,
      };
      const response = await API.post("/hospital/register", updatedFormData);
      toast.success(response.data);
      resetForm();
    } catch (error) {
      toast.error("There was an error!", error);
    }
  };

  return (
    <section className="  dark:bg-gray-900">
      <Toaster richColors />
      <div className="flex justify-center">
        <div className=" mx-auto my-auto mt-7 flex w-full max-w-4xl items-center rounded-xl bg-white p-8 shadow-2xl lg:w-[50%] lg:px-12">
          <div className="w-full">
            <div className="mx-auto flex justify-center">
              <h1 className=" text-2xl ">Register Patient</h1>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm text-gray-600 dark:text-gray-200">
                    Patient Name
                  </label>
                  <input
                    type="text"
                    name="patientName"
                    placeholder="John snow"
                    value={formData.patientName}
                    onChange={handleChange}
                    className="mt-2 block w-full rounded-lg border border-gray-200 bg-white px-5 py-3 text-gray-700 placeholder-gray-400 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-400 focus:ring-opacity-40 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:placeholder-gray-600 dark:focus:border-blue-400"
                  />
                </div>

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
                <div>
                  <label
                    htmlFor="image"
                    className="mb-3 block text-sm text-gray-600 dark:text-gray-200"
                  >
                    Attach Profile Picture
                  </label>
                  <input
                    type="file"
                    name="image"
                    id="image"
                    accept="image/*"
                    ref={inputRef}
                    onChange={handleFilesChange}
                    className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-white outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-primary-400 file:px-5 file:py-3 file:text-white hover:file:bg-blue-700 focus:border-primary-200 active:border-primary-200 disabled:cursor-default disabled:bg-white dark:file:bg-white/30 dark:file:text-white"
                  />
                </div>
                <div></div>
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
                  className="w-full transform rounded-lg bg-blue-500 px-6 py-3 text-sm font-medium capitalize tracking-wide text-white transition-colors duration-300 hover:bg-blue-400 focus:bg-blue-400 focus:outline-none"
                >
                  Register
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
export default HospitalAdminRegisterPatientForm;
