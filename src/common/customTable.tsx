import React, { useState, useCallback, useEffect } from "react";
import { Button, Table, Space, Input, Select } from "antd";
import queryString from "query-string";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";
import { useHistory, useLocation } from "react-router";
import { ColumnProps } from "antd/lib/table";
import { isEmpty } from "../utils/functions";
import { IColumnType } from "../models/columnTypes";
import { useDispatch } from "react-redux";

type serverPagination = {
  getAction: (params: string) => void;
  serverPagination: boolean;
  count: number;
  enableCustomLimit?: boolean;
  pageSize?: number;
};


type serverSorting = {
  getAction: (params: string) => void;
  serverSorting: boolean;
  defaultSorting?: { key: string; order: "ascend" | "descend" };
};

type clientPagination = {
  clientPagination: boolean;
  enableCustomLimit?: boolean;
  pageSize?: number;
};

type noPagination = {
  enablePagination: false;
};
type commonProp = {
  columns: IColumnType[];
  data: any;
  dataType?: any;
  //[key: string]: any;
};

type listingProp = clientPagination | serverPagination | serverSorting | noPagination;

type propTypes = commonProp & listingProp;

const CustomTable = ({ columns, data, dataType, ...rest }: propTypes) => {
  let searchInput: any = undefined;

  console.log({ dataType });
  const history = useHistory();

  const {
    getAction,
    defaultSorting,
    serverPagination,
    clientPagination,
    enableCustomLimit,
    serverSorting,
    pageSize,
    count,
  }: any = rest;

  const serverSidePagination = serverPagination;
  const clientSidePagination = clientPagination;

  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: pageSize ?? 10,
  });

  const [sorting, setSorting] = useState(
    defaultSorting ?? {
      key: "id",
      order: "ascend",
    }
  );

  const generateQueryString = useCallback(
    (pagination, sorting) => {
      const query: any = {};
      if (serverSidePagination) {
        const { current, pageSize } = pagination;
        query._page = current;
        query._limit = pageSize;
      }
      if (serverSorting) {
        const { key, order } = sorting;
        query._sort = key;
        query._order = order === "ascend" ? "asc" : "desc";
      }
      const generatedQuery = !isEmpty(query)
        ? `?${queryString.stringify(query)}`
        : ``;

      history.push(`${history.location.pathname}${generatedQuery}`);
    },
    [serverSidePagination, serverSorting, history]
  );

  useEffect(() => {
    generateQueryString(pagination, sorting);
  }, []);

  const location = useLocation();
  const dispatch = useDispatch();
  useEffect(() => {
    getAction && dispatch(getAction(location.search));
  }, [location, dispatch]);

  console.log({ sorting });

  const getColumns = (columns: IColumnType[]): ColumnProps<typeof dataType>[] =>
    columns
      .filter(({ hidden }) => !hidden)
      .map((column: IColumnType) => {
        const renderedColumn: any = {};

        const keyProperty = column.key;

        renderedColumn.title = column.title;
        // renderedColumn.dataIndex = keyProperty;
        renderedColumn.dataIndex = keyProperty;
        if (column.render) renderedColumn.render = column.render;
        if (column.width) renderedColumn.width = column.width;
        if (column.className) renderedColumn.className = column.className;
        if (column.sortable) {
          if (serverSorting) {
            renderedColumn.sortDirections = ["ascend", "descend", "ascend"];
            renderedColumn.sorter = true;
            if (sorting.key === keyProperty) {
              renderedColumn.sortOrder = sorting.order;
            }
          } else {
            renderedColumn.sorter = (a: any, b: any) =>
              a[keyProperty] > b[keyProperty] ? 1 : -1;
          }
        }
        if (column.filterListing) {
          renderedColumn.onFilter = (value: any, record: any) =>
            record[keyProperty] === value;
          renderedColumn.filters = column.filterListing;
        }

        return {
          ...column,
          ...renderedColumn,
          ...(column.searchable && getColumnSearchProps(column.key)),
        };
      });

  const onTablePropChange = (
    paginationProp: any,
    filters: any,
    sorter: any,
    extra: any
  ) => {
    const updateSorting = { key: sorter.field, order: sorter.order };

    const shouldUpdateSorting =
      serverSorting &&
      JSON.stringify(sorting) !== JSON.stringify(updateSorting);
    shouldUpdateSorting && setSorting(updateSorting);

    const shouldUpdatePagination =
      serverSidePagination &&
      JSON.stringify(paginationProp) !== JSON.stringify(pagination);
    shouldUpdatePagination && setPagination(paginationProp);

    if (shouldUpdatePagination || shouldUpdateSorting) {
      generateQueryString(paginationProp, updateSorting);
    }
  };

  const handleChangeLimit = (pageSize: any) => {
    let calculateCurrentPage =
      pageSize * pagination.current > (count as number)
        ? Math.ceil((count as number) / pageSize)
        : pagination.current;

    const updatedPaginationLimit = {
      ...pagination,
      current: calculateCurrentPage,
      pageSize,
    };
    if (enableCustomLimit) {
      generateQueryString(updatedPaginationLimit, sorting);
      setPagination(updatedPaginationLimit);
    }
  };

  const limits = ["5", "10", "20"];

  const getColumnSearchProps = (dataIndex: any) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }: any) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={(node) => {
            searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: any) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value: any, record: any) =>
      record[dataIndex]
        ? record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase())
        : "",
    onFilterDropdownVisibleChange: (visible: any) => {
      if (visible) {
        setTimeout(() => searchInput.select(), 100);
      }
    },
    render: (text: any) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const handleSearch = (selectedKeys: any, confirm: any, dataIndex: any) => {
    confirm();
    setSearchedColumn(dataIndex);
    setSearchText(selectedKeys[0]);
  };

  const handleReset = (clearFilters: any) => {
    clearFilters();
    setSearchText("");
  };

  const tablePaginationConfig = serverSidePagination
    ? { ...pagination, total: count }
    : false;

  console.log({ pagination });
  return (
    <>
      <Table
        columns={getColumns(columns)}
        dataSource={data}
        pagination={
          clientSidePagination
            ? {
                position: ["bottomLeft"],
                showSizeChanger: !!enableCustomLimit,
                pageSize: pageSize ?? 10,
              }
            : tablePaginationConfig
        }
        onChange={onTablePropChange}
        {...rest}
      />
      {enableCustomLimit && serverSidePagination ? (
        <Select
          placeholder="select value"
          value={pagination.pageSize}
          onChange={handleChangeLimit}
        >
          {limits?.map((limit) => (
            <Select.Option value={limit}>{limit}</Select.Option>
          ))}
        </Select>
      ) : null}
    </>
  );
};

