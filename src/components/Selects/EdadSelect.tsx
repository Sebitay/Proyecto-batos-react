import { useState, useEffect, ChangeEventHandler } from "react";
import axios from "axios";
import "./Select.css";

const URL = "http://localhost:3000";

interface SelectProps {
  selected: string;
  onChange: ChangeEventHandler;
}

function EdadSelect({ selected, onChange }: SelectProps) {
  const [data, setData] = useState<string[]>(["Seleccione una edad..."]);

  useEffect(() => {
    axios
      .get(URL + "/getEdades")
      .then((res) => {
        setData(["Seleccione una edad...", ...res.data]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="select-div">
      <label htmlFor="ageSelect">Edad de la victima:</label>
      <select
        name="ageSelect"
        id="ageSelect"
        value={selected}
        onChange={onChange}
      >
        {data.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
    </div>
  );
}

export default EdadSelect;
