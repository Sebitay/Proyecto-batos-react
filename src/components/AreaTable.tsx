import "./AreaTable.css";

interface TableData {
  arma: string;
  edad: string;
  sexo: string;
  desc: string;
}

interface AreaTableProps {
  data: TableData;
}

function AreaTable({ data }: AreaTableProps) {
  return (
    <table>
      <tbody>
        <tr>
          <th colSpan={2}>Resumen de datos</th>
        </tr>
        <tr>
          <td>Arma mas usada</td>
          <td>{data.arma}</td>
        </tr>
        <tr>
          <td>Edad mas afectada</td>
          <td>{data.edad}</td>
        </tr>
        <tr>
          <td>Sexo mas afectado</td>
          <td>{data.sexo}</td>
        </tr>
        <tr>
          <td>Descendencia mas afectada</td>
          <td>{data.desc}</td>
        </tr>
      </tbody>
    </table>
  );
}

export default AreaTable;
