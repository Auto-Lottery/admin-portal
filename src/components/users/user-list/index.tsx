"use client";
import React, { useCallback, useEffect, useState } from "react";
import { Badge } from "@mantine/core";
import dayjs from "dayjs";
import { User } from "@/types/user";
import { useClientRequest } from "@/contexts/client-request-context";
import { PaginationOption } from "@/types/pagination";
import CustomTable, { RowItemType } from "@/components/shared/table";
import { TableColumnConfig } from "@/types/table";
import { useRouter } from "next/navigation";

const UserList = ({
  filters,
}: {
  filters: Record<string, string | number>;
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const [userList, setUserList] = useState<User[]>([]);
  const { postRequest } = useClientRequest();
  const router = useRouter();
  const [totalRow, setTotalRow] = useState(0);
  const [pagination, setPagination] = useState<PaginationOption>({
    page: 1,
    pageSize: 15,
    total: 0,
    filtersData: {},
  });

  const getUserList = useCallback(
    async ({ page, pageSize, filtersData }: PaginationOption) => {
      const res = await postRequest(`/auth/admin/users`, {
        pagination: {
          page: page,
          pageSize: pageSize,
        },
        conditions: Object.keys(filtersData).map((key) => {
          return {
            field: key,
            value: filtersData[key],
            valueType: typeof filtersData[key],
            operator: key === "operator" ? "=" : "like",
          };
        }),
      });
      setUserList(res.userList);
      setTotalRow(res.total);
    },
    [postRequest]
  );

  useEffect(() => {
    if (isMounted) {
      getUserList(pagination);
    }
  }, [isMounted, getUserList, pagination]);

  useEffect(() => {
    setIsMounted(true);
    setPagination({
      page: 1,
      pageSize: 15,
      total: 0,
      filtersData: filters,
    });
  }, [filters]);

  const renderOperator = (user: User) => {
    if (user.operator === "MOBICOM") {
      return (
        <Badge
          color="red"
          style={{
            textTransform: "none",
          }}
        >
          Mobicom
        </Badge>
      );
    }
    if (user.operator === "UNITEL") {
      return (
        <Badge
          color="green"
          style={{
            textTransform: "none",
          }}
        >
          Unitel
        </Badge>
      );
    }
    if (user.operator === "GMOBILE") {
      return (
        <Badge
          color="#fdb913"
          style={{
            color: "black",
            textTransform: "none",
          }}
        >
          G-Mobile
        </Badge>
      );
    }
    if (user.operator === "SKYTEL") {
      return (
        <Badge
          color="white"
          style={{
            color: "#00359B",
            textTransform: "none",
          }}
        >
          SKYtel
        </Badge>
      );
    }
    if (user.operator === "ONDO") {
      return <Badge color="#ff0099">ONDO</Badge>;
    }
    return null;
  };

  const columnConfig: TableColumnConfig[] = [
    {
      label: "#",
      renderCell: (_, rowIndex) => {
        return (pagination.page - 1) * pagination.pageSize + rowIndex + 1;
      },
    },
    {
      label: "Утасны дугаар",
      renderCell: (rowData: RowItemType) => {
        return rowData?.phoneNumber;
      },
    },
    {
      label: "Оператор",
      renderCell: (rowData: RowItemType) => {
        return renderOperator(rowData as User);
      },
    },
    {
      label: "Бүртгүүлсэн огноо",
      renderCell: (rowData: RowItemType) => {
        return dayjs(rowData?.createdDate).format("YYYY-MM-DD HH:mm:ss");
      },
    },
  ];

  return (
    <CustomTable
      data={userList}
      columnConfig={columnConfig}
      rowKeyField="_id"
      pagination={{ ...pagination, total: totalRow }}
      setPagination={setPagination}
      onSelectRow={(rowData: RowItemType) => {
        router.push(`/users/${rowData?._id}/${rowData?.phoneNumber}`);
      }}
      highlightOnHover={true}
    />
  );
};

export default UserList;
