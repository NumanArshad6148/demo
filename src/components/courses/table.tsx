import React, {
  FC,
  ReactElement,
  useCallback,
  useEffect,
  useMemo,
  memo,
  useState,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import {
  getAllCourses,
  deleteCourse,
} from "../../redux/courses/courses.actions";
import {
  Modal,
  Table,
  Space,
  Form,
  Select,
  Input,
  SpaceProps,
  Button,
} from "antd";
import { getAllAuthors } from "../../redux/authors/authors.actions";
import { RootState } from "../../redux/store";
import { course, courseListType } from "../../models/courses";
import getColumns from "../../common/customTable";
import CustomTable from "../../common/customTable";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";
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
} from "recharts";
import { Chart } from "react-charts";
import MyDocument from "./MyDocument";
import PdfButton from "../../common/PdfButton";
import DrawGraph from "./DrawGraph";
import SketchGraph from "./SketchGraph";
// import useChartConfig from "hooks/useChartConfig";
import { useSvgDrawing } from "react-hooks-svgdrawing";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import AnchorLink from "antd/lib/anchor/AnchorLink";
import SampleGraph from "./SampleGraph";
import { IColumnType } from "../../models/columnTypes";
import MovingAverage from "./MovingAverage";

// const data = [
//   {
//     name: "Page A",
//     uv: 4000,
//     pv: 2400,
//     amt: 2400,
//   },
//   {
//     name: "Page B",
//     uv: 3000,
//     pv: 1398,
//     amt: 2210,
//   },
//   {
//     name: "Page C",
//     uv: 2000,
//     pv: 2000,
//     // amt: 2290,
//   },
//   {
//     name: "Page d",
//     uv: 2780,
//     pv: 3908,
//     // amt: 2000,
//   },
//   {
//     name: "Page E",
//     uv: 1570,
//     pv: 1570,
//     // amt: 2181,
//   },
//   {
//     name: "Page F",
//     uv: 2390,
//     pv: 3800,
//     //amt: 2500,
//   },
//   {
//     name: "Page G",
//     uv: 3490,
//     pv: 4300,
//     // amt: 2100,
//   },
// ];

const data = [
  {
    name: "05/11",
    ideal: 6000,
    //  pv: 2400,
    actual: 2400,
    danger: 2000,
    concern: 2000,
    acceptable: 2000,
  },
  {
    name: "05/12",
    ideal: 2400,
    //  pv: [500, 2400],
    actual: 2400,
    danger: 2000,
    concern: 2000,
    acceptable: 2000,
  },
  {
    name: "05/13",
    ideal: 2000,
    //   pv: 2000,
    actual: 3500,
    danger: 2000,
    concern: 2000,
    acceptable: 2000,
  },
  {
    name: "05/14",
    ideal: 2780,
    //   pv: 3908,
    actual: 4000,
    danger: 2000,

    concern: 2000,
    acceptable: 2000,
  },
  {
    name: "05/15",
    ideal: 1890,
    //  pv: 4800,
    actual: 1890,
    danger: 2000,

    concern: 2000,
    acceptable: 2000,
  },
  {
    name: "05/16",
    ideal: 2390,
    //  pv: [2300, 3800],
    actual: 3800,
    predicted: 3800,

    danger: 2000,
    concern: 2000,
    acceptable: 2000,
  },
  {
    name: "05/17",
    ideal: 3490,
    //  pv: 4300,
    predicted: 4300,
    danger: 2000,
    concern: 2000,
    acceptable: 2000,
  },
  {
    name: "05/18",
    ideal: 5000,
    //  pv: 4300,
    predicted: 4900,
    danger: 2000,
    concern: 2000,
    acceptable: 2000,
  },
];

