import "./AreaTable.css";

interface TableData {
  arma: string;
  edad: string;
  sexo: string;
  desc: string;
  prem: string;
}

interface AreaTableProps {
  data: TableData;
}

function AreaTable({ data }: AreaTableProps) {
  return (
    <table className="atable">
      <tbody>
        <tr>
          <th className="ath" colSpan={2}>
            Resumen de datos
          </th>
        </tr>
        <tr>
          <td className="atd">Arma mas usada</td>
          <td className="atd">{data.arma}</td>
        </tr>
        <tr>
          <td className="atd">Edad mas afectada</td>
          <td className="atd">{data.edad}</td>
        </tr>
        <tr>
          <td className="atd">Sexo mas afectado</td>
          <td className="atd">{data.sexo}</td>
        </tr>
        <tr>
          <td className="atd">Descendencia mas afectada</td>
          <td className="atd">{data.desc}</td>
        </tr>
        <tr>
          <td className="atd">Premisa mas comun</td>
          <td className="atd">{data.prem}</td>
        </tr>
      </tbody>
    </table>
  );
}

export default AreaTable;
