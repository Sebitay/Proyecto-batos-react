import { useState, useEffect } from "react";
import axios from "axios";
import Highcharts from "highcharts/highmaps";
import HighchartsReact from "highcharts-react-official";

const URL = "https://grupo24.cc3201.dcc.uchile.cl/api";

interface CrimeChartProps {
  areaId: string;
}

interface ChartData {
  cuatrimestre: string;
  nCrimes: number;
}

function CrimeChart({ areaId }: CrimeChartProps) {
  const [data, setData] = useState<ChartData[]>([]);

  useEffect(() => {
    if (areaId !== "0") {
      axios
        .get(URL + "/areaChart/" + areaId)
        .then((res) => {
          setData(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [areaId]);

  const options = {
    chart: {
      type: "line",
    },
    title: {
      text: "Número de crímenes por cuatrimestre",
    },
    xAxis: {
      categories: data.map((data) => data.cuatrimestre),
    },
    yAxis: {
      title: {
        text: "Número de crímenes",
      },
      min: 0,
      max: 5000,
    },
    series: [
      {
        name: "Crimenes",
        data: data.map((data) => data.nCrimes),
      },
    ],
  };
  return (
    <div className="chart-container">
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
}

export default CrimeChart;
