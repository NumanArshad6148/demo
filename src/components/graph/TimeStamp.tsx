import { Button } from "antd";
import dayjs from "dayjs";
import { memo, useCallback, useMemo, useState } from "react";
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
import data from "./dummy.json";

const TimeStamp = () => {
  const [opacity, setStrockOpacity] = useState({
    Short_Term: 1,
    Medium_Term: 1,
    Long_Term: 1,
    DataValue: 1,
  });

  const convertDateToUnix = (date: any) => dayjs(date).valueOf();

  const startDate = dayjs(data[0]["TheDate"]);

  const endDate = dayjs(data[data.length - 1]["TheDate"]);

  let predictionDates: any = [];

  const predictionList = useMemo(() => {
    return data.map((value: any) => {
      const { TheDate, ...rest } = value;
      let unixXAxis = { ...rest, TheDate: convertDateToUnix(TheDate) };

      if (!value?.Medium_Term) return unixXAxis;

      const nm: number = +unixXAxis?.Medium_Term;
      const result = [28, 30].includes(nm);
      if (result) {
        predictionDates.push({
          date: TheDate,
          year: dayjs(TheDate).year(),
          month: dayjs(TheDate).month(),
        });
        return { ...unixXAxis, trigger: nm };
      }
      return unixXAxis;
    });
  }, [data]);

  const formatTooltipValue = (value: string) => {
    return value.length < 8 ? value : value.substring(0, 8);
  };

  console.log({ predictionDates });
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
              { x: TheDate, y: 0 },
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
        payload: { TheDate, DataValue, Short_Term, Medium_Term, Long_Term },
      } = payload[0];

      return (
        <div
          style={{
            backgroundColor: "white",
            border: "0.5px solid grey",
            padding: "10px",
          }}
        >
          <p className="label">{dateFormatter(TheDate)} </p>
          {opacity.DataValue && DataValue ? (
            <p style={{ color: "black" }}>Data Value : {DataValue}</p>
          ) : null}
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

  const xAxisTickFormat = (props: any) => {
    const { x, y, stroke, payload } = props;
    return (
      <g transform={`translate(${x},${y})`} style={{ fontSize: "6px" }}>
        <text
          x={0}
          y={0}
          dy={5}
          textAnchor="end"
          fill="#666"
          transform="rotate(-45)"
        >
          {dateFormatter(payload.value)}
        </text>
      </g>
    );
  };

  const dateFormatter = (value: any) => {
    let format = dayjs(value).format("MM-DD-YY");
    return format;
  };

  const getPredictionTick = useCallback(
    (unixDate: any) => {
      let value = null;
      let [dateMonth, dateYear] = [
        dayjs(unixDate).month(),
        dayjs(unixDate).year(),
      ];
      console.log({ dateMonth, dateYear });

      for (let predDate of predictionDates) {
        if (predDate.month === dateMonth && predDate.year === dateYear) {
          console.log({ pass: dateFormatter(unixDate), result: predDate.date });
          value = predDate.date;
          break;
        }
      }

      return value;
    },
    [predictionDates]
  );

  const addMonth = (date: any, incrementIndex: number = 1) => {
    let current = typeof date === "object" ? date : dayjs(date);
    let currentDate = current.add(incrementIndex, "month").format("MM-DD-YY");
    return dayjs(currentDate).valueOf();
  };

  const getTicks = (monthDiff = 1) => {
    const startDate = dayjs(data[0]["TheDate"]);
    const endDate = dayjs(data[data.length - 1]["TheDate"]);

    let countMonths = endDate.diff(startDate, "month");
    let iteratingMonth = [...Array(countMonths)];
    let dateTicks: any = [];
    iteratingMonth.forEach((date, index) => {
      let incrementValue = index + monthDiff;
      // if(incrementValue > iteratingMonth.length) return;
      //  let currentDate = startDate.add(incrementValue, 'month').format("MM-DD-YY");
      let add = addMonth(startDate, incrementValue);

      let predictionDate = getPredictionTick(add);
      dateTicks.push(add);
      if (predictionDate) {
        dateTicks.push(convertDateToUnix(predictionDate));
      }
    });
    return [
      convertDateToUnix(startDate),
      ...dateTicks,
      convertDateToUnix(endDate),
    ];
  };

  return (
    <>
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
              interval={0}
              type="number"
              ticks={getTicks()}
              domain={[
                convertDateToUnix(startDate),
                convertDateToUnix(endDate),
              ]}
              tick={xAxisTickFormat}
            >
              <Label value="Occupancy Number" position="top" offset={500} />
            </XAxis>
            <YAxis
              type="number"
              domain={["0", "dataMax"]}
              interval={0}
              tickCount={21}
            />

            <Legend
              iconType="plainline"
              onClick={handleOpacityEffect}
              payload={[
                {
                  id: "DataValue",
                  value: "DataValue",
                  type: "plainline",
                  color: "black",
                },
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
            />
            <Area
              type="monotone"
              dataKey="Critical"
              stackId="1"
              stroke="yellow"
              strokeWidth={0}
              fill="yellow"
              activeDot={false}
            />
            <Area
              type="monotone"
              dataKey="Concern"
              stackId="1"
              stroke="green"
              strokeWidth={0}
              fill="green"
              activeDot={false}
            />
            <Line
              type="monotone"
              dataKey="DataValue"
              stroke="black"
              strokeWidth={1}
              dot={false}
              activeDot={!!opacity.DataValue}
              strokeOpacity={opacity.DataValue}
            />
            <Line
              type="monotone"
              dataKey="Short_Term"
              stroke="blue"
              strokeWidth={1}
              dot={false}
              activeDot={!!opacity.Short_Term}
              strokeOpacity={opacity.Short_Term}
            />
            <Line
              type="monotone"
              dataKey="Medium_Term"
              stroke="green"
              strokeWidth={1}
              dot={false}
              activeDot={!!opacity.Medium_Term}
              strokeOpacity={opacity.Medium_Term}
            />
            <Line
              type="monotone"
              dataKey="Long_Term"
              stroke="red"
              strokeWidth={1}
              dot={false}
              activeDot={!!opacity.Long_Term}
              strokeOpacity={opacity.Long_Term}
            />
            {renderShareLine}

            <Scatter
              dataKey="trigger"
              data={predictionList}
              shape="star"
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
    </>
  );
};

export default TimeStamp;
