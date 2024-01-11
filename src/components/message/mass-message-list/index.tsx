import CustomTable from "@/components/shared/table";
import { useClientRequest } from "@/contexts/client-request-context";
import { Message } from "@/types/message";
import { PaginationOption } from "@/types/pagination";
import { RowItemType, TableColumnConfig } from "@/types/table";
import { Badge } from "@mantine/core";
import dayjs from "dayjs";
import React, { useCallback, useEffect, useState } from "react";

function MassMessageList({
    filters,
}: {
    filters: Record<string, string | number>;
}) {

    const [isMounted, setIsMounted] = useState(false);
    const [messageList, setMessageList] = useState<Message[]>([]);
    const { postRequest } = useClientRequest();
    const [totalRow, setTotalRow] = useState(0);
    const [pagination, setPagination] = useState<PaginationOption>({
        page: 1,
        pageSize: 15,
        total: 0,
        filtersData: {},
    });

    const getMessageList = useCallback(
        async ({ page, pageSize, filtersData }: PaginationOption) => {
            const res = await postRequest(`/message/sms/getSmsList?type=MASS`, {
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
            setMessageList(res.smsList);
            setTotalRow(res.total);
        },
        [postRequest]
    );

    useEffect(() => {
        if (isMounted) {
            getMessageList(pagination);
        }
    }, [isMounted, getMessageList, pagination]);

    useEffect(() => {
        setIsMounted(true);
        setPagination({
            page: 1,
            pageSize: 15,
            total: 0,
            filtersData: filters,
        });
    }, [filters]);

    const renderOperator = (operator: string) => {
        if (operator === "MOBICOM") {
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
        if (operator === "UNITEL") {
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
        if (operator === "GMOBILE") {
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
        if (operator === "SKYTEL") {
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
        if (operator === "ONDO") {
            return <Badge color="#ff0099">ONDO</Badge>;
        }
        if (operator === "SYSTEM") {
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
            label: "Оператор",
            renderCell: (rowData: RowItemType) => renderOperator(rowData?.operator),
        },
        {
            label: "Нйит мессеж",
            renderCell: (rowData: RowItemType) => rowData?.toNumbersCount,
        },
        {
            label: "Амжилттай мессеж",
            renderCell: (rowData: RowItemType) => rowData?.successNumbersCount,
        },
        {
            label: "Амжилтгүй мессеж",
            renderCell: (rowData: RowItemType) => rowData?.failedNumbersCount,
        },
        {
            label: "Бүртгүүлсэн огноо",
            renderCell: (rowData: RowItemType) => dayjs(rowData?.createdDate).format("YYYY-MM-DD HH:mm:ss"),
        }
    ];

    return (
        <CustomTable
            data={messageList}
            columnConfig={columnConfig}
            rowKeyField="_id"
            pagination={{ ...pagination, total: totalRow }}
            setPagination={setPagination}
        />
    );;
}

export default MassMessageList;
