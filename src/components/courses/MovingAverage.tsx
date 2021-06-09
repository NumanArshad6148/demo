import { Button } from "antd";
import dayjs from "dayjs";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import moment from "moment";
import { memo, useCallback, useEffect, useMemo, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Label,
  ReferenceDot,
  ReferenceLine,
  ComposedChart,
  Area,
  Bar,
  Cell,
  Scatter,
} from "recharts";
import { isEmpty } from "../../utils/functions";
import data from "./projection.json";
import TriangleShape from "./Triangle";

const MovingAverage = () => {
  const [opacity, setStrockOpacity] = useState({
    Short_Term: 1,
    Medium_Term: 1,
    Long_Term: 1,
    DataValue: 1,
    Projection_Line: 1,
  });

  const [showReferenceDot, setShowReferenceDot] = useState(true);

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    window.addEventListener("resize", (event) =>
      setWindowWidth(window.innerWidth)
    );
  });

  let intervalValue = windowWidth < 900 ? 174 : 80;

  console.log({ windowWidth });
  const HandelToggleReferenceDot = () => {
    setShowReferenceDot(!showReferenceDot);
  };

  const calculate = (value: any) => {
    if (value < 20) return value;
    let nmbr: any;
    let dec: any;
    [nmbr, dec] = value.split(".");
    nmbr = nmbr - 20;
    return `${nmbr}.${dec}`;
  };

  // console.log(isCorruptedData(user))
  const predictionList = useMemo(() => {
    let updatedData = [];

    for (let value of data) {
      let resultant = { ...value, Danger: "27", Critical: "3", Concern: "5" };

      if (isEmpty(value?.Short_Term)) delete value?.Short_Term;
      if (isEmpty(value?.Medium_Term)) delete value?.Medium_Term;
      if (isEmpty(value?.Long_Term)) delete value?.Long_Term;
      else {
        const nm: number = +value?.Medium_Term;
        const result = [27, 30].includes(nm);
        if (result) {
          resultant = { ...resultant, trigger: nm };
        }
      }

      //   if( resultant['Short_Term']) resultant['Short_Term'] = calculate( resultant['Short_Term'] );
      //   if( resultant['Medium_Term'])  resultant['Medium_Term'] = calculate( resultant['Medium_Term'] );
      //   if( resultant['Long_Term'])   resultant['Long_Term'] = calculate( resultant['Long_Term'] );
      //  if( resultant['Projection_Line'])   resultant['Projection_Line'] = calculate( resultant['Projection_Line'] );

      updatedData.push(resultant);
    }

    return updatedData;
  }, [data]);

  const formatTooltipValue = (value: string) => {
    return value.length < 8 ? value : value.substring(0, 8);
  };

  const renderShareLine = useMemo(() => {
    return predictionList.map(({ TheDate, trigger }, index) => {
      return (
        trigger && (
          <ReferenceLine
            key={index}
            strokeWidth={3}
            strokeDasharray="3 4 5 2"
            stroke="black"
            segment={[
              { x: TheDate, y: 20 },
              { x: TheDate, y: trigger },
            ]}
          />
        )
      );
    });
  }, [data]);

  const CustomTooltip = memo(({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const {
        payload: {
          TheDate,
          DataValue,
          Short_Term,
          Medium_Term,
          Long_Term,
          Projection_Line,
        },
      } = payload[0];

      return (
        <div
          style={{
            backgroundColor: "white",
            border: "0.5px solid grey",
            padding: "10px",
          }}
        >
          <p className="label">{TheDate} </p>
          {/* {opacity.DataValue && DataValue ? (
            <p style={{ color: "black" }}>Data Value : {DataValue}</p>
          ) : null} */}
          {opacity.Short_Term && Short_Term ? (
            <p style={{ color: "blue" }}>
              Short Term : {formatTooltipValue(Short_Term)}
            </p>
          ) : null}
          {opacity.Medium_Term && Medium_Term ? (
            <p style={{ color: "green" }}>
              Medium Term : {formatTooltipValue(Medium_Term)}
            </p>
          ) : null}

          {opacity.Long_Term && Long_Term ? (
            <p style={{ color: "red" }}>
              Long Term : {formatTooltipValue(Long_Term)}
            </p>
          ) : null}
          {opacity.Projection_Line && Projection_Line ? (
            <p style={{ color: "brown" }}>
              Projection Line : {formatTooltipValue(Projection_Line)}
            </p>
          ) : null}
        </div>
      );
    }
    return null;
  });

  const handleOpacityEffect = useCallback(
    (legendProp: any) => {
      const { value } = legendProp;
      //@ts-ignore
      let updatedOpacityValue = opacity[value] === 1 ? 0 : 1;
      setStrockOpacity({ ...opacity, [value]: updatedOpacityValue });
    },
    [opacity]
  );

  //console.log(window.innerWidth)

  const xAxisTickFormat = (props: any) => {
    const { x, y, stroke, payload } = props;
    return (
      <g
        transform={`translate(${x},${y})`}
        style={{ fontSize: "9px", fontWeight: "bold" }}
      >
        <text
          x={0}
          y={0}
          dy={5}
          textAnchor="end"
          fill="#666"
          transform="rotate(-35)"
        >
          {payload.value}
        </text>
      </g>
    );
  };

  //console.log(window.innerWidth)

  const RenderNoShape = (props: any) => {
    return null;
  };

  const [isDownloading, setDownloading] = useState(false);

  const print = (event: any) => {
    const input: any = document.getElementById("printThis");
    // input.style.width = "75%";
    event.preventDefault();

    setDownloading(true);
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("landscape");
      // Page 1
      //  console.log({ imgData });
      //  pdf.text("This could be a headline for the report", 20, 20);
      //@ts-ignore
      // pdf.text(20, 30, "This is client-side Javascript, pumping out a PDF.");
      // Page 2 (uncomment next line for adding page 2)
      // pdf.addPage()
      //@ts-ignore
      //  pdf.addImage(imgData, "JPEG", 15, 40);
      pdf.addImage(imgData, "JPEG", 0, 10, 290, 120);
      pdf.save("download.pdf");

      setDownloading(false);
    });
  };

  //  const ticksLine: any = [20, 22, 24, 26, 28, 30, 32 , 34];
  return (
    <div style={{ padding: "20px" }}>
      <div style={{ width: "100%", height: 600 }} id="printThis">
        <ResponsiveContainer>
          <ComposedChart
            data={predictionList}
            margin={{
              top: 40,
              right: 20,
              bottom: 20,
              left: 20,
            }}
          >
            <XAxis
              dataKey="TheDate"
              interval={intervalValue}
              tick={xAxisTickFormat}
            >
              <Label value="Occupancy Number" position="top" offset={510} />
            </XAxis>
            <YAxis
              type="number"
              domain={[
                (dataMin: any) => dataMin + 20,
                (dataMax: any) => dataMax - 1,
              ]}
              interval={0}
              tickCount={10}
              allowDataOverflow={true}
            />

            <Legend
              iconType="plainline"
              onClick={handleOpacityEffect}
              payload={[
                // {
                //   id: "DataValue",
                //   value: "DataValue",
                //   type: "plainline",
                //   color: "black",
                // },
                {
                  id: "Short_Term",
                  value: "Short_Term",
                  type: "plainline",
                  color: "blue",
                },
                {
                  id: "Medium_Term",
                  value: "Medium_Term",
                  type: "plainline",
                  color: "green",
                },
                {
                  id: "Long_Term",
                  value: "Long_Term",
                  type: "plainline",
                  color: "red",
                },

                {
                  id: "Projection_Line",
                  value: "Projection_Line",
                  type: "plainline",
                  color: "black",
                },
              ]}
            />

            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="Danger"
              stackId="1"
              stroke="red"
              strokeWidth={0}
              fill="red"
              activeDot={false}
              baseValue={20}
            />
            <Area
              type="monotone"
              dataKey="Critical"
              stackId="1"
              stroke="yellow"
              strokeWidth={0}
              fill="yellow"
              activeDot={false}
              baseValue={20}
            />
            <Area
              type="monotone"
              dataKey="Concern"
              stackId="1"
              stroke="green"
              strokeWidth={0}
              fill="green"
              activeDot={false}
              baseValue={20}
            />
            {/* <Line
              type="monotone"
              dataKey="DataValue"
              stroke="black"
              strokeWidth={1}
              dot={false}
              activeDot={!!opacity.DataValue}
              strokeOpacity={opacity.DataValue}
            /> */}
            <Line
              type="monotone"
              dataKey="Short_Term"
              stroke="blue"
              strokeWidth={2}
              dot={false}
              activeDot={!!opacity.Short_Term}
              strokeOpacity={opacity.Short_Term}
            />
            <Line
              type="monotone"
              dataKey="Medium_Term"
              stroke="green"
              strokeWidth={2}
              dot={false}
              activeDot={!!opacity.Medium_Term}
              strokeOpacity={opacity.Medium_Term}
            />
            <Line
              type="monotone"
              dataKey="Long_Term"
              stroke="red"
              strokeWidth={2}
              dot={false}
              activeDot={!!opacity.Long_Term}
              strokeOpacity={opacity.Long_Term}
            />
            <Line
              type="monotone"
              dataKey="Projection_Line"
              stroke="black"
              strokeWidth={3}
              dot={false}
              activeDot={!!opacity.Projection_Line}
              strokeOpacity={opacity.Projection_Line}
            />
            {showReferenceDot && renderShareLine}

            <Scatter
              dataKey="trigger"
              data={predictionList}
              shape={showReferenceDot ? "star" : <RenderNoShape />}
              stroke="black"
              fontSize={22}
            >
              {predictionList.map(({ trigger }, index) => {
                const fillColor = trigger === 30 ? "yellow" : "red";

                return <Cell key={`cell-${index}`} fill={fillColor} />;
              })}
            </Scatter>
          </ComposedChart>
        </ResponsiveContainer>
      </div>
      <Button
        type="primary"
        onClick={HandelToggleReferenceDot}
        size="small"
        style={{ marginBottom: "10px" }}
      >
        {showReferenceDot ? "Hide " : "Show "}Predictions
      </Button>
      <br />
      <a href="#" onClick={print}>
        {isDownloading ? `Downloading ...` : `Export Graph`}
      </a>
    </div>
  );
};

