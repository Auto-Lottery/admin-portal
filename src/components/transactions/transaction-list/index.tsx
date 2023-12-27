"use client";
import CustomTable, { RowItemType } from '@/components/shared/table';
import { useClientRequest } from '@/contexts/client-request-context';
import { PaginationOption } from '@/types/pagination';
import { TableColumnConfig } from '@/types/table';
import { Transaction } from '@/types/transaction';
import { moneyFormatter } from '@/utilities';
import { ActionIcon, Badge, Group } from '@mantine/core';
import dayjs from 'dayjs'
import React, { useCallback, useEffect, useState } from 'react'
import { TbEdit } from 'react-icons/tb';

const TransactionList = () => {

    const [listData, setListData] = useState<Transaction[]>([]);
    const { postRequest } = useClientRequest();
    const [totalRow, setTotalRow] = useState(0);
    const [pagination, setPagination] = useState<PaginationOption>({
        page: 1,
        pageSize: 20,
        total: 0
    })

    const getTransactionList = useCallback(async (page: number, pageSize: number) => {
        const res = await postRequest(`/transaction/adminTransaction/getAllTransactions`, {
            "pagination": {
                "page": page,
                "pageSize": pageSize
            }
        });
        setListData(res.listData);
        setTotalRow(res.total);
    }, [postRequest]);

    useEffect(() => {
        getTransactionList(pagination.page, pagination.pageSize)
    }, [getTransactionList, pagination]);

    const renderStatus = (status: string) => {
        switch (status) {
            case "COMPLETE":
                return <Badge color="green">Амжилттай</Badge>
            case "FAILED":
                return <Badge color="red">Амжилтгүй</Badge>
            default:
                return <Badge color="orange">Хүлээгдэж байна</Badge>
        }
    }

    const columnConfig: TableColumnConfig[] = [
        {
            label: "#",
            renderCell: (_, rowIndex: number) => {
                return (pagination.page - 1) * pagination.pageSize + rowIndex + 1
            },
        }, {
            label: "Гүйлгээний ID",
            renderCell: (rowData: RowItemType) => {
                return rowData?._id;
            },
        }, {
            label: "Дүн",
            renderCell: (rowData: RowItemType) => {
                return `${moneyFormatter(rowData?.amount, 0, 2)} ₮`
            },
        }, {
            label: "Гүйлгээний утга",
            renderCell: (rowData: RowItemType) => {
                return rowData?.tranDescription
            },
        }, {
            label: "Төлөв",
            renderCell: (rowData: RowItemType) => {
                return renderStatus(rowData?.status)
            },
        }, {
            label: "Тайлбар",
            renderCell: (rowData: RowItemType) => {
                return rowData?.description
            },
        }, {
            label: "Гүйлгээний огноо",
            renderCell: (rowData: RowItemType) => {
                return dayjs(rowData?.transactionDate).format("YYYY-MM-DD HH:mm:ss")
            },
        }, {
            label: "Үйлдэл",
            renderCell: (rowData: RowItemType) => {
                return rowData?.status === "FAILED" ? <Group>
                    <ActionIcon><TbEdit /></ActionIcon>
                </Group> : null
            },
        }
    ];

    return (
        <CustomTable
            data={listData}
            columnConfig={columnConfig}
            rowKeyField='_id'
            pagination={{ ...pagination, total: totalRow }}
            setPagination={setPagination}
        // onSelectRow={(rowData: RowItemType) => {
        //     router.push(`/users/${rowData?._id}/${rowData?.phoneNumber}`);
        // }}
        />
    )
}

export default TransactionList