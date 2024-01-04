"use client";

import React, { useCallback, useEffect, useState } from "react";
import { Badge, Group } from "@mantine/core";
import dayjs from "dayjs";
import CustomTable from "@/components/shared/table";
import { useClientRequest } from "@/contexts/client-request-context";
import { PaginationOption } from "@/types/pagination";
import { RowItemType, TableColumnConfig } from "@/types/table";
import { AdminUser, User } from "@/types/user";

function AdminUserList({
    filters,
}: {
    filters: Record<string, string | number>;
}) {
    const [isMounted, setIsMounted] = useState(false);
    const [userList, setUserList] = useState<AdminUser[]>([]);
    const { postRequest } = useClientRequest();
    const [totalRow, setTotalRow] = useState(0);
    const [pagination, setPagination] = useState<PaginationOption>({
        page: 1,
        pageSize: 15,
        total: 0,
        filtersData: {},
    });

    const getUserList = useCallback(
        async ({ page, pageSize, filtersData }: PaginationOption) => {
            const res = await postRequest(`/auth/admin/adminUsers`, {
                pagination: {
                    page,
                    pageSize,
                },
                conditions: Object.keys(filtersData).map((key) => ({
                    field: key,
                    value: filtersData[key],
                    valueType: typeof filtersData[key],
                    operator: key === "operator" ? "=" : "like",
                })),
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
                    Skytel
                </Badge>
            );
        }
        if (user.operator === "ONDO") {
            return <Badge color="#ff0099">ONDO</Badge>;
        }
        if (user.operator === "SYSTEM") {
            return <Badge color="blue">SYSTEM</Badge>;
        }
        return null;
    };

    const columnConfig: TableColumnConfig[] = [
        {
            label: "#",
            renderCell: (_, rowIndex) => (pagination.page - 1) * pagination.pageSize + rowIndex + 1,
        },
        {
            label: "Утасны дугаар",
            renderCell: (rowData: RowItemType) => rowData?.phoneNumber,
        },
        {
            label: "Оператор",
            renderCell: (rowData: RowItemType) => renderOperator(rowData as User),
        },
        {
            label: "Үүрэг",
            renderCell: (rowData: RowItemType) => <Group gap="sm">
                {rowData?.roles.map((role: string, index: number) => <Badge variant="outline" color="indigo" key={`role_${index}`}>{role}</Badge>)
                }
            </Group>,
        },
        {
            label: "Төлөв",
            renderCell: (rowData: RowItemType) => {
                if (rowData?.status === "ACTIVE")
                    return <Badge variant="dot" color="green">Идэвхитэй</Badge>
                return <Badge variant="dot" color="red">Блоклосон</Badge>
            },
        },
        {
            label: "Бүртгүүлсэн огноо",
            renderCell: (rowData: RowItemType) => dayjs(rowData?.createdDate).format("YYYY-MM-DD HH:mm:ss"),
        }
    ];

    return (
        <CustomTable
            data={userList}
            columnConfig={columnConfig}
            rowKeyField="_id"
            pagination={{ ...pagination, total: totalRow }}
            setPagination={setPagination}
            highlightOnHover={false}
        />
    );
}

export default AdminUserList;
