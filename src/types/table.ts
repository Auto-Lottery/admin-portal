import React from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type RowItemType = Record<string, any> | undefined;

export type TableColumnConfig = {
  label?: string;
  value?: string | number;
  renderCell: (rowData: RowItemType, rowIndex: number) => React.ReactNode;
};
