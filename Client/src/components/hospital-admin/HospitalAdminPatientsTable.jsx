import avatar from "../../assets/img/donor/avatar.jpg";

const HospitalAdminPatientsTable = () => {
  const brandData = [
    {
      logo: avatar,
      name: "abebe",
      visitors: " Hawassa",
      revenues: "5,768",
    },
    {
      logo: avatar,
      name: "bekele",
      visitors: " Hawassa",
      revenues: "4,635",
    },
    {
      logo: avatar,
      name: "kebede",
      visitors: " Hawassa",
      revenues: "4,290",
    },
    {
      logo: avatar,
      name: "abel",
      visitors: " Hawassa",
      revenues: "3,580",
    },
    {
      logo: avatar,
      name: "kebede",
      visitors: " Hawassa",
      revenues: "6,768",
    },
  ];

  return (
    <div className="shadow-default rounded-sm border border-stroke bg-white px-5 pb-2 pt-6 dark:border-strokedark dark:bg-boxdark sm:px-7 xl:pb-1">
      <h4 className="mb-6 text-center text-xl font-semibold text-black dark:text-white">
        Donors
      </h4>

      <div className="flex flex-col">
        <div className="bg-gray-2 grid grid-cols-2 rounded-sm dark:bg-meta-4 sm:grid-cols-4">
          <div className=" p-2 xl:p-5">
            <h5 className="xsm:text-base text-sm font-medium uppercase">
              Name
            </h5>
          </div>
          <div className=" hidden p-2 text-center sm:block xl:p-5">
            <h5 className="xsm:text-base text-sm font-medium uppercase">
              City
            </h5>
          </div>
          <div className=" p-2 text-center xl:p-5">
            <h5 className="xsm:text-base text-sm font-medium uppercase">
              Total donated to
            </h5>
          </div>

          <div className=" p-2 text-center  xl:p-5">
            <h5 className="xsm:text-base text-sm font-medium uppercase"></h5>
          </div>
        </div>

        {brandData.map((brand, key) => (
          <div
            className={`grid grid-cols-2 sm:grid-cols-4 ${
              key === brandData.length - 1
                ? ""
                : "border-b border-stroke dark:border-strokedark"
            }`}
            key={key}
          >
            <div className="flex items-center gap-3 p-2 xl:p-2">
              <div className="flex-shrink-0">
                <img
                  className="h-10 w-10 rounded-full object-cover"
                  src={brand.logo}
                  alt="Brand"
                />
              </div>
              <p className=" block capitalize text-black dark:text-white">
                {brand.name}
              </p>
            </div>

            <div className=" hidden  items-center justify-center p-2 sm:flex xl:p-5">
              <p className="text-black dark:text-white">{brand.visitors}</p>
            </div>

            <div className="hidden items-center justify-center p-2 sm:flex xl:p-5">
              <p className="text-black dark:text-white">{brand.revenues}</p>
            </div>

            <div className=" mx-auto max-w-56  items-center justify-center p-2  xl:p-5">
              <div className="dark:bg-darkk relative z-20 bg-white">
                <select
                  value={""}
                  className={`focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input relative z-20 w-full appearance-none rounded border border-stroke bg-transparent px-6 py-2 outline-none transition
               
               `}
                >
                  <option
                    value=""
                    disabled
                    className="text-body dark:text-bodydark"
                  >
                    Active
                  </option>
                  <option value="" className="text-body dark:text-bodydark">
                    Inactive
                  </option>
                  <option value="" className="text-body dark:text-bodydark">
                    Pending
                  </option>
                </select>

                <span className="absolute right-4 top-1/2 z-10 -translate-y-1/2"></span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default HospitalAdminPatientsTable;
