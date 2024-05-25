/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import API from "../../components/Common/api";
import Loading from "../../components/Common/Loading";
import { CgBlock, CgUnblock, CgSpinner } from "react-icons/cg";
import { FiEye } from "react-icons/fi";

const SystemAdminHospitalsPage = () => {
  const [currentLoadinId, setCurrentLoadingId] = useState(null);
  const [Data, setData] = useState(null);
  const fetchData = async () => {
    try {
      const response = await API.get(`/sysadmin/gethospitalstable`);
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
      await API.put(`/sysadmin/updatehospitalstatus/${Id}`, {
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
        <div className="max-w-full overflow-x-hidden">
          <h4 className="mb-6 text-center text-xl font-semibold text-black dark:text-white">
            Hospitals
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
                      {item.hospitalName}
                    </h5>
                  </td>
                  <td className="hidden border-b border-[#eee] px-4 py-5 dark:border-strokedark md:table-cell">
                    <p className="text-black dark:text-white">{item.city}</p>
                  </td>
                  <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                    <p
                      className={`inline-flex rounded-full  bg-opacity-10 px-3 py-1 text-sm font-medium ${
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
                      <button title="View" className="hover:text-primary-400">
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
                        {currentLoadinId === item._id ? (
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
export default SystemAdminHospitalsPage;
