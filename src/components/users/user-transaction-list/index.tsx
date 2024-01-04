"use client";

import CustomTable from "@/components/shared/table";
import { useClientRequest } from "@/contexts/client-request-context";
import { PaginationOption } from "@/types/pagination";
import { RowItemType, TableColumnConfig } from "@/types/table";
import { Transaction } from "@/types/transaction";
import { moneyFormatter } from "@/utilities";
import dayjs from "dayjs";
import React, { useCallback, useEffect, useState } from "react";

function UserTransactionList({
  userData,
}: {
  userData: { userId: string; phoneNumber: string };
}) {
  const [listData, setListData] = useState<Transaction[]>([]);
  const { getRequest } = useClientRequest();
  const [totalRow, setTotalRow] = useState(0);
  const [pagination, setPagination] = useState<PaginationOption>({
    page: 1,
    pageSize: 20,
    total: 0,
    filtersData: {}
  });

  const getTransactionList = useCallback(
    async (page: number, pageSize: number) => {
      const res = await getRequest(
        `/transaction/adminTransaction/getUserTransactions?page=${page}&pageSize=${pageSize}&phoneNumber=${userData.phoneNumber}`
      );
      setListData(res.listData);
      setTotalRow(res.total);
    },
    [getRequest, userData]
  );

  useEffect(() => {
    getTransactionList(pagination.page, pagination.pageSize);
  }, [getTransactionList, pagination]);

  const columnConfig: TableColumnConfig[] = [
    {
      label: "#",
      renderCell: (_, rowIndex: number) => (pagination.page - 1) * pagination.pageSize + rowIndex + 1,
    },
    {
      label: "Гүйлгээний ID",
      renderCell: (rowData: RowItemType) => rowData?._id,
    },
    {
      label: "Дүн",
      renderCell: (rowData: RowItemType) => `${moneyFormatter(rowData?.amount, 0, 2)} ₮`,
    },
    {
      label: "Гүйлгээний утга",
      renderCell: (rowData: RowItemType) => rowData?.tranDescription,
    },
    {
      label: "Гүйлгээний огноо",
      renderCell: (rowData: RowItemType) => dayjs(rowData?.transactionDate).format("YYYY-MM-DD HH:mm:ss"),
    },
  ];

  return (
    <CustomTable
      data={listData}
      columnConfig={columnConfig}
      rowKeyField="_id"
      pagination={{ ...pagination, total: totalRow }}
      setPagination={setPagination}
    // onSelectRow={(rowData: RowItemType) => {
    //     router.push(`/users/${rowData?._id}/${rowData?.phoneNumber}`);
    // }}
    />
  );
}

export default UserTransactionList;
