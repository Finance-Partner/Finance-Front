import ReactApexChart from "react-apexcharts";

const AnalisysChart = () => {
  return (
    <div>
      <ReactApexChart
        type="line"
        series={[
          {
            name: "income",
            data: [10, 50, 20, 40, 30],
            color: "#00a8ff",
          },
          {
            name: "spending",
            data: [20, 30, 50, 20, 10],
            color: "#e84118",
          },
        ]}
        options={{
          theme: { mode: "dark" },
          chart: {
            height: 650,
            background: "transparent",
            toolbar: {
              show: false,
            },
          },
          stroke: {
            curve: "smooth",
            width: 4,
          },
          legend: { show: false },
          yaxis: { labels: { show: false } },
          xaxis: {
            labels: { show: false },
            axisTicks: { show: false },
            axisBorder: { show: false },
          },
        }}
      />
    </div>
  );
};
export default AnalisysChart;