export default MovingAverage;

// ///temp //remove
// ,
// {
//   "Days": "",
//   "TheDate": "08-28-21",
//   "DataValue": "",
//   "Short_Term": "",
//   "Medium_Term": "",
//   "Long_Term": ""
// },
// {
//   "Days": "",
//   "TheDate": "08-29-21",
//   "DataValue": "",
//   "Short_Term": "",
//   "Medium_Term": "",
//   "Long_Term": ""
// },
// {
//   "Days": "",
//   "TheDate": "08-30-21",
//   "DataValue": "",
//   "Short_Term": "",
//   "Medium_Term": "",
//   "Long_Term": ""
// },
// {
//   "Days": "",
//   "TheDate": "08-31-21",
//   "DataValue": "",
//   "Short_Term": "",
//   "Medium_Term": "",
//   "Long_Term": ""
// },
// {
//   "Days": "",
//   "TheDate": "09-01-21",
//   "DataValue": "",
//   "Short_Term": "",
//   "Medium_Term": "",
//   "Long_Term": ""
// },
// {
//   "Days": "",
//   "TheDate": "09-02-21"
// },
// {
//   "Days": "",
//   "TheDate": "09-03-21"
// },
// {
//   "Days": "",
//   "TheDate": "09-04-21"
// },
// {
//   "Days": "",
//   "TheDate": "09-05-21"
// },
// {
//   "Days": "",
//   "TheDate": "09-06-21"
// },
// {
//   "Days": "",
//   "TheDate": "09-07-21"
// },
// {
//   "Days": "",
//   "TheDate": "09-08-21"
// },
// {
//   "Days": "",
//   "TheDate": "09-09-21"
// },
// {
//   "Days": "",
//   "TheDate": "09-10-21"
// },
// {
//   "Days": "",
//   "TheDate": "09-11-21"
// },
// {
//   "Days": "",
//   "TheDate": "09-12-21"
// },
// {
//   "Days": "",
//   "TheDate": "09-13-21"
// },
// {
//   "Days": "",
//   "TheDate": "09-14-21"
// },
// {
//   "Days": "",
//   "TheDate": "09-15-21"
// },
// {
//   "Days": "",
//   "TheDate": "09-16-21"
// },
// {
//   "Days": "",
//   "TheDate": "09-17-21"
// },
// {
//   "Days": "",
//   "TheDate": "09-18-21"
// },
// {
//   "Days": "",
//   "TheDate": "09-19-21"
// },
// {
//   "Days": "",
//   "TheDate": "09-20-21"
// },
// {
//   "Days": "",
//   "TheDate": "09-21-21"
// },
// {
//   "Days": "",
//   "TheDate": "09-22-21"
// },
// {
//   "Days": "",
//   "TheDate": "09-23-21"
// },
// {
//   "Days": "",
//   "TheDate": "09-24-21"
// }
