import { useState, useEffect } from "react";
import Table from "./Table";
import axios from "axios";
import "./ChartPage.css";

const URL = "http://localhost:3000";

interface TableData {
  area: string;
  info: {
    perc: string;
    diff: string;
  };
}

function ChartPage() {
  const [overData, setOverData] = useState<TableData[]>([
    { area: "...", info: { perc: "...", diff: "..." } },
  ]);
  const [underData, setUnderData] = useState<TableData[]>([
    { area: "...", info: { perc: "...", diff: "..." } },
  ]);

  useEffect(() => {
    console.log("Fetching table data");
    axios
      .get(URL + "/chartPage")
      .then((res) => {
        setOverData(res.data.over);
        setUnderData(res.data.under);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <div className="tables">
        <div style={{ margin: 5 }}>
          <h2 style={{ textAlign: "center" }}>
            Areas por sobre el promedio de crimenes
          </h2>
          <Table titulo="sobre" data={overData} />
        </div>
        <div style={{ margin: 5 }}>
          <h2 style={{ textAlign: "center" }}>
            Areas por bajo el promedio de crimenes
          </h2>
          <Table titulo="bajo" data={underData} />
        </div>
      </div>
    </>
  );
}

export default ChartPage;
