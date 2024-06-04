import React from "react";
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  margin-right: 25px;
`;
interface BudgetChartProps {
  data: number; // This is the spending
  budget: number; // This is the budget
  title: string;
  subtitle: string;
}

const BudgetChart: React.FC<BudgetChartProps> = ({
  data,
  budget,
  title,
  subtitle,
}) => {
  const options: ApexOptions = {
    chart: {
      type: "bar",
      height: 350,
      toolbar: {
        show: false, // Disable the toolbar
      },
    },
    plotOptions: {
      bar: {
        horizontal: true,
      },
    },
    xaxis: {
      categories: [""],
      max: budget,
      labels: {
        show: false, // Hide x-axis labels
      },
      axisTicks: {
        show: false,
      },
      axisBorder: {
        show: false, // Hide x-axis border line
      },
    },
    yaxis: {
      labels: {
        show: false, // Hide y-axis labels
      },
      axisTicks: {
        show: false, // Hide y-axis ticks
      },
      axisBorder: {
        show: false, // Hide x-axis border line
      },
    },
    grid: {
      show: false, // Hide grid lines
    },
    fill: {
      colors: ["#008FFB"],
    },
  };

  const series = [
    {
      name: "Spending",
      data: [data],
    },
  ];

  return (
    <Wrapper>
      <Chart
        options={options}
        series={series}
        type="bar"
        height={100}
        width="100%"
      />
    </Wrapper>
  );
};

export default BudgetChart;
