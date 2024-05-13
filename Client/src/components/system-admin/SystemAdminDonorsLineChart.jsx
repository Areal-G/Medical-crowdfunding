import ReactApexChart from "react-apexcharts";

const SystemAdminDonorsLineChart = () => {
  const seriesData = [
    {
      name: "Donors",
      data: [
        23, 11, 22, 27, 13, 22, 37, 39, 23, 11, 22, 27, 13, 22, 37, 39, 23, 11,
        22, 27, 13, 22, 37, 39, 0, 0, 0, 0, 0, 0,
      ],
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
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "11",
        "12",
        "13",
        "14",
        "15",
        "16",
        "17",
        "18",
        "19",
        "20",
        "21",
        "22",
        "23",
        "24",
        "25",
        "26",
        "27",
        "28",
        "29",
        "30",
      ],
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
        <h3 className=" text-center text-lg font-semibold">Donors</h3>
        <ReactApexChart options={options} series={seriesData} type="area" />
      </div>
    </div>
  );
};
export default SystemAdminDonorsLineChart;
