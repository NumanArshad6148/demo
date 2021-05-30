import { Button } from "antd";
import { memo, useMemo, useState } from "react";
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
import data from "./data.json";
// const data = [
//   {
//     name: "Apr-20",
//     ideal: 5500,
//     //  pv: 2400,
//     // actual: 2400,
//     danger: 2000,
//     concern: 2000,
//     acceptable: 2000,
//   },
//   {
//     name: "15-Apr-20",
//     ideal: 5000,
//     //  pv: 2400,
//     // actual: 2400,
//     danger: 2000,
//     concern: 2000,
//     acceptable: 2000,
//   },
//   {
//     name: "30-Apr-20",
//     ideal: 5000,
//     //  pv: 2400,
//     // actual: 2400,
//     danger: 2000,
//     concern: 2000,
//     acceptable: 2000,
//   },
//   {
//     name: "May-20",
//     ideal: 2400,
//     //  pv: [500, 2400],
//     //  actual: 2400,
//     danger: 2000,
//     concern: 2000,
//     acceptable: 2000,
//   },
//   {
//     name: "15-May-20",
//     ideal: 5000,
//     //  pv: 2400,
//     // actual: 2400,
//     danger: 2000,
//     concern: 2000,
//     acceptable: 2000,
//   },
//   {
//     name: "30-May-20",
//     ideal: 5000,
//     //  pv: 2400,
//     // actual: 2400,
//     danger: 2000,
//     concern: 2000,
//     acceptable: 2000,
//   },
//   {
//     name: "Jun-20",
//     ideal: 2000,
//     //   pv: 2000,
//     //   actual: 3500,
//     danger: 2000,
//     concern: 2000,
//     acceptable: 2000,
//   },
//   {
//     name: "15-Jun-20",
//     ideal: 2000,
//     //   pv: 2000,
//     //   actual: 3500,
//     danger: 2000,
//     concern: 2000,
//     acceptable: 2000,
//   },
//   {
//     name: "31-Jun-20",
//     ideal: 2000,
//     //   pv: 2000,
//     //   actual: 3500,
//     danger: 2000,
//     concern: 2000,
//     trigger: 2000,

//     acceptable: 2000,
//   },

//   {
//     name: "Jul-20",
//     ideal: 2780,
//     //   pv: 3908,
//     actual: 2780,
//     danger: 2000,

//     concern: 2000,
//     acceptable: 2000,
//   },
//   {
//     name: "15-Jul-20",
//     ideal: 2780,
//     //   pv: 3908,
//     actual: 3780,
//     danger: 2000,

//     concern: 2000,
//     acceptable: 2000,
//   },
//   {
//     name: "30-Jul-20",
//     ideal: 2780,
//     //   pv: 3908,
//     actual: 4500,
//     danger: 2000,

//     concern: 2000,
//     acceptable: 2000,
//   },
//   {
//     name: "Aug-20",
//     ideal: 2500,
//     //  pv: 4800,
//     actual: 2200,
//     danger: 2000,
//     predicted: 3000,
//     concern: 2000,
//     acceptable: 2000,
//   },
//   {
//     name: "15-Aug-20",
//     ideal: 2500,
//     //  pv: 4800,
//     actual: 2200,
//     danger: 2000,
//     predicted: 3000,
//     concern: 2000,
//     acceptable: 2000,
//   },
//   {
//     name: "30-Aug-20",
//     ideal: 2500,
//     //  pv: 4800,
//     actual: 2200,
//     danger: 2000,
//     predicted: 3000,
//     concern: 2000,
//     acceptable: 2000,
//   },
//   {
//     name: "Sept-20",
//     ideal: 4000,
//     //  pv: [2300, 3800],
//     actual: 3400,
//     predicted: 3600,
//     trigger: 4000,

//     danger: 2000,
//     concern: 2000,
//     acceptable: 2000,
//   },
//   {
//     name: "15-Sept-20",
//     ideal: 4000,
//     //  pv: [2300, 3800],
//     actual: 3400,
//     predicted: 3600,

//     danger: 2000,
//     concern: 2000,
//     acceptable: 2000,
//   },
//   {
//     name: "30-Sept-20",
//     ideal: 4000,
//     //  pv: [2300, 3800],
//     actual: 3400,
//     predicted: 3600,

//     danger: 2000,
//     concern: 2000,
//     acceptable: 2000,
//   },
//   {
//     name: "Oct-20",
//     // ideal: 3490,
//     //  pv: 4300,
//     predicted: 4300,
//     danger: 2000,
//     concern: 2000,
//     acceptable: 2000,
//   },
//   {
//     name: "15-Oct-20",
//     // ideal: 3490,
//     //  pv: 4300,
//     predicted: 4300,
//     danger: 2000,
//     concern: 2000,
//     acceptable: 2000,
//   },
//   {
//     name: "30-Oct-20",
//     // ideal: 3490,
//     //  pv: 4300,
//     predicted: 4300,
//     danger: 2000,
//     concern: 2000,
//     acceptable: 2000,
//   },
//   {
//     name: "Nov-20",
//     // ideal: 5000,
//     //  pv: 4300,
//     trigger: 4900,

