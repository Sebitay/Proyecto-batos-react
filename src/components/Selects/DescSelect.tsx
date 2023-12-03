import { useState, useEffect, ChangeEventHandler } from "react";
import axios from "axios";
import "./Select.css";

const URL = "http://localhost:3000";

interface Descendencia {
  id: string;
  name: string;
}

interface SelectProps {
  selected: string;
  onChange: ChangeEventHandler;
}

function DescSelect({ selected, onChange }: SelectProps) {
  const [data, setData] = useState<Descendencia[]>([
    { id: "N", name: "Seleccione un descendencia" },
  ]);

  useEffect(() => {
    axios
      .get(URL + "/getDescendencias")
      .then((res) => {
        setData([{ id: "0", name: "Seleccione un descendencia" }, ...res.data]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="select-div">
      <label htmlFor="ageSelect">Descendencia de la victima:</label>
      <select
        name="ageSelect"
        id="ageSelect"
        value={selected}
        onChange={onChange}
      >
        {data.map((item) => (
          <option key={item.id} value={item.id}>
            {item.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default DescSelect;
