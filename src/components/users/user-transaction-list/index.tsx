"use client";
import CustomTable, { RowItemType } from "@/components/shared/table";
import { useClientRequest } from "@/contexts/client-request-context";
import { PaginationOption } from "@/types/pagination";
import { TableColumnConfig } from "@/types/table";
import { Transaction } from "@/types/transaction";
import { moneyFormatter } from "@/utilities";
import dayjs from "dayjs";
import React, { useCallback, useEffect, useState } from "react";

const UserTransactionList = ({
  userData,
}: {
  userData: { userId: string; phoneNumber: string };
}) => {
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
    [getRequest]
  );

  useEffect(() => {
    getTransactionList(pagination.page, pagination.pageSize);
  }, [getTransactionList, pagination]);

  const columnConfig: TableColumnConfig[] = [
    {
      label: "#",
      renderCell: (_, rowIndex: number) => {
        return (pagination.page - 1) * pagination.pageSize + rowIndex + 1;
      },
    },
    {
      label: "Гүйлгээний ID",
      renderCell: (rowData: RowItemType) => {
        return rowData?._id;
      },
    },
    {
      label: "Дүн",
      renderCell: (rowData: RowItemType) => {
        return `${moneyFormatter(rowData?.amount, 0, 2)} ₮`;
      },
    },
    {
      label: "Гүйлгээний утга",
      renderCell: (rowData: RowItemType) => {
        return rowData?.tranDescription;
      },
    },
    {
      label: "Гүйлгээний огноо",
      renderCell: (rowData: RowItemType) => {
        return dayjs(rowData?.transactionDate).format("YYYY-MM-DD HH:mm:ss");
      },
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
};

export default UserTransactionList;
