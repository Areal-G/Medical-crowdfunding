import { useState, useRef } from "react";
import API from "../../components/Common/api";
import { Toaster, toast } from "sonner";
import useFileUploader from "../../components/Common/useFileUploader";

const PatientPostUpdatePage = () => {
  const { handleFilesChange, uploadFiles } = useFileUploader();
  const [formData, setFormData] = useState({
    updateEng: "",
    updateAmh: "",
    images: [],
  });
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef();

  const resetForm = () => {
    setFormData({
      updateEng: "",
      updateAmh: "",
      updateImages: [],
    });
    if (inputRef.current) {
      inputRef.current.value = "";
    }
    console.log("Form reset");
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

    try {
      const imageUrls = await uploadFiles();
      const updatedFormData = {
        update: {
          en: formData.updateEng,
          am: formData.updateAmh,
        },

        updateImages: imageUrls,
      };

      const response = await API.post("/patient/createupdate", updatedFormData);
      console.log(response.data);
      toast.success(response.data.message || "update posted successfully!");

      resetForm();
    } catch (error) {
      console.error("Error submitting the form:", error);
      toast.error("There was an error creating the update!");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="">
      <Toaster richColors />
      <div className=" mx-auto rounded-sm border border-stroke bg-white shadow-md dark:border-strokedark dark:bg-boxdark lg:w-1/2">
        <div className="border-b border-stroke px-6 py-4 dark:border-strokedark">
          <h3 className="text-center font-semibold text-black dark:text-white">
            Post Update
          </h3>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="p-6">
            <div className="mb-6">
              <label className="mb-2 block text-black dark:text-white">
                English Update
              </label>
              <textarea
                rows={6}
                name="updateEng"
                value={formData.updateEng}
                onChange={handleChange}
                placeholder="Type your update in english"
                className="active:border-primary  w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary-500 disabled:cursor-default dark:text-white"
              ></textarea>
            </div>
            <div className="mb-6">
              <label className="mb-2 block text-black dark:text-white">
                Amharic Update
              </label>
              <textarea
                rows={6}
                name="updateAmh"
                value={formData.updateAmh}
                onChange={handleChange}
                placeholder="Type your update in amharic"
                className="active:border-primary  w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary-500 disabled:cursor-default dark:text-white"
              ></textarea>
            </div>
            <div>
              <label className="mb-3 block text-black dark:text-white">
                Attach Images
              </label>
              <input
                type="file"
                accept="image/*"
                multiple
                ref={inputRef}
                onChange={handleFilesChange}
                className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-white outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-primary-400  file:px-5 file:py-3 focus:border-primary-200 active:border-primary-200 disabled:cursor-default disabled:bg-white dark:file:bg-white/30 dark:file:text-white"
              />
            </div>

            <button
              type="submit"
              className="mx-auto mt-10 flex w-full justify-center rounded bg-primary-700 p-3 font-medium text-white hover:bg-opacity-90 lg:w-2/3"
              disabled={isLoading}
            >
              {isLoading ? (
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
              ) : (
                "Post"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default PatientPostUpdatePage;
