"use client";

import { ActionIcon, Badge, Group } from "@mantine/core";
import dayjs from "dayjs";
import React, { useCallback, useEffect, useState } from "react";
import { TbEdit } from "react-icons/tb";
import CustomTable from "@/components/shared/table";
import { useClientRequest } from "@/contexts/client-request-context";
import { PaginationOption } from "@/types/pagination";
import { RowItemType, TableColumnConfig } from "@/types/table";
import { Transaction } from "@/types/transaction";
import { moneyFormatter } from "@/utilities";

function TransactionList({
  filters,
}: {
  filters: Record<string, string | number>;
}) {
  const [listData, setListData] = useState<Transaction[]>([]);
  const { postRequest } = useClientRequest();
  const [totalRow, setTotalRow] = useState(0);
  const [isMounted, setIsMounted] = useState(false);
  const [pagination, setPagination] = useState<PaginationOption>({
    page: 1,
    pageSize: 20,
    total: 0,
    filtersData: {},
  });

  const getTransactionList = useCallback(
    async ({ page, pageSize, filtersData }: PaginationOption) => {
      const res = await postRequest(
        "/transaction/adminTransaction/getAllTransactions",
        {
          pagination: {
            page,
            pageSize,
          },
          conditions: Object.keys(filtersData).map((key) => ({
            field: key,
            value: filtersData[key],
            valueType: typeof filtersData[key],
            operator: key === "status" ? "=" : "like",
          })),
        }
      );
      setListData(res.listData);
      setTotalRow(res.total);
    },
    [postRequest]
  );

  useEffect(() => {
    if (isMounted) {
      getTransactionList(pagination);
    }
  }, [isMounted, getTransactionList, pagination]);

  useEffect(() => {
    setIsMounted(true);
    setPagination({
      page: 1,
      pageSize: 20,
      total: 0,
      filtersData: filters,
    });
  }, [filters]);

  const renderStatus = (status: string) => {
    switch (status) {
      case "COMPLETE":
        return <Badge color="green">Амжилттай</Badge>;
      case "FAILED":
        return <Badge color="red">Амжилтгүй</Badge>;
      default:
        return <Badge color="orange">Хүлээгдэж байна</Badge>;
    }
  };

  const columnConfig: TableColumnConfig[] = [
    {
      label: "#",
      renderCell: (_, rowIndex: number) =>
        (pagination.page - 1) * pagination.pageSize + rowIndex + 1,
    },
    {
      label: "Гүйлгээний ID",
      renderCell: (rowData: RowItemType) => rowData?._id,
    },
    {
      label: "Дүн",
      renderCell: (rowData: RowItemType) =>
        `${moneyFormatter(rowData?.amount as number, 0, 2)} ₮`,
    },
    {
      label: "Гүйлгээний утга",
      renderCell: (rowData: RowItemType) => rowData?.tranDescription,
    },
    {
      label: "Төлөв",
      renderCell: (rowData: RowItemType) =>
        renderStatus(rowData?.status as string),
    },
    {
      label: "Тайлбар",
      renderCell: (rowData: RowItemType) => rowData?.description,
    },
    {
      label: "Гүйлгээний огноо",
      renderCell: (rowData: RowItemType) =>
        dayjs(rowData?.transactionDate).format("YYYY-MM-DD HH:mm:ss"),
    },
    {
      label: "Үйлдэл",
      renderCell: (rowData: RowItemType) =>
        rowData?.status === "FAILED" ? (
          <Group>
            <ActionIcon>
              <TbEdit />
            </ActionIcon>
          </Group>
        ) : null,
    },
  ];

  return (
    <CustomTable
      data={listData}
      columnConfig={columnConfig}
      rowKeyField="_id"
      pagination={{ ...pagination, total: totalRow }}
      setPagination={setPagination}
    />
  );
}

export default TransactionList;
