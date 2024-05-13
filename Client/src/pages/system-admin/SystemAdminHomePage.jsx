import CardDataStats from "../../components/Common/CardDataStats";
import SystemAdminPatientsLineChart from "../../components/system-admin/SystemAdminPatientsLineChart";
import { FaHospitalSymbol } from "react-icons/fa";
import { GiTakeMyMoney } from "react-icons/gi";
import { IoPeople } from "react-icons/io5";
import SystemAdminDonorsLineChart from "../../components/system-admin/SystemAdminDonorsLineChart";
import SystemAdminHospitalsLineChart from "../../components/system-admin/SystemAdminHospitalsLineChart";
const SystemAdminHomePage = () => {
  return (
    <main>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-3 2xl:gap-6">
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
        <CardDataStats title="Donors" total="345" rate="0.43%" levelDown>
          <IoPeople className=" fill-primary-500" />
        </CardDataStats>
        <CardDataStats title="patients" total="30" rate="0.43%" levelUp>
          <IoPeople className=" fill-primary-500" />
        </CardDataStats>
        <CardDataStats title="Hospitals" total="30" rate="0.43%" levelUp>
          <FaHospitalSymbol className=" fill-primary-500" />
        </CardDataStats>
      </div>
      <div className=" mt-6 h-[424px] justify-between gap-5 lg:flex">
        <div className=" flex-1">
          <SystemAdminPatientsLineChart />
        </div>
        <div className=" flex-1">
          <SystemAdminDonorsLineChart />
        </div>
      </div>

      <div className=" mt-12 h-[424px] justify-between gap-5 lg:flex">
        <div className=" flex-1">
          <SystemAdminHospitalsLineChart />
        </div>
        <div className=" flex-1"></div>
      </div>
    </main>
  );
};
export default SystemAdminHomePage;
