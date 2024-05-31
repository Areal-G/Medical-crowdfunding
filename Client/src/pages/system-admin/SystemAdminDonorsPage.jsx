/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import API from "../../components/Common/api";
import Loading from "../../components/Common/Loading";
import { CgBlock, CgUnblock, CgSpinner } from "react-icons/cg";
import { FiEye } from "react-icons/fi";

const SystemAdminDonorsPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentLoadingId, setCurrentLoadingId] = useState(null);
  const [Data, setData] = useState(null);
  const [individualDonor, setIndividualDonor] = useState(null);

  const handleModalToggle = async (id) => {
    if (!isModalOpen) {
      try {
        const response = await API.get(`/sysadmin/getdonordataforadmin/${id}`);
        setIndividualDonor(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching individual donor data:", error);
      }
    }

    setIsModalOpen(!isModalOpen);
  };

  const fetchData = async () => {
    try {
      const response = await API.get(`/sysadmin/getdonorstable`);
      setData(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleToggleBlock = async (Id, newStatus) => {
    try {
      setCurrentLoadingId(Id); // set id of hospital being loaded
      await API.put(`/sysadmin/updatedonorstatus/${Id}`, {
        status: newStatus,
      });
      fetchData();
    } catch (err) {
      console.error(err);
    } finally {
      setCurrentLoadingId(null); // reset after loading is finished
    }
  };

  if (Data === null) {
    return <Loading />;
  } else
    return (
      <div className="shadow-default sm:px-7.5 rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 dark:border-strokedark dark:bg-boxdark xl:pb-1">
        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-[80] flex items-center justify-center">
            <div
              className="fixed inset-0 bg-black opacity-50"
              onClick={handleModalToggle}
            ></div>
            <div
              className="relative m-3 sm:mx-auto sm:w-full sm:max-w-lg"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="pointer-events-auto flex flex-col rounded-xl border bg-white shadow-sm dark:border-neutral-700 dark:bg-neutral-800 dark:shadow-neutral-700/70">
                <div className="flex items-center justify-between border-b px-4 py-3 dark:border-neutral-700">
                  <h3 className="font-bold text-gray-800 dark:text-white">
                    Donor
                  </h3>
                  <button
                    onClick={handleModalToggle}
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
                <div className="p-6">
                  <div className="flex justify-center overflow-hidden">
                    <img
                      className="h-28 w-28 rounded-full object-cover"
                      src={individualDonor?.donor.image}
                    />
                  </div>

                  <div className="mt-5">
                    <h1 className="text-center text-2xl font-semibold uppercase">
                      {individualDonor?.donor.fullname}
                    </h1>
                    <p className=" mb-1 mt-1 text-center text-lg font-medium ">
                      {individualDonor?.donor.email}
                    </p>
                    <div className=" h-[1px] w-full bg-slate-300"></div>
                    <div className="">
                      <p className="mt-4 ">
                        <span className=" font-semibold">Phone : </span>{" "}
                        {individualDonor?.donor.phoneNumber}
                      </p>
                      <p className="mt-3 ">
                        <span className=" font-semibold">Address : </span>
                        {individualDonor?.donor.city},{" "}
                        {individualDonor?.donor.country}
                      </p>

                      <p className="mt-3  ">
                        <span className=" font-semibold">Donated : </span>
                        {individualDonor?.raisedMoney.toLocaleString()} Birr
                      </p>
                      <p className="mt-3">
                        <span className=" font-semibold"> Joined : </span>
                        {new Date(
                          individualDonor?.donor.createdAt,
                        ).toLocaleDateString()}
                      </p>
                      <p className="mt-3">
                        <span className=" font-semibold text-black ">
                          Status :{" "}
                        </span>
                        <span
                          className={`inline-flex rounded-full bg-opacity-10  px-3 py-1 text-sm font-medium uppercase ${
                            individualDonor?.donor.status === "active"
                              ? " bg-[#219653] text-[#219653]"
                              : individualDonor?.donor.status === "blocked"
                                ? "bg-[#D34053] text-[#D34053]"
                                : "bg-[#FFA70B] text-[#FFA70B]"
                          }`}
                        >
                          {individualDonor?.donor.status}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="max-w-full overflow-x-hidden">
          <h4 className="mb-6 text-center text-xl font-semibold text-black dark:text-white">
            Donors
          </h4>
          <table className="w-full table-auto">
            <thead>
              <tr className="text-left">
                <th className="min-w-[220px] px-4 py-4 font-medium text-black dark:text-white xl:pl-11">
                  Name
                </th>
                <th className="hidden min-w-[150px] px-4 py-4 font-medium text-black dark:text-white md:table-cell">
                  City
                </th>
                <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                  Status
                </th>
                <th className="hidden px-4 py-4 font-medium text-black dark:text-white md:table-cell">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {Data.map((item, key) => (
                <tr key={key}>
                  <td className="flex items-center border-b border-[#eee] px-4 py-5 pl-2 dark:border-strokedark ">
                    <img
                      className="h-10 w-10 rounded-full object-cover"
                      src={item.image}
                    />
                    <h5 className="ml-8 font-medium text-black dark:text-white">
                      {item.fullname}
                    </h5>
                  </td>
                  <td className="hidden border-b border-[#eee] px-4 py-5 dark:border-strokedark md:table-cell">
                    <p className="text-black dark:text-white">{item.city}</p>
                  </td>
                  <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                    <p
                      className={`inline-flex rounded-full bg-opacity-10  px-3 py-1 text-sm font-medium uppercase ${
                        item.status === "active"
                          ? " bg-[#219653] text-[#219653]"
                          : item.status === "blocked"
                            ? "bg-[#D34053] text-[#D34053]"
                            : "bg-[#FFA70B] text-[#FFA70B]"
                      }`}
                    >
                      {item.status}
                    </p>
                  </td>
                  <td className="hidden border-b border-[#eee] px-4 py-5 dark:border-strokedark md:table-cell">
                    <div className="flex items-center space-x-3.5">
                      <button
                        onClick={() => handleModalToggle(item._id)}
                        title="View"
                        className="hover:text-primary-400"
                      >
                        <FiEye className=" h-6 w-6" />
                      </button>
                      <button
                        onClick={() =>
                          handleToggleBlock(
                            item._id,
                            item.status === "active" ? "blocked" : "active",
                          )
                        }
                        className={
                          item.status === "active"
                            ? "hover:text-red-400"
                            : "hover:text-green-400"
                        }
                        title={item.status === "active" ? "Block" : "Unblock"} // here you add title attribute
                      >
                        {currentLoadingId === item._id ? (
                          <CgSpinner className="h-8 w-8 animate-spin" />
                        ) : item.status === "active" ? (
                          <CgBlock className="h-8 w-8" />
                        ) : (
                          <CgUnblock className="h-7 w-7" />
                        )}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
};
export default SystemAdminDonorsPage;
