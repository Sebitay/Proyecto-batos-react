import axios from "axios";
import { useState, useEffect } from "react";
import "./InfoArea.css";
import CrimeChart from "./CrimeChart";

const URL = "http://localhost:3000";

interface InfoAreaProps {
  areaId: string;
  areaName: string;
}

function InfoArea({ areaId, areaName }: InfoAreaProps) {
  const [data, setData] = useState("");

  useEffect(() => {
    if (areaId !== "0") {
      console.log("Fetching data for area: " + areaId);
      axios
        .get(URL + "/infoAreaId/" + areaId)
        .then((res) => {
          setData(res.data.nCrimes);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [areaId]);

  return (
    <div className="info-area-container">
      <h1>Area: {areaName}</h1>
      <h1>Crimenes totales: {data}</h1>
      <CrimeChart areaId={areaId} />
      <h1>1</h1>
      <h1>1</h1>
      <h1>1</h1>
      <h1>1</h1>
      <h1>1</h1>
      <h1>1</h1>
      <h1>1</h1>
      <h1>1</h1>
      <h1>1</h1>
      <h1>1</h1>
      <h1>1</h1>
      <h1>1</h1>
      <h1>1</h1>
      <h1>1</h1>
    </div>
  );
}

export default InfoArea;
