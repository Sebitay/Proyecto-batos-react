import { useState, useEffect } from "react";
import axios from "axios";
import Highcharts from "highcharts/highmaps";
import HighchartsReact from "highcharts-react-official";

const URL = "http://localhost:3000";

interface MapClick {
  point: {
    id: string;
    name: string;
    value: number;
  };
}

interface Map {
  title: {
    text: string;
    style?: {
      color: string;
    };
  };
  exporting?: {
    enabled: boolean;
  };
  chart?: {
    backgroundColor: string;
    height: string;
  };
  colorAxis?: {
    stops: [number, string][];
  };
  legend?: {
    align: string;
    floating: boolean;
    title: {
      text: string;
    };
  };
  series?: [
    {
      type: "map";
      joinBy: "id";
      data: {
        id: string;
        name: string;
        value: number;
        borderColor: string;
        path: string;
      }[];
      name: "Numero de crimenes";
      dataLabels: {
        enabled: true;
        format: "{point.name}";
      };
      point: {
        events: {
          click: (e: MapClick) => void;
        };
      };
    }
  ];
}

interface MapProps {
  onClick: (e: MapClick) => void;
}

function Map({ onClick }: MapProps) {
  const [options, setOptions] = useState<Map>({
    title: {
      text: "Cargando mapa...",
    },
  });

  useEffect(() => {
    axios
      .get(URL + "/infoMap")
      .then((res) => {
        setOptions({
          title: {
            text: "Mapa de Los Angeles",
            style: {
              color: "black",
            },
          },
          exporting: {
            enabled: false,
          },
          chart: {
            backgroundColor: "transparent",
            height: "100%",
          },

          colorAxis: {
            stops: [
              [0, "rgb(0, 255, 0)"],
              [0.45, "rgb(255, 255, 0)"],
              [0.9, "rgb(255, 0, 0)"],
            ],
          },

          legend: {
            align: "left",
            floating: true,
            title: {
              text: "Numero de crimenes",
            },
          },

          series: [
            {
              type: "map",
              joinBy: "id",
              data: [
                {
                  id: "17",
                  name: "Devonshire",
                  value: res.data[16],
                  borderColor: "black",
                  path: "M86,227,101,219,127,218,128,235L149,235L149,250,157,259,157,267,341,261,344,160,352,125,286,41,244,77,159,100,144,159,128,154,99,157,88,163z",
                },
                {
                  id: "21",
                  name: "Topanga",
                  value: res.data[20],
                  borderColor: "black",
                  path: "M198,266,197,377,192,438,121,405,91,405,44,364,43,349,28,350,28,288,51,281,51,252,61,231,86,227,101,219,127,218,128,235L149,235L149,250,157,259,157,267z",
                },
                {
                  id: "10",
                  name: "West Valley",
                  value: res.data[9],
                  borderColor: "black",
                  path: "M198,266,341,261,339,332,350,349,349,399,344,410,345,425,337,443,192,438,197,377z",
                },
                {
                  id: "19",
                  name: "Mission",
                  value: res.data[18],
                  borderColor: "black",
                  path: "M341,270,416,289,424,265L443,265L442,240,392,176,402,154,422,137,412,125,429,112,454,136,461,115,467,71,452,48,311,49,292,34,286,41,352,125,344,160,341,261z",
                },
                {
                  id: "16",
                  name: "Foothill",
                  value: res.data[15],
                  borderColor: "black",
                  path: "M454,136,429,112,412,125,422,137,402,154,392,176,442,240,443,265,452,289L554,289L564,269,565,261,674,259,678,200L690,200L691,171,720,170,720,139,666,140,666,125,622,126,621,138,584,136,582,143,540,143,540,152,482,139,487,114,474,107,461,115z",
                },
                {
                  id: "9",
                  name: "Van Nuys",
                  value: res.data[8],
                  borderColor: "black",
                  path: "M416,289,341,270,339,332,350,349,349,399,344,410,345,425,337,443,374,435,434,443,446,438,440,429,438,388,453,389,437,332,417,304z",
                },
                {
                  id: "15",
                  name: "North Hollywood",
                  value: res.data[14],
                  borderColor: "black",
                  path: "M519,289,532,370L532,381L537,381,548,415,604,401,604,423L556,423L548,443,556,456,548,462,528,455,524,443,505,440,499,455,464,461,446,438,440,429,438,388,453,389,437,332,417,304,416,289,424,265L443,265L452,289z",
                },
                {
                  id: "8",
                  name: "West LA",
                  value: res.data[7],
                  borderColor: "black",
                  path: "M192,438,139,547,186,559,185,600,192,613,229,617,271,643,285,628,286,614,293,615,307,595,324,613,335,602,376,639,413,630,437,631,468,636,497,619,498,573,458,508,464,461,446,438,434,443,374,435,337,443z",
                },
                {
                  id: "6",
                  name: "Hollywood",
                  value: res.data[5],
                  borderColor: "black",
                  path: "M556,423L604,423L604,417,627,418,613,487,622,487,621,531,569,532,568,522,507,523,475,534,458,508,464,461,499,455,505,440,524,443,528,455,548,462,556,456,548,443z",
                },
                {
                  id: "7",
                  name: "Wilshire",
                  value: res.data[6],
                  borderColor: "black",
                  path: "M497,619,522,626,593,621,595,595,584,589,588,572,587,531,569,532,568,522,507,523,475,534,498,573z",
                },
                {
                  id: "20",
                  name: "Olympic",
                  value: res.data[19],
                  borderColor: "black",
                  path: "M587,531,621,531,621,546,647,546,647,621L593,621L595,595,584,589,588,572z",
                },
                {
                  id: "11",
                  name: "Northeast",
                  value: res.data[10],
                  borderColor: "black",
                  path: "M604,417,604,401,607,379,623,386,661,394,690,455,728,447,727,429L738,429L738,403,775,404,777,396,785,397,786,404,808,404,816,417,803,427,821,452,831,445,840,449,838,464,819,475L809,475L808,484,797,494,786,493,774,510L774,517L764,525,753,527,727,552,724,560,687,541,677,543,663,531,661,518,653,512,647,516,621,516,622,487,613,487,627,418z",
                },
                {
                  id: "4",
                  name: "Hollenbeck",
                  value: res.data[3],
                  borderColor: "black",
                  path: "M819,475L809,475L808,484,797,494,786,493,774,510L774,517L764,525,753,527,740,539,744,560,736,604,748,663,797,668,796,624,795,572,840,571,848,546,848,512,857,501L819,501z",
                },
                {
                  id: "1",
                  name: "Central",
                  value: res.data[0],
                  borderColor: "black",
                  path: "M740,539,744,560,736,604,741,626,721,627,709,614,698,616,684,636,663,625,666,608,686,594,706,570,701,548,724,560,727,552z",
                },
                {
                  id: "2",
                  name: "Rampart",
                  value: res.data[1],
                  borderColor: "black",
                  path: "M647,621,664,619,666,608,686,594,706,570,701,548,687,541,677,543,663,531,661,518,653,512,647,516,621,516,621,531,621,546,647,546,647,564z",
                },
                {
                  id: "13",
                  name: "Newton",
                  value: res.data[12],
                  borderColor: "black",
                  path: "M748,663,741,626,721,627,709,614,698,616,684,636,663,625L663,641L654,661,654,741,692,741,692,714,722,714,719,663z",
                },
                {
                  id: "3",
                  name: "Southwest",
                  value: res.data[2],
                  borderColor: "black",
                  path: "M654,687,595,688L595,705L570,704,572,688,564,677,556,685,540,685,530,695,516,682,515,664,490,656,501,638,514,624,522,626,593,621L647,621L664,619,663,625L663,641L654,661Z",
                },
                {
                  id: "12",
                  name: "77th Street",
                  value: res.data[11],
                  borderColor: "black",
                  path: "M654,687,654,741,692,741,692,772,621,773L621,791L612,814,604,815,595,799L595,753L580,753L580,760L571,761L571,747L567,748L567,733L534,734,535,716,562,717,562,704,570,704,595,705L595,688z",
                },
                {
                  id: "18",
                  name: "Southeast",
                  value: res.data[17],
                  borderColor: "black",
                  path: "M692,772L692,788L696,791,697,807L706,807L707,786,728,786,728,801,735,801,737,813,735,832,697,831,697,844,653,844,650,942L637,942L637,832,637,772z",
                },
                {
                  id: "5",
                  name: "Harbor",
                  value: res.data[4],
                  borderColor: "black",
                  path: "M650,942,651,963,642,966,642,992,622,993,623,1090,721,1084,747,1118,710,1154,716,1166,701,1206,676,1225,681,1235,673,1238,659,1266,630,1270,570,1238,574,1228,594,1215,594,1190L608,1190L605,1155,611,1125,609,957,637,957,637,942z",
                },
                {
                  id: "14",
                  name: "Pacific",
                  value: res.data[13],
                  borderColor: "black",
                  path: "M413,630L376,639L391,661L327,705L360,748L397,817L413,856L425,855L401,789L468,783L480,788L481,802L493,802L494,843L511,843L510,788L494,788L494,774L509,766L508,735L534,734L534,729L499,729L499,741L480,741L462,732L447,710L458,698L425,674L468,636L437,631L413,630zM383,715L404,741L380,760L367,742L365,729L383,715z",
                },
              ],
              name: "Numero de crimenes",
              dataLabels: {
                enabled: true,
                format: "{point.name}",
              },
              point: {
                events: {
                  click: onClick,
                },
              },
            },
          ],
        });
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div style={{ height: "100vh", width: "48vw", overflow: "scroll" }}>
      <HighchartsReact
        className="map"
        highcharts={Highcharts}
        constructorType={"mapChart"}
        options={options}
      />
    </div>
  );
}

export default Map;