export default React.memo(CustomTable);


// import React, { useState, useCallback, useEffect } from "react";
// import { Button, Table, Space, Input, Select } from "antd";
// import queryString from "query-string";
// import Highlighter from "react-highlight-words";
// import { SearchOutlined } from "@ant-design/icons";
// import { useHistory, useLocation } from "react-router";
// import { ColumnProps } from "antd/lib/table";
// import { isEmpty } from "../utils/functions";
// import { IColumnType } from "../models/columnTypes";
// import { useDispatch } from "react-redux";

// type serverPagination = {
//   getAction: (params: string) => void;
//   enablePagination: "server";
//   count: number;
//   enableCustomLimit?: boolean;
//   pageSize?: number;
// };


// type serverSorting = {
//   getAction: (params: string) => void;
//   serverSorting: boolean;
//   defaultSorting?: { key: string; order: "ascend" | "descend" };
// };

// type clientPagination = {
//   enablePagination: "client";
//   enableCustomLimit?: boolean;
//   pageSize?: number;
// };

// type noPagination = {
//   enablePagination: false;
// };
// type commonProp = {
//   columns: IColumnType[];
//   data: any;
//   dataType?: any;
//   //[key: string]: any;
// };

// type listingProp = clientPagination | serverPagination | serverSorting | noPagination;

