import axios from "axios";
import { useState, useEffect } from "react";
import "./InfoArea.css";
import CrimeChart from "./CrimeChart";
import ArmaSelect from "./Selects/ArmaSelect";
import EdadSelect from "./Selects/EdadSelect";
import SexoSelect from "./Selects/SexoSelect";
import DescSelect from "./Selects/DescSelect";
import AreaTable from "./AreaTable";

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
  const [tableData, setTableData] = useState({
    arma: "...",
    edad: "...",
    sexo: "...",
    desc: "...",
    prem: "...",
  });

  const clearFilter = () => {
    setSexo("0");
    setEdad("Seleccione una edad...");
    setDesc("0");
    setArma("0");
  };

  useEffect(() => {
    if (areaId !== "0") {
      setData("...");
      console.log("Fetching data for area: " + areaId);
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
    }
  }, [areaId, edad, sexo, desc, arma]);

  useEffect(() => {
    console.log("Fetching data for Table");
    setTableData({
      arma: "...",
      edad: "...",
      sexo: "...",
      desc: "...",
      prem: "...",
    });
    axios
      .get(URL + "/getTableData/" + areaId)
      .then((res) => {
        setTableData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [areaId]);

  return (
    <div className="info-area-container">
      <h1>{areaName}</h1>
      <div className="selects">
        <h2>Filtrar crimenes de {areaName}</h2>
        <ArmaSelect
          selected={arma}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
            setArma(e.target.value);
          }}
          onClose={() => setArma("0")}
        />
        <EdadSelect
          selected={edad}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
            setEdad(e.target.value);
          }}
          onClose={() => setEdad("Seleccione una edad...")}
        />
        <SexoSelect
          selected={sexo}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
            setSexo(e.target.value);
          }}
          onClose={() => setSexo("0")}
        />
        <DescSelect
          selected={desc}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
            setDesc(e.target.value);
          }}
          onClose={() => setDesc("0")}
        />
        <div className="buttons">
          <button className="button" onClick={clearFilter}>
            Limpiar Filtros
          </button>
        </div>
        <h1>Crimenes totales: {data}</h1>
      </div>
      <div className="areaStats">
        <h2>Estadisticas de {areaName}</h2>
        <CrimeChart areaId={areaId} />
        <AreaTable data={tableData} />
        <p>
          * Los crimenes sin arma no se consideran dentro del calculo del arma
          mas usada
        </p>
      </div>
    </div>
  );
}

export default InfoArea;
