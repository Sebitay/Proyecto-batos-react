import { useState, useEffect, ChangeEventHandler } from "react";
import axios from "axios";
import "./Select.css";

const URL = "http://localhost:3000";

interface Sexo {
  sexo: string;
  name: string;
}

interface SelectProps {
  selected: string;
  onChange: ChangeEventHandler;
}

function SexoSelect({ selected, onChange }: SelectProps) {
  const [data] = useState<Sexo[]>([
    { sexo: "0", name: "Seleccione un sexo..." },
    { sexo: "F", name: "Femenino" },
    { sexo: "M", name: "Masculino" },
    { sexo: "X", name: "Otro" },
  ]);

  return (
    <div className="select-div">
      <label htmlFor="ageSelect">Sexo de la victima:</label>
      <select
        name="ageSelect"
        id="ageSelect"
        value={selected}
        onChange={onChange}
      >
        {data.map((item) => (
          <option key={item.sexo} value={item.sexo}>
            {item.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SexoSelect;
