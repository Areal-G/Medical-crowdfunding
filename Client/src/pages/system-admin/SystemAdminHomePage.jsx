import CardDataStats from "../../components/Common/CardDataStats";
import { FaHospitalSymbol } from "react-icons/fa";
import { GiTakeMyMoney } from "react-icons/gi";
import { IoPeople } from "react-icons/io5";

import { useEffect, useState } from "react";
import API from "../../components/Common/api";
import Loading from "../../components/Common/Loading";
import LineChart from "../../components/Common/LineChart";
const SystemAdminHomePage = () => {
  const [Data, setData] = useState(null);
  useEffect(() => {
    const fetchCampaignData = async () => {
      try {
        const response = await API.get(`/sysadmin/getadmindashboard`);
        setData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchCampaignData();
  }, []);
  if (Data === null) {
    return <Loading />;
  } else
    return (
      <main>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-3 2xl:gap-6">
          <CardDataStats
            title="Total Collected"
            total={Data?.totalMoney.toLocaleString()}
            birr
          >
            <GiTakeMyMoney className=" fill-primary-500" />
          </CardDataStats>
          <CardDataStats
            title="Total Collected Today"
            total={Data?.raisedMoneyToday.toLocaleString()}
            birr
          >
            <GiTakeMyMoney className=" fill-primary-500" />
          </CardDataStats>
          <CardDataStats
            title="Donors Donated today"
            total={Data?.numberOfDonationsToday}
          >
            <IoPeople className=" fill-primary-500" />
          </CardDataStats>
          <CardDataStats title="Donors" total={Data?.numberOfDonors}>
            <IoPeople className=" fill-primary-500" />
          </CardDataStats>
          <CardDataStats title="patients" total={Data?.numberOfPatients}>
            <IoPeople className=" fill-primary-500" />
          </CardDataStats>
          <CardDataStats title="Hospitals" total={Data?.numberOfHospitals}>
            <FaHospitalSymbol className=" fill-primary-500" />
          </CardDataStats>
        </div>
        <div className=" mt-6 h-[424px] justify-between gap-5 lg:flex">
          <div className=" flex-1">
            <LineChart
              name="Patients registerd"
              title="Patients"
              chartData={Data?.patients.itemCounts}
              daysOfWeek={Data?.patients.daysOfWeek}
            />
          </div>
          <div className=" flex-1">
            <LineChart
              name="Donors registerd"
              title="Donors"
              chartData={Data?.donors.itemCounts}
              daysOfWeek={Data?.donors.daysOfWeek}
            />
          </div>
        </div>

        <div className=" mt-12 h-[424px] justify-between gap-5 lg:flex">
          <div className=" flex-1">
            <LineChart
              name="Hospitals registerd"
              title="Hospitals"
              chartData={Data?.hospitals.itemCounts}
              daysOfWeek={Data?.hospitals.daysOfWeek}
            />
          </div>
          <div className=" flex-1"></div>
        </div>
      </main>
    );
};
export default SystemAdminHomePage;
