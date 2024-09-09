import React from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Line } from "react-chartjs-2";
import "chart.js/auto";
import { HistoricalData } from "../types/types";

const getCovidData = async (): Promise<HistoricalData> => {
  try {
    const response = await axios.get<HistoricalData>(
      "https://disease.sh/v3/covid-19/historical/all?lastdays=all"
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.message);
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
};
const Charts: React.FC = () => {
  const { data, isLoading, error } = useQuery<HistoricalData>({
    queryKey: ["Covid 19 Data"],
    queryFn: getCovidData,
  });

  if (isLoading) {
    return <p className="text-2xl font-bold">Loading...</p>;
  }

  if (error) {
    return (
      <div className="text-center text-red-500">
        Error fetching data: {error.message}
      </div>
    );
  }
  const chartData = {
    labels: Object.keys(data?.cases || {}),
    datasets: [
      {
        label: "Cases",
        data: Object.values(data?.cases || {}),
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderWidth: 1,
        fill: false,
      },
      {
        label: "Recovered",
        data: Object.values(data?.recovered || {}),
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderWidth: 1,
        fill: false,
      },
      {
        label: "Deaths",
        data: Object.values(data?.deaths || {}),
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderWidth: 1,
        fill: false,
      },
    ],
  };
  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-semibold mb-4">COVID-19 Historical Data</h2>
      <div className="chart-container">
        <Line data={chartData} />
      </div>
    </div>
  );
};

export default Charts;
