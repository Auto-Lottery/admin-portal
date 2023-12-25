export type TableColumnConfig = {
  label?: string;
  value?: string | number;
  renderCell: (rowData: any) => React.ReactNode;
};
