// interface filterColumnType {
//   filter: boolean;
//   filterListing?: any[];
// }



export interface IColumnType {
  title: string;
  key: string | number;
  hidden?: boolean;
  width?: number;
  className?: string;
  render?: any;
  sortable?: boolean;
  searchable?: boolean;
  // filter?: boolean;
  filterListing?: any[];
  //   [key: string]: any;
}
