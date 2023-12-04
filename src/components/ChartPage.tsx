import { useState, useEffect } from "react";
import Table from "./Table";
import axios from "axios";
import "./ChartPage.css";

const URL = "https://grupo24.cc3201.dcc.uchile.cl/api";

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
            Áreas por sobre el promedio de crímenes
          </h2>
          <Table titulo="sobre" data={overData} />
        </div>
        <div style={{ margin: 5 }}>
          <h2 style={{ textAlign: "center" }}>
            Áreas por bajo el promedio de crímenes
          </h2>
          <Table titulo="bajo" data={underData} />
        </div>
      </div>
    </>
  );
}

export default ChartPage;
