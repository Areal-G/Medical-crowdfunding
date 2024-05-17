import CardDataStats from "../../components/Common/CardDataStats";
import { GiTakeMyMoney } from "react-icons/gi";
import { IoPeople } from "react-icons/io5";
import HospitalAdminPatientsLineChart from "../../components/hospital-admin/HospitalAdminPatientsLineChart";
import HospitalAdminDonorsLineChart from "../../components/hospital-admin/HospitalAdminDonorsLineChart";
const HospitalAdminHomepage = () => {
  return (
    // main class style has the ml-64
    <main>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-3">
        <CardDataStats
          title="Total Collected"
          total="3000 Birr"
          rate="0.43%"
          levelUp
        >
          <GiTakeMyMoney className=" fill-primary-500" />
        </CardDataStats>
        <CardDataStats
          title="Total Collected Today"
          total="120 Birr"
          rate="0.70%"
          levelUp
        >
          <GiTakeMyMoney className=" fill-primary-500" />
        </CardDataStats>
        <CardDataStats
          title="Donors Donated today"
          total="345"
          rate="0.43%"
          levelDown
        >
          <IoPeople className=" fill-primary-500" />
        </CardDataStats>

        <CardDataStats title="patients" total="30" rate="0.43%" levelUp>
          <IoPeople className=" fill-primary-500" />
        </CardDataStats>
      </div>
      <div className=" mt-6 h-[424px] justify-between gap-5 lg:flex">
        <div className=" flex-1">
          <HospitalAdminPatientsLineChart />
        </div>
        <div className=" flex-1">
          <HospitalAdminDonorsLineChart />
        </div>
      </div>
    </main>
  );
};
export default HospitalAdminHomepage;
