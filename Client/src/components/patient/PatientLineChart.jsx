import ReactApexChart from "react-apexcharts";

const PatientLineChart = () => {
  const seriesData = [
    {
      name: "Donated",
      data: [23, 11, 22, 27, 13, 22, 37],
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
      width: [2],
      curve: "smooth",
    },
    grid: {
      xaxis: {
        lines: {
          show: true,
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
      size: 4,
      colors: "#fff",
      strokeColors: ["#3056D3"],
      strokeWidth: 3,
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
      categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
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
    <div className=" rounded-md bg-white px-5 pb-5 pt-7">
      <div>
        <ReactApexChart options={options} series={seriesData} type="area" />
      </div>
    </div>
  );
};

export default PatientLineChart;
