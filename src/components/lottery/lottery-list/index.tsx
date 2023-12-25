"use client";
import React, { useCallback, useEffect, useState } from 'react'
import { Badge, Code, Group } from '@mantine/core'
import { OrderedLottery } from '@/types/ordered-lottery';
import { PaginationOption } from '@/types/pagination';
import { TableColumnConfig } from '@/types/table';
import CustomTable, { RowItemType } from '@/components/shared/table';
import { useClientRequest } from '@/contexts/client-request-context';

const LotteryList = () => {

    const [orderedLotteryList, setOrderedLotteryList] = useState<OrderedLottery[]>([]);
    const { getRequest } = useClientRequest();
    const [totalRow, setTotalRow] = useState(0);
    const [pagination, setPagination] = useState<PaginationOption>({
        page: 1,
        pageSize: 10,
        total: 0
    })

    const getLotteryList = useCallback(async (page: number, pageSize: number) => {
        const res = await getRequest(`/generator/lottery/list?page=${page}&pageSize=${pageSize}`);
        setOrderedLotteryList(res.lotteryList);
        setTotalRow(res.total);
    }, [getRequest]);

    useEffect(() => {
        getLotteryList(pagination.page, pagination.pageSize)
    }, [getLotteryList, pagination]);

    const columnConfig: TableColumnConfig[] = [
        {
            label: "Тохиролын дугаар",
            renderCell: (rowData: RowItemType) => {
                return <div>{rowData?.tohirol?.tohirolNumber}</div>
            },
        }, {
            label: "Сугалааны дугаар",
            renderCell: (rowData: RowItemType) => {
                return <Group>
                    {/* <TbChevronRight style={{
                    transform: `rotate(${isOpenRow ? 90 : 0}deg)`,
                    transition: "all 0.2s ease"
                }} /> */}
                    <Code fz={14}>{rowData?.lotteryNumber}</Code></Group>
            },
        }, {
            label: "Төлөв",
            renderCell: (rowData: RowItemType) => {
                return rowData?.status === "ACTIVE" ? <Badge>Идэвхитэй</Badge> : <Badge color="gray">Идэвхигүй</Badge>
            },
        }
    ];

    return (
        <>
            <CustomTable data={orderedLotteryList} columnConfig={columnConfig} rowKeyField='_id' pagination={{ ...pagination, total: totalRow }} setPagination={setPagination} />
        </>
    )
}

export default LotteryList