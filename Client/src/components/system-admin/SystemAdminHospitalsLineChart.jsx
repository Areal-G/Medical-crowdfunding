import ReactApexChart from "react-apexcharts";

const SystemAdminHospitalsLineChart = () => {
  const seriesData = [
    {
      name: "Hospitals",
      data: [23, 11, 22, 27, 13, 22, 37, 41, 30, 35, 45, 50], // Placeholder data for 12 months
    },
  ];

  const options = {
    legend: {
      show: false,
      position: "top",
      horizontalAlign: "left",
    },
    colors: [],
    chart: {
      type: "area",
      toolbar: {
        show: false,
      },
    },
    stroke: {
      width: [1],
      curve: "smooth",
    },
    grid: {
      xaxis: {
        lines: {
          show: false,
        },
      },
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    markers: {
      size: 1,
      colors: "#fff",
      strokeColors: ["#3056D3"],
      strokeWidth: 2,
      strokeOpacity: 0.9,
      strokeDashArray: 0,
      fillOpacity: 1,
      discrete: [],
      hover: {
        size: undefined,
        sizeOffset: 5,
      },
    },
    xaxis: {
      type: "category",
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ], // Names of the months
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      title: {
        style: {
          fontSize: "0px",
        },
      },
    },
  };
  return (
    <div className=" rounded-md border bg-white px-4 pb-3 pt-7">
      <div>
        <h3 className=" text-center text-lg font-semibold">Hospitals</h3>
        <ReactApexChart options={options} series={seriesData} type="area" />
      </div>
    </div>
  );
};
export default SystemAdminHospitalsLineChart;
