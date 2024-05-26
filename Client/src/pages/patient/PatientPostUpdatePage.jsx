const PatientPostUpdatePage = () => {
  return (
    <div className="">
      <div className=" mx-auto rounded-sm border border-stroke bg-white shadow-md dark:border-strokedark dark:bg-boxdark lg:w-1/2">
        <div className="border-b border-stroke px-6 py-4 dark:border-strokedark">
          <h3 className="text-center font-semibold text-black dark:text-white">
            Post Update
          </h3>
        </div>
        <form action="#">
          <div className="p-6">
            <div className="mb-6">
              <label className="mb-2 block text-black dark:text-white">
                Description
              </label>
              <textarea
                rows={6}
                placeholder="Type your description"
                className="active:border-primary  w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary-500 disabled:cursor-default dark:text-white"
              ></textarea>
            </div>
            <div>
              <label className="mb-3 block text-black dark:text-white">
                Attach Images
              </label>
              <input
                type="file"
                multiple
                className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-white outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-primary-400  file:px-5 file:py-3 focus:border-primary-200 active:border-primary-200 disabled:cursor-default disabled:bg-white dark:file:bg-white/30 dark:file:text-white"
              />
            </div>

            <button className=" mx-auto mt-10 flex w-full justify-center rounded bg-primary-700 p-3 font-medium text-white hover:bg-opacity-90 lg:w-2/3">
              Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default PatientPostUpdatePage;
