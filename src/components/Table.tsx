import { useState, useEffect } from "react";
import "./Table.css";

interface TableData {
  area: string;
  info: {
    perc: string;
    diff: string;
  };
}

interface TableProps {
  titulo: string;
  data: TableData[];
}

function Table({ titulo, data }: TableProps) {
  const [color, setColor] = useState("green");
  const [sign, setSign] = useState("-");

  useEffect(() => {
    if (titulo === "sobre") {
      setColor("red");
      setSign("+");
    }
  }, []);

  return (
    <table className="table">
      <thead>
        <tr>
          <th className="th">Área</th>
          <th className="th">% por {titulo} el promedio</th>
          <th className="th">Címenes por {titulo} el promedio</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr>
            <td className="td">{item.area}</td>
            <td className="td" style={{ color: color, textAlign: "right" }}>
              {sign}
              {item.info.perc}
            </td>
            <td className="td" style={{ color: color, textAlign: "right" }}>
              {sign}
              {item.info.diff}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;
