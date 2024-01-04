import { RowItemType } from "@/components/shared/table";

export type TableColumnConfig = {
  label?: string;
  value?: string | number;
  renderCell: (rowData: RowItemType, rowIndex: number) => React.ReactNode;
};