export const LinearGraph = () => {
  // const formatPV = (num1: any, pv: number[] | number) => {
  //   return Array.isArray(pv)
  //     ? pv.reduce((prev, current) => {
  //         return Math.abs(prev - num1) < Math.abs(current - num1)
  //           ? prev
  //           : current;
  //       })
  //     : pv;
  // };

  // const formattedData = useMemo(() => {
  //   let updatedData = [...data];
  //   return updatedData.map((value) => {
  //     const { pv, ...rest } = value;
  //     return { ...rest, pv: formatPV(rest.uv, pv) };
  //   });
  // }, [data]);

  const [opacity, setStrockOpacity] = useState({ ideal: 1, actual: 1 });

  const [showReferenceDot, setShowReferenceDot] = useState(true);

  const renderShareDots = useMemo(() => {
    return data.map(({ ideal, name, actual }) => {
      ideal === actual && console.log({ ideal, actual });
      return (
        ideal === actual && (
          <ReferenceDot
            x={name}
            y={ideal}
            stroke="black"
            label={`${name}_${ideal}`}
          />
        )
      );
    });
  }, [data]);

  const CustomTooltip = memo(({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const {
        payload: { ideal, actual, predicted },
      } = payload[0];

      return (
        <div
          style={{
            backgroundColor: "white",
            border: "0.5px solid grey",
            padding: "10px",
          }}
        >
          <p className="label">Date: {label} </p>
          <p style={{ color: "black" }}>Ideal : {ideal}</p>
          {predicted ? (
            <p style={{ color: "red" }}>Predicted : {predicted} </p>
          ) : (
            <p style={{ color: "blue" }}>Actual : {actual} </p>
          )}

          <p style={{ color: "#413EA0" }}>
            Difference: {Math.abs(ideal - (actual ?? predicted))}
          </p>
        </div>
      );
    }

    return null;
  });

  const handleOpacityEffect = (legendProp: any) => {
    const { dataKey } = legendProp;
    // console.log({ dataKey });
    //@ts-ignore
    let updatedOpacityValue = opacity[dataKey] === 1 ? 0 : 1;
    //  console.log({ updatedOpacityValue });
    setStrockOpacity({ ...opacity, [dataKey]: updatedOpacityValue });
  };

  const HandelToggleReferenceDot = () => {
    setShowReferenceDot(!showReferenceDot);
  };

  return (
    <>
      <div style={{ width: "50%", height: 300 }} id="printThis">
        <ResponsiveContainer>
          <ComposedChart
            data={data}
            margin={{
              top: 20,
              right: 20,
              bottom: 20,
              left: 20,
            }}
          >
            <XAxis
              dataKey="name"
              //type="number" domain={[0, "dataMax + 1000"]}
              // ticks={["05/12", "05/14", "05/17"]}
            >
              <Label value="Time Stamp" offset={0} position="insideBottom" />
            </XAxis>
            <YAxis
            // label={{
            //   value: "Values",
            //   angle: -90,
            //   position: "insideLeft",
            // }}
            />
            <Legend
              iconType="plainline"
              onClick={handleOpacityEffect}
              style={{ cursor: "pointer" }}
            />
            <Tooltip content={<CustomTooltip />} />
            {showReferenceDot && renderShareDots}
            {/* <CartesianGrid stroke="#f5f5f5" /> */}
            {/* <defs>
            <linearGradient
              id="linear"
              x1="Page B"
              y1={2400}
              x2="Page G"
              y2={3800}
            >
              <stop offset="0%" stopColor="#05a" />
              <stop offset="100%" stopColor="#0a5" />
            </linearGradient>
          </defs> */}
            <defs>
              <linearGradient id="gradient" x1="0" y1="0" x2="100%" y2="0">
                <stop offset="30%" stopColor="black" />
                <stop offset="60%" stopColor="blue" />

                <stop offset="100%" stopColor="orange" />
              </linearGradient>
            </defs>
            {/* <ReferenceLine y={1500} /> */}

            {/* <Bar
            dataKey="c"
            //barSize={10}
          >
            {data.map(({ pv }, index) => {
              const updatefdPv = Array.isArray(pv) ? Math.max(...pv) : pv;
              return (
                <Cell
                  key={`cell-${index}`}
                  fill={updatefdPv < 2500 ? "#413ea0" : "#82ca9d"}
                />
              );
            })}
          </Bar> */}
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
              stroke="blue"
              dot={false}
              strokeOpacity={opacity.ideal}
            />
            <Line
              type="natural"
              dataKey="actual"
              strokeWidth={1.5}
              //fill="url(#linear)"
              strokeOpacity={opacity.actual}
              dot={false}
              stroke="black"
            />

            <Line
              type="monotoneX"
              dataKey="predicted"
              stroke="red"
              dot={false}
              strokeOpacity={opacity.actual}
              strokeDasharray="3 4 5 2"
            />
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
    </>
  );
};

