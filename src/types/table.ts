export type TableColumnData = {
  label?: string;
  value?: string | number;
  renderCell: (rowData: any) => React.ReactNode;
};
