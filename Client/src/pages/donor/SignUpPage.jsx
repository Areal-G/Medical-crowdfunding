import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/img/donor/logo.svg";
import useFileUploader from "../../components/Common/useFileUploader";
import API from "../../components/Common/api";
import { Toaster, toast } from "sonner";

const SignUpPage = () => {
  const navigate = useNavigate();
  const { handleFilesChange, uploadFiles } = useFileUploader();
  const [formData, setFormData] = useState({
    fullname: "",
    phoneNumber: "",
    email: "",
    country: "",
    city: "",
    image: [],
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef();

  const resetForm = () => {
    setFormData({
      fullname: "",
      phoneNumber: "",
      email: "",
      country: "",
      city: "",
      image: [],
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      setIsLoading(false);
      return;
    }
    try {
      const imageUrl = await uploadFiles();
      const updatedFormData = {
        ...formData,
        image: imageUrl,
      };

      const response = await API.post("/donor/register", updatedFormData);
      toast.success(response.data);

      resetForm();
      navigate("/");
    } catch (error) {
      toast.error("There was an error!", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <section className="bg-white dark:bg-gray-900">
        <Toaster richColors />
        <div className="flex justify-center">
          <div className="mx-auto my-auto mt-7 flex w-full max-w-3xl items-center rounded-xl p-8 shadow-2xl lg:w-2/5 lg:px-12">
            <div className="w-full">
              <div className="mx-auto flex justify-center">
                <img className="h-7 w-auto sm:h-10" src={logo} alt="Logo" />
              </div>
              <div className="mt-6 flex items-center justify-center">
                <Link
                  to="/signin"
                  className="w-1/3 border-b pb-4 text-center font-medium capitalize text-gray-500 dark:border-gray-400 dark:text-gray-300"
                >
                  Sign In
                </Link>
                <a
                  href="#"
                  className="w-1/3 border-b-2 border-blue-500 pb-4 text-center font-medium capitalize text-gray-800 dark:border-blue-400 dark:text-white"
                >
                  Sign Up
                </a>
              </div>
              <form onSubmit={handleSubmit} className="mt-8 ">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm text-gray-600 dark:text-gray-200">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="fullname"
                      value={formData.fullname}
                      onChange={handleChange}
                      placeholder="John Snow"
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
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      placeholder="XXX-XX-XXXX-XXX"
                      className="mt-2 block w-full rounded-lg border border-gray-200 bg-white px-5 py-3 text-gray-700 placeholder-gray-400 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-400 focus:ring-opacity-40 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:placeholder-gray-600 dark:focus:border-blue-400"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm text-gray-600 dark:text-gray-200">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="johnsnow@example.com"
                      className="mt-2 block w-full rounded-lg border border-gray-200 bg-white px-5 py-3 text-gray-700 placeholder-gray-400 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-400 focus:ring-opacity-40 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:placeholder-gray-600 dark:focus:border-blue-400"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm text-gray-600 dark:text-gray-200">
                      Country
                    </label>
                    <input
                      type="text"
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      placeholder="Country"
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
                      value={formData.city}
                      onChange={handleChange}
                      placeholder="City"
                      className="mt-2 block w-full rounded-lg border border-gray-200 bg-white px-5 py-3 text-gray-700 placeholder-gray-400 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-400 focus:ring-opacity-40 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:placeholder-gray-600 dark:focus:border-blue-400"
                    />
                  </div>
                  <div>
                    <label className="mb-3 block text-sm text-gray-600 dark:text-gray-200">
                      Attach Profile Picture
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      ref={inputRef}
                      onChange={handleFilesChange}
                      className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-white outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-primary-400 file:px-5 file:py-3 file:text-white hover:file:bg-blue-700 focus:border-primary-200 active:border-primary-200 disabled:cursor-default disabled:bg-white dark:file:bg-white/30 dark:file:text-white"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm text-gray-600 dark:text-gray-200">
                      Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Enter your password"
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
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="Enter your password"
                      className="mt-2 block w-full rounded-lg border border-gray-200 bg-white px-5 py-3 text-gray-700 placeholder-gray-400 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-400 focus:ring-opacity-40 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:placeholder-gray-600 dark:focus:border-blue-400"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="mt-6 w-full transform rounded-lg bg-primary-600 px-6 py-3 text-sm font-medium capitalize tracking-wide text-white transition-colors duration-300 hover:bg-blue-700"
                  disabled={isLoading}
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
                    "Sign Up"
                  )}
                </button>
              </form>
              <div className="mt-6">
                <div className="mt-6 text-center">
                  <a
                    href="#"
                    className="text-sm text-blue-500 hover:underline dark:text-blue-400"
                  >
                    Already have an account?
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SignUpPage;