// type propTypes = commonProp & listingProp;

// const CustomTable = ({ columns, data, dataType, ...rest }: propTypes) => {
//   let searchInput: any = undefined;

//   console.log({ dataType });
//   const history = useHistory();

//   const {
//     getAction,
//     defaultSorting,
//     enablePagination,
//     enableCustomLimit,
//     serverSorting,
//     pageSize,
//     count,
//   }: any = rest;

//   const serverSidePagination = enablePagination === "server";
//   const clientSidePagination = enablePagination === "client";

//   const [searchText, setSearchText] = useState("");
//   const [searchedColumn, setSearchedColumn] = useState("");
//   const [pagination, setPagination] = useState({
//     current: 1,
//     pageSize: pageSize ?? 10,
//   });

//   const [sorting, setSorting] = useState(
//     defaultSorting ?? {
//       key: "id",
//       order: "ascend",
//     }
//   );

//   const generateQueryString = useCallback(
//     (pagination, sorting) => {
//       const query: any = {};
//       if (serverSidePagination) {
//         const { current, pageSize } = pagination;
//         query._page = current;
//         query._limit = pageSize;
//       }
//       if (serverSorting) {
//         const { key, order } = sorting;
//         query._sort = key;
//         query._order = order === "ascend" ? "asc" : "desc";
//       }
//       const generatedQuery = !isEmpty(query)
//         ? `?${queryString.stringify(query)}`
//         : ``;

//       history.push(`${history.location.pathname}${generatedQuery}`);
//     },
//     [serverSidePagination, serverSorting, history]
//   );

//   useEffect(() => {
//     generateQueryString(pagination, sorting);
//   }, []);

//   const location = useLocation();
//   const dispatch = useDispatch();
//   useEffect(() => {
//     getAction && dispatch(getAction(location.search));
//   }, [location, dispatch]);

//   console.log({ sorting });

//   const getColumns = (columns: IColumnType[]): ColumnProps<typeof dataType>[] =>
//     columns
//       .filter(({ hidden }) => !hidden)
//       .map((column: IColumnType) => {
//         const renderedColumn: any = {};

//         const keyProperty = column.key;

//         renderedColumn.title = column.title;
//         // renderedColumn.dataIndex = keyProperty;
//         renderedColumn.dataIndex = keyProperty;
//         if (column.render) renderedColumn.render = column.render;
//         if (column.width) renderedColumn.width = column.width;
//         if (column.className) renderedColumn.className = column.className;
//         if (column.sortable) {
//           if (serverSorting) {
//             renderedColumn.sortDirections = ["ascend", "descend", "ascend"];
//             renderedColumn.sorter = true;
//             if (sorting.key === keyProperty) {
//               renderedColumn.sortOrder = sorting.order;
//             }
//           } else {
//             renderedColumn.sorter = (a: any, b: any) =>
//               a[keyProperty] > b[keyProperty] ? 1 : -1;
//           }
//         }
//         if (column.filter) {
//           renderedColumn.onFilter = (value: any, record: any) =>
//             record[keyProperty] === value;
//           renderedColumn.filters = column.filterListing;
//         }

//         return {
//           ...column,
//           ...renderedColumn,
//           ...(column.searchable && getColumnSearchProps(column.key)),
//         };
//       });

//   const onTablePropChange = (
//     paginationProp: any,
//     filters: any,
//     sorter: any,
//     extra: any
//   ) => {
//     const updateSorting = { key: sorter.field, order: sorter.order };

//     const shouldUpdateSorting =
//       serverSorting &&
//       JSON.stringify(sorting) !== JSON.stringify(updateSorting);
//     shouldUpdateSorting && setSorting(updateSorting);