const Prints = () => (
  // graph needs to be render but so we just place it outside of the view
  <div style={{ position: "absolute", left: 0, top: -500 }}>
    <div>
      <MovingAverage />
    </div>
  </div>
);

const CoursesTable: FC = (props: any) => {
  const headers = [
    { label: "Date", key: "name" },
    { label: "Ideal", key: "ideal" },
    { label: "Actual", key: "actual" },
    { label: "Predicted", key: "predicted" },
  ];

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

  const formatData = useMemo(() => {
    return data.map((value) => ({
      ...value,
      actual: value.predicted === value.actual ? null : value.actual,
    }));
  }, [data]);

  const dispatch = useDispatch();
  // const location = useLocation();
  useEffect(() => {
    dispatch(getAllCourses());
    dispatch(getAllAuthors());
  }, [dispatch]);

  const { all_authors } = useSelector((state: RootState) => state?.authors);
  const { all_courses, count } = useSelector(
    (state: RootState) => state?.courses
  );

  const getAuthorById = (authorId: number) => {
    return all_authors?.find(({ id }) => id === authorId)?.name;
  };

  const columns: IColumnType[] = [
    {
      key: "id",
      title: "Id",
    },
    {
      key: "title",
      title: "Title",
    },
    {
      key: "authorId",
      title: "Author",
      render: getAuthorById,
    },
    {
      key: "category",
      title: "Category",
      sortable: true,
      searchable: true,
      filterListing: [
        {
          text: "JavaScript",
          value: "JavaScript",
        },
        {
          text: "Career",
          value: "Career",
        },
      ],
    },
  ];

  return (
    <div style={{ padding: "20px" }}>
      {/* <LinearGraph /> */}
      {/* <Prints /> */}
      {/* 
      <a href="#" onClick={print}>
        {isDownloading ? `Downloading ...` : `Export Graph`}
      </a>
      <br />
      <PdfButton headers={headers} data={formatData} /> */}

      {/* {props.children && props.children}
      <a href="#" onClick={print}>
        {isDownloading ? `Downloading ...` : `Export Graph`}
      </a> */}
      {/* <Drawing /> */}
      {/* <SketchGraph data={createFakeData()} /> */}
      <CustomTable
        data={all_courses}
        columns={columns}
        dataType={"course"}
        getAction={getAllCourses}
        defaultSorting={{ key: "category", order: "ascend" }}
        serverSorting
        serverPagination
        enableCustomLimit
      />
    </div>
  );
};
export default CoursesTable;

{
  /* <LineChart
width={500}
height={500}
data={data}
margin={{
  top: 5,
  right: 30,
  left: 20,
  bottom: 5,
}}
>
<CartesianGrid strokeDasharray="1 1" />
<XAxis
  dataKey="name" //type="number" domain={[0, "dataMax + 1000"]}
>
  <Label
    value="Pages of my website"
    offset={0}
    position="insideBottom"
  />
</XAxis>
<YAxis
  label={{ value: "pv/uv of page", angle: -90, position: "insideLeft" }}
/>
<Tooltip />
{/* <Legend /> */
}
{
  /* <ReferenceDot
  xAxisId="number"
  cx={2500}
  cy={3800}
  alwaysShow={true}
  r={20}
  fill="red"
  stroke="none"
/> */
}
// {renderShareDots}
{
  /* <ReferenceDot x={"Page C"} y={2000} stroke="green" label="Min PAGE" /> */
}
{
  /* <ReferenceDot x={2000} y={3908} stroke="green" label="Min PAGE" /> */
}

{
  /* <Line
  type="monotone"
  dataKey="pv"
  stroke="#8884d8"
  activeDot={{
    onClick: (a, b) => console.log({ a, b }),
    stroke: "red",
    strokeWidth: 2,
    r: 10,
  }}
/>
<Line type="monotone" dataKey="uv" stroke="#82ca9d" />
</LineChart>  */
}
