/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import API from "../../components/Common/api";
import Loading from "../../components/Common/Loading";
import { CgBlock, CgUnblock, CgSpinner } from "react-icons/cg";
import { FiEye } from "react-icons/fi";
import { CgCloseO } from "react-icons/cg";
import { useNavigate } from "react-router-dom";

const HospitalAdminApproveCampaignsPage = () => {
  const navigate = useNavigate();
  const [currentLoadingId, setCurrentLoadingId] = useState(null);
  const [Data, setData] = useState(null);
  const fetchData = async () => {
    try {
      const response = await API.get(`/hospital/getcampaignstable`);
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
      setCurrentLoadingId(Id);
      await API.put(`/hospital/updatecampaignstatusinhospital/${Id}`, {
        status: newStatus,
      });
      fetchData();
    } catch (err) {
      console.error(err);
    } finally {
      setCurrentLoadingId(null);
    }
  };

  if (Data === null) {
    return <Loading />;
  } else
    return (
      <div className="shadow-default sm:px-7.5 rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 dark:border-strokedark dark:bg-boxdark xl:pb-1">
        <div className="max-w-full overflow-x-hidden">
          <h4 className="mb-6 text-center text-xl font-semibold text-black dark:text-white">
            Campaigns
          </h4>
          <table className="w-full table-auto">
            <thead>
              <tr className="text-left">
                <th className="min-w-[220px] px-4 py-4 font-medium text-black dark:text-white xl:pl-11">
                  Title
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
                    <h5 className=" font-medium text-black dark:text-white">
                      {item.campaignTitle.en}
                    </h5>
                  </td>

                  <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                    <p
                      className={`inline-flex rounded-full bg-opacity-10 px-3 py-1 text-sm font-medium uppercase ${
                        item.status === "active"
                          ? "bg-green-500 text-green-500"
                          : item.status === "closed"
                            ? "bg-red-500 text-red-500"
                            : item.status === "pending"
                              ? "bg-yellow-500 text-yellow-500"
                              : item.status === "rejected"
                                ? "bg-gray-500 text-gray-500"
                                : "bg-blue-500 text-blue-500"
                      }`}
                    >
                      {item.status}
                    </p>
                  </td>
                  <td className="hidden border-b border-[#eee] px-4 py-5 dark:border-strokedark md:table-cell">
                    <div className="flex items-center ">
                      <button
                        title="View"
                        className="mr-3 hover:text-primary-400"
                        onClick={() =>
                          navigate(`/hospital/campaigndetail/${item._id}`)
                        }
                      >
                        <FiEye className=" h-6 w-6" />
                      </button>
                      {currentLoadingId === item._id ? (
                        <CgSpinner className="h-7 w-7 animate-spin" />
                      ) : (
                        <>
                          {item.status === "active" && (
                            <button
                              onClick={() =>
                                handleToggleBlock(item._id, "closed")
                              }
                              className="mr-3 hover:text-red-400"
                              title="Close"
                            >
                              <CgBlock className="h-7 w-7" />
                            </button>
                          )}

                          {item.status === "pending" && (
                            <div className="flex">
                              <button
                                onClick={() =>
                                  handleToggleBlock(item._id, "active")
                                }
                                className="mr-3 hover:text-green-400"
                                title="Active"
                              >
                                <CgUnblock className="h-7 w-7" />
                              </button>
                              <button
                                onClick={() =>
                                  handleToggleBlock(item._id, "rejected")
                                }
                                className="mr-3 hover:text-orange-400"
                                title="Reject"
                              >
                                <CgCloseO className="h-6 w-6" />
                              </button>
                            </div>
                          )}

                          {(item.status === "closed" ||
                            item.status === "rejected") && (
                            <button
                              onClick={() =>
                                handleToggleBlock(item._id, "active")
                              }
                              className="mr-3 hover:text-green-400"
                              title="Active"
                            >
                              <CgUnblock className="h-7 w-7" />
                            </button>
                          )}
                        </>
                      )}
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
export default HospitalAdminApproveCampaignsPage;