//     predicted: 4900,
//     danger: 2000,
//     concern: 2000,
//     acceptable: 2000,
//   },

//   {
//     name: "15-Nov-20",
//     // ideal: 5000,
//     //  pv: 4300,

//     predicted: 4900,
//     danger: 2000,
//     concern: 2000,
//     acceptable: 2000,
//   },
//   {
//     name: "30-Nov-20",
//     // ideal: 5000,
//     //  pv: 4300,

//     predicted: 4900,
//     danger: 2000,
//     concern: 2000,
//     acceptable: 2000,
//   },
//   {
//     name: "Dec-20",
//     //  ideal: 5000,

//     //  pv: 4300,
//     predicted: 4900,
//     danger: 2000,
//     concern: 2000,
//     acceptable: 2000,
//   },
// ];

const MovingAverage = () => {
  const [opacity, setStrockOpacity] = useState({ ideal: 1, actual: 1 });

  const [showReferenceDot, setShowReferenceDot] = useState(true);

  // const renderShareDots = useMemo(() => {
  //   return data.map(({ ideal, name, actual, trigger }) => {
  //     //   ideal === actual && console.log({ ideal, actual });
  //     return (
  //       trigger && (
  //         <ReferenceDot
  //           x={name}
  //           y={trigger}
  //           stroke="black"
  //           label={`${name}_${trigger}`}
  //         />
  //       )
  //     );
  //   });
  // }, [data]);

  // const renderShareLine = useMemo(() => {
  //   return data.map(({ ideal, name, actual, trigger }) => {
  //     //   ideal === actual && console.log({ ideal, actual });
  //     return (
  //       trigger && (
  //         <ReferenceLine
  //           strokeWidth={3}
  //           strokeDasharray="3 4 5 2"
  //           stroke="blue"
  //           //    x={name}
  //           segment={[
  //             { x: name, y: 0 },
  //             { x: name, y: trigger },
  //           ]}
  //           //   y={trigger}
  //         />
  //       )
  //     );
  //   });
  // }, [data]);

  const CustomTooltip = memo(({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const {
        payload: { ideal, actual, predicted },
      } = payload[0];

      console.log({ ideal, actual, predicted, payload });
      return (
        <div
          style={{
            backgroundColor: "white",
            border: "0.5px solid grey",
            padding: "10px",
          }}
        >
          <p className="label">Date: {label} </p>
          {ideal && (
            <p style={{ color: "green", fontWeight: "bold" }}>
              Ideal : {getPercent(ideal)}
            </p>
          )}
          {actual && (
            <p style={{ color: "blue", fontWeight: "bold" }}>
              Actual : {getPercent(actual)}
            </p>
          )}

          {predicted && (
            <p style={{ color: "blue" }}>
              Predicted : {getPercent(predicted)}{" "}
            </p>
          )}

          {ideal && (actual ?? predicted) && (
            <p style={{ color: "#413EA0" }}>
              Difference: {Math.abs(ideal - (actual ?? predicted))}
            </p>
          )}
        </div>
      );
    }

    return null;
  });

  const getPercent = (data: any) => `${((data / 7500) * 100).toFixed(2)}%`;

  const handleOpacityEffect = (legendProp: any) => {
    const { dataKey } = legendProp;
    //@ts-ignore
    let updatedOpacityValue = opacity[dataKey] === 1 ? 0 : 1;
    setStrockOpacity({ ...opacity, [dataKey]: updatedOpacityValue });
  };

  const HandelToggleReferenceDot = () => {
    setShowReferenceDot(!showReferenceDot);
  };

  const toPercent = (decimal: any, fixed: any) => {
    console.log(decimal, fixed);
    return getPercent(decimal + 1500);
  };

  const xAxisTickFormat = (props: any) => {
    // console.log("data is", payload);
    // return payload;;
    const { x, y, stroke, payload } = props;

    return (
      <g transform={`translate(${x},${y})`} style={{ fontSize: "7px" }}>
        <text
          x={0}
          y={0}
          dy={5}
          textAnchor="end"
          //verticalAnchor="start"
          fill="#666"
          transform="rotate(-35)"
        >
          {/* {payload.value} */}
        </text>
      </g>
    );
  };

  return (
    <>
      <div style={{ width: "100%", height: 500 }} id="printThis">
        <ResponsiveContainer>
          <ComposedChart
            data={data}
            margin={{
              top: 40,
              right: 20,
              bottom: 20,
              left: 20,
            }}
          >
            <XAxis
              dataKey="TheDate" //type="number" domain={[0, "dataMax + 1000"]}
              // ticks={[
              //   "Apr-20",
              //   "May-20",
              //   "Jun-20",
              //   "May-20",
              //   "Jun-20",
              //   "Jul-20",
              //   "Aug-20",
              //   "Sept-20",
              //   "Oct-20",
              //   "Nov-20",
              //   "Dec-20",
              // ]}
              //  tickLine={false}

              // domain={["dataMin", "dataMax"]}
              interval={100}
              //  allowDataOverflow={true} //   tickLine={false}
              tick={xAxisTickFormat}
              // padding={{ left: 10 }}
            >
              <Label value="Occupancy" position="top" offset={400} />
            </XAxis>
            <YAxis
              type="number"
              domain={["0", "dataMax"]}
              // ticks={[
              //   "0",
              //   "2",
              //   "4",
              //   "6",
              //   "8",
              //   "10",
              //   "12",
              //   "14",
              //   "16",
              //   "18",
              //   "20",
              //   "22",
              //   "24",
              //   "26",
              //   "28",
              //   // "30",
              //   //"30.30",
              //   "40",
              // ]}
              interval={0}
              tickCount={21}
              //tickFormatter={toPercent}
            />

            <Legend
              onClick={handleOpacityEffect}
              // payload={[
              //   {
              //     value: "Occupancy-6m",
              //     id: "ideal",
              //     color: "green",
              //     type: "plainline",
              //   },
              //   {
              //     value: "Occupancy-3m",
              //     id: "actual",
              //     color: "blue",
              //     type: "plainline",
              //   },
              // ]}
            />
            <Tooltip //content={<CustomTooltip />}
            />
            <Area
              type="monotone"
              dataKey="Critical"
              stackId="1"
              stroke="red"
              strokeWidth={0}
              fill="red"
              activeDot={false}
            />
            <Area
              type="monotone"
              dataKey="Concern"
              stackId="1"
              stroke="yellow"
              strokeWidth={0}
              fill="yellow"
              activeDot={false}
            />
            <Area
              type="monotone"
              dataKey="Green"
              stackId="1"
              stroke="green"
              strokeWidth={0}
              fill="green"
              activeDot={false}
            />
            {/* {renderShareLine}
            <Area
              type="monotone"
              dataKey="danger"
              stackId="1"
              stroke="red"
              strokeWidth={0}
              fill="red"
              activeDot={false}
            />
            <Area
              type="monotone"
              dataKey="concern"
              stackId="1"
              strokeWidth={0}
              stroke="orange"
              fill="orange"
              activeDot={false}
            />
            <Area
              type="monotone"
              strokeWidth={0}
              dataKey="acceptable"
              stackId="1"
              stroke="green"
              fill="green"
              activeDot={false}
            />
            <Line
              type="monotone"
              dataKey="ideal"
              stroke="green"
              strokeWidth={3}
              dot={false}
              strokeOpacity={opacity.ideal}
            />
            <Line
              type="natural"
              dataKey="actual"
              strokeWidth={3}
              strokeOpacity={opacity.actual}
              dot={false}
              stroke="blue"
            />
            <Line
              type="monotoneX"
              dataKey="predicted"
              stroke="blue"
              dot={false}
              strokeOpacity={opacity.actual}
            />
            <ReferenceLine
              strokeWidth={4}
              stroke="black"
              segment={[
                { x: "15-Apr-20", y: 1800 },
                { x: "15-Nov-20", y: 1800 },
              ]}
            />
        
            <Scatter
              dataKey="trigger"
              data={data}
              shape="star"
              stroke="blue"
              fontSize={22}
            >
              {data.map(({ trigger }, index) => {
                const nm: number = trigger as number;
                const fillColor =
                  nm > 4000 ? "green" : nm > 2000 ? "orange" : "red";
                console.log({ fillColor });

                return <Cell key={`cell-${index}`} fill={fillColor} />;
              })}
            </Scatter> */}
            <Line
              type="monotone"
              dataKey="Short_Term"
              stroke="blue"
              strokeWidth={1}
              dot={false}
              //  strokeOpacity={opacity.actual}
            />
            <Line
              type="monotone"
              dataKey="Medium_Term"
              stroke="green"
              strokeWidth={1}
              dot={false}
              //  strokeOpacity={opacity.actual}
            />
            <Line
              type="monotone"
              dataKey="Long_Term"
              stroke="red"
              strokeWidth={1}
              dot={false}
              //  strokeOpacity={opacity.actual}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};

export default MovingAverage;
