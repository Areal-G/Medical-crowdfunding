const ProfileViewModal = () => {
  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center">
      <div className="fixed inset-0 bg-black opacity-50"></div>
      <div className="relative m-3 sm:mx-auto sm:w-full sm:max-w-lg">
        <div className="pointer-events-auto flex flex-col rounded-xl border bg-white shadow-sm dark:border-neutral-700 dark:bg-neutral-800 dark:shadow-neutral-700/70">
          <div className="flex items-center justify-between border-b px-4 py-3 dark:border-neutral-700">
            <h3 className="font-bold text-gray-800 dark:text-white">Donate</h3>
            <button
              type="button"
              className="flex size-7 items-center justify-center rounded-full border border-transparent text-sm font-semibold text-gray-800 hover:bg-gray-100 disabled:pointer-events-none disabled:opacity-50 dark:text-white dark:hover:bg-neutral-700"
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
              Payment System
            </label>
            <div className="mt-3 flex justify-center gap-x-2">
              <button type="button">Local</button>
              <button type="button">International</button>
            </div>
          </div>
          <div className="overflow-y-auto p-4">
            <div className="mt-4">
              <label className="block text-gray-700 dark:text-white">
                Donation Amount
              </label>
              <input
                type="number"
                className="mt-1 w-full rounded-lg border-gray-300 shadow-sm dark:border-neutral-700 dark:bg-neutral-900 dark:text-white"
                placeholder="$ 0.00"
              />
            </div>
            <div className="mt-4">
              <label className="block text-gray-700 dark:text-white">
                Donation Message
              </label>
              <input
                type="text"
                className="mt-1 w-full rounded-lg border-gray-300 shadow-sm dark:border-neutral-700 dark:bg-neutral-900 dark:text-white"
                placeholder="Type your message here..."
              />
            </div>
            <div className="mt-4">
              <label className="flex items-center text-gray-700 dark:text-white">
                <input type="checkbox" className="mr-2" />
                Donate Anonymously
              </label>
            </div>
          </div>
          <div className="flex items-center justify-end gap-x-2 border-t px-4 py-3 dark:border-neutral-700">
            <button
              type="button"
              className="inline-flex items-center gap-x-2 rounded-lg border border-transparent bg-blue-600 px-3 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:pointer-events-none disabled:opacity-50"
            >
              Donate
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProfileViewModal;