//     const shouldUpdatePagination =
//       serverSidePagination &&
//       JSON.stringify(paginationProp) !== JSON.stringify(pagination);
//     shouldUpdatePagination && setPagination(paginationProp);

//     if (shouldUpdatePagination || shouldUpdateSorting) {
//       generateQueryString(paginationProp, updateSorting);
//     }
//   };

//   const handleChangeLimit = (pageSize: any) => {
//     let calculateCurrentPage =
//       pageSize * pagination.current > (count as number)
//         ? Math.ceil((count as number) / pageSize)
//         : pagination.current;

//     const updatedPaginationLimit = {
//       ...pagination,
//       current: calculateCurrentPage,
//       pageSize,
//     };
//     if (enableCustomLimit) {
//       generateQueryString(updatedPaginationLimit, sorting);
//       setPagination(updatedPaginationLimit);
//     }
//   };

//   const limits = ["5", "10", "20"];

//   const getColumnSearchProps = (dataIndex: any) => ({
//     filterDropdown: ({
//       setSelectedKeys,
//       selectedKeys,
//       confirm,
//       clearFilters,
//     }: any) => (
//       <div style={{ padding: 8 }}>
//         <Input
//           ref={(node) => {
//             searchInput = node;
//           }}
//           placeholder={`Search ${dataIndex}`}
//           value={selectedKeys[0]}
//           onChange={(e) =>
//             setSelectedKeys(e.target.value ? [e.target.value] : [])
//           }
//           onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
//           style={{ width: 188, marginBottom: 8, display: "block" }}
//         />
//         <Space>
//           <Button
//             type="primary"
//             onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
//             icon={<SearchOutlined />}
//             size="small"
//             style={{ width: 90 }}
//           >
//             Search
//           </Button>
//           <Button
//             onClick={() => handleReset(clearFilters)}
//             size="small"
//             style={{ width: 90 }}
//           >
//             Reset
//           </Button>
//         </Space>
//       </div>
//     ),
//     filterIcon: (filtered: any) => (
//       <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
//     ),
//     onFilter: (value: any, record: any) =>
//       record[dataIndex]
//         ? record[dataIndex]
//             .toString()
//             .toLowerCase()
//             .includes(value.toLowerCase())
//         : "",
//     onFilterDropdownVisibleChange: (visible: any) => {
//       if (visible) {
//         setTimeout(() => searchInput.select(), 100);
//       }
//     },
//     render: (text: any) =>
//       searchedColumn === dataIndex ? (
//         <Highlighter
//           highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
//           searchWords={[searchText]}
//           autoEscape
//           textToHighlight={text ? text.toString() : ""}
//         />
//       ) : (
//         text
//       ),
//   });

//   const handleSearch = (selectedKeys: any, confirm: any, dataIndex: any) => {
//     confirm();
//     setSearchedColumn(dataIndex);
//     setSearchText(selectedKeys[0]);
//   };

//   const handleReset = (clearFilters: any) => {
//     clearFilters();
//     setSearchText("");
//   };

//   const tablePaginationConfig = serverSidePagination
//     ? { ...pagination, total: count }
//     : false;

//   console.log({ pagination });
//   return (
//     <>
//       <Table
//         columns={getColumns(columns)}
//         dataSource={data}
//         pagination={
//           clientSidePagination
//             ? {
//                 position: ["bottomLeft"],
//                 showSizeChanger: !!enableCustomLimit,
//                 pageSize: pageSize ?? 10,
//               }
//             : tablePaginationConfig
//         }
//         onChange={onTablePropChange}
//         {...rest}
//       />
//       {enableCustomLimit && serverSidePagination ? (
//         <Select
//           placeholder="select value"
//           value={pagination.pageSize}
//           onChange={handleChangeLimit}
//         >
//           {limits?.map((limit) => (
//             <Select.Option value={limit}>{limit}</Select.Option>
//           ))}
//         </Select>
//       ) : null}
//     </>
//   );
// };

// export default React.memo(CustomTable);
