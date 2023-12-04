import { useState, ChangeEventHandler } from "react";
import { IoMdClose } from "react-icons/io";
import "./Select.css";


interface Sexo {
  sexo: string;
  name: string;
}

interface SelectProps {
  selected: string;
  onChange: ChangeEventHandler;
  onClose: () => void;
}

function SexoSelect({ selected, onChange, onClose }: SelectProps) {
  const [data] = useState<Sexo[]>([
    { sexo: "0", name: "Seleccione un sexo..." },
    { sexo: "F", name: "Mujer" },
    { sexo: "M", name: "Hombre" },
    { sexo: "X", name: "Otro" },
  ]);

  return (
    <div className="select-div">
      <label htmlFor="ageSelect">Sexo de la víctima:</label>
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
      <IoMdClose
        className="closeBtn"
        onClick={onClose}
        size="30"
        color="#555555"
      />
    </div>
  );
}

export default SexoSelect;
