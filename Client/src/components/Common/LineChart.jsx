/* eslint-disable react/prop-types */
import ReactApexChart from "react-apexcharts";
const LineChart = (props) => {
  const seriesData = [
    {
      name: props.name,
      data: props.chartData,
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
      categories: props.daysOfWeek,
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
        <h3 className=" text-center text-lg font-semibold">{props.title}</h3>
        <ReactApexChart options={options} series={seriesData} type="area" />
      </div>
    </div>
  );
};
export default LineChart;
