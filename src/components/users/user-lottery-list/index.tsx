"use client";
import React, { useCallback, useEffect, useState } from 'react'
import dayjs from 'dayjs'
import { User } from '@/types/user';
import { useClientRequest } from '@/contexts/client-request-context';
import { PaginationOption } from '@/types/pagination';
import CustomTable, { RowItemType } from '@/components/shared/table';
import { TableColumnConfig } from '@/types/table';
import { Badge } from '@mantine/core';

const UserLotteryList = ({ userId }: { userId: string }) => {

    const [userLotteryList, setUserLotteryList] = useState<User[]>([]);
    const { postRequest } = useClientRequest();
    const [totalRow, setTotalRow] = useState(0);
    const [pagination, setPagination] = useState<PaginationOption>({
        page: 1,
        pageSize: 10,
        total: 0
    })

    const getUserList = useCallback(async (page: number, pageSize: number) => {
        const res = await postRequest(`/generator/lottery/userLotteryList`, {
            "conditions": [{
                "operator": "=",
                "value": userId,
                "valueType": "string",
                "field": "userId"
            }],
            "pagination": {
                "page": page,
                "pageSize": pageSize
            }
        });
        setUserLotteryList(res.userLotteryList);
        setTotalRow(res.total);
    }, [postRequest]);

    useEffect(() => {
        getUserList(pagination.page, pagination.pageSize)
    }, [getUserList, pagination]);

    const columnConfig: TableColumnConfig[] = [
        {
            label: "#",
            renderCell: (_, rowIndex) => {
                return (pagination.page - 1) * pagination.pageSize + rowIndex + 1
            },
        }, {
            label: "Тохиролын дугаар",
            renderCell: (rowData: RowItemType) => {
                return `${rowData?.tohirol?.tohirolNumber}-р тохирол`
            },
        }, {
            label: "Cерийн дугаар",
            renderCell: (rowData: RowItemType) => {
                return rowData?.seriesNumberStr;
            },
        }, {
            label: "Гүйлгээний ID",
            renderCell: (rowData: RowItemType) => {
                return rowData?.transactionId
            },
        }, {
            label: "Төлөв",
            renderCell: (rowData: RowItemType) => {
                return rowData?.tohirol?.isActive ? <Badge color='green'>Идэвхитэй</Badge> : <Badge color='grey'>Идэвхигүй</Badge>
            },
        }, {
            label: "Үүссэн огноо",
            renderCell: (rowData: RowItemType) => {
                return dayjs(rowData?.createdDate).format("YYYY-MM-DD HH:mm:ss")
            },
        }
    ];

    return (
        <CustomTable
            data={userLotteryList}
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

export default UserLotteryList