import axios from "axios";
import { useState, useEffect } from "react";
import "./InfoArea.css";
import CrimeChart from "./CrimeChart";
import ArmaSelect from "./Selects/ArmaSelect";
import EdadSelect from "./Selects/EdadSelect";
import SexoSelect from "./Selects/SexoSelect";
import DescSelect from "./Selects/DescSelect";

const URL = "http://localhost:3000";

interface InfoAreaProps {
  areaId: string;
  areaName: string;
}

function InfoArea({ areaId, areaName }: InfoAreaProps) {
  const [data, setData] = useState("");
  const [sexo, setSexo] = useState("0");
  const [edad, setEdad] = useState("Seleccione una edad...");
  const [desc, setDesc] = useState("0");
  const [arma, setArma] = useState("0");

  const onClick = () => {
    setData("...");
    axios
      .get(
        URL +
          "/getDataFiltrada/" +
          areaId +
          "/" +
          edad +
          "/" +
          sexo +
          "/" +
          desc +
          "/" +
          arma
      )
      .then((res) => {
        setData(res.data.nCrimes);
      })
      .catch((err) => {
        console.log(err);
      });
  };

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
      <h1>{areaName}</h1>
      <div className="selects">
        <ArmaSelect
          selected={arma}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
            setArma(e.target.value);
          }}
        />
        <EdadSelect
          selected={edad}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
            setEdad(e.target.value);
          }}
        />
        <SexoSelect
          selected={sexo}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
            setSexo(e.target.value);
          }}
        />
        <DescSelect
          selected={desc}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
            setDesc(e.target.value);
          }}
        />
        <button onClick={onClick}>Filtrar</button>
      </div>
      <h1>Crimenes totales: {data}</h1>
      <CrimeChart areaId={areaId} />
      <h1>{edad}</h1>
      <h1>{sexo}</h1>
      <h1>{desc}</h1>
      <h1>{arma}</h1>
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
