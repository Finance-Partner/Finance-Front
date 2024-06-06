import React from "react";
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  padding-right:20px; 
`;
interface BudgetChartProps {
  data: number; // This is the spending
  budget: number; // This is the budget
  title: string;
  subtitle: string;
  color: string;
}

const BudgetChart: React.FC<BudgetChartProps> = ({
  data,
  budget,
  title,
  subtitle,
  color,
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
      type: 'solid',
      colors: [color],
    },
    dataLabels: {
      enabled: false, // Hide data labels
    },
    tooltip: {
      enabled: false, // Hide tooltip
    },
  };

  const series = [
    {
      name: "지출",
      data: [data],
    },
  ];

  return (
    <Wrapper>
      <Chart
        options={options}
        series={series}
        type="bar"
        height={120}
        width="100%"
      />
    </Wrapper>
  );
};

export default BudgetChart;
