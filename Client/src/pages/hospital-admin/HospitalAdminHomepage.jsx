import CardDataStats from "../../components/Common/CardDataStats";
import { GiTakeMyMoney } from "react-icons/gi";
import { IoPeople } from "react-icons/io5";
import { useEffect, useState } from "react";
import API from "../../components/Common/api";
import Loading from "../../components/Common/Loading";
import LineChart from "../../components/Common/LineChart";
const HospitalAdminHomePage = () => {
  const [Data, setData] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await API.get(`/hospital/gethospitaldashboard`);
        setData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  if (Data === null) {
    return <Loading />;
  } else
    return (
      <main>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-3">
          <CardDataStats
            title="Total Collected"
            total={Data?.totalMoney.toLocaleString()}
            birr
          >
            <GiTakeMyMoney className=" fill-primary-500" />
          </CardDataStats>
          <CardDataStats
            title="Total Collected Today"
            total={Data?.todayTotalMoney.toLocaleString()}
            birr
          >
            <GiTakeMyMoney className=" fill-primary-500" />
          </CardDataStats>
          <CardDataStats
            title="Donors Donated today"
            total={Data?.donationsToday.toLocaleString()}
            birr
          >
            <IoPeople className=" fill-primary-500" />
          </CardDataStats>

          <CardDataStats title="Patients" total={Data?.numberOfPatients}>
            <IoPeople className=" fill-primary-500" />
          </CardDataStats>
        </div>
        <div className=" mt-6 h-[424px] justify-between gap-5 lg:flex">
          <div className=" flex-1">
            <LineChart
              name="Patients registerd"
              title="Patients"
              chartData={Data?.patientData.itemCounts}
              daysOfWeek={Data?.patientData.daysOfWeek}
            />
          </div>
          <div className=" flex-1">
            <LineChart
              name="Donations"
              title="Donations"
              chartData={Data?.donorData.itemCounts}
              daysOfWeek={Data?.donorData.daysOfWeek}
            />
          </div>
        </div>
      </main>
    );
};
export default HospitalAdminHomePage;
