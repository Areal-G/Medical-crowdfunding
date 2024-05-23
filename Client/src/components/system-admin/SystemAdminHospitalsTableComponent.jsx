import avatar from "../../assets/img/donor/avatar.jpg";
const Table = () => {
  const brandData = [
    {
      logo: avatar,
      name: "Hawassa referall hospital",
      visitors: " Hawassa",
      revenues: "5,768",
      sales: 590,
      conversion: 4.8,
    },
    {
      logo: avatar,
      name: "Hawassa referall hospital",
      visitors: " Hawassa",
      revenues: "4,635",
      sales: 467,
      conversion: 4.3,
    },
    {
      logo: avatar,
      name: "Hawassa referall hospital",
      visitors: " Hawassa",
      revenues: "4,290",
      sales: 420,
      conversion: 3.7,
    },
    {
      logo: avatar,
      name: "Hawassa referall hospital",
      visitors: " Hawassa",
      revenues: "3,580",
      sales: 389,
      conversion: 2.5,
    },
    {
      logo: avatar,
      name: "Hawassa referall hospital",
      visitors: " Hawassa",
      revenues: "6,768",
      sales: 390,
      conversion: 4.2,
    },
  ];

  return (
    <div className="shadow-default rounded-sm border border-stroke bg-white px-5 pb-2 pt-6 dark:border-strokedark dark:bg-boxdark sm:px-7 xl:pb-1">
      <h4 className="mb-6 text-center text-xl font-semibold text-black dark:text-white">
        Hospitals
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
              Number of patients
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
              <p className="text-black dark:text-white">{brand.sales}</p>
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
                  <option value="USA" className="text-body dark:text-bodydark">
                    USA
                  </option>
                  <option value="UK" className="text-body dark:text-bodydark">
                    UK
                  </option>
                  <option
                    value="Canada"
                    className="text-body dark:text-bodydark"
                  >
                    Canada
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
export default Table;
