"use client";

import LotteryList from '@/components/lottery/lottery-list';
import { useClientRequest } from '@/contexts/client-request-context';
import { OrderedLottery } from '@/types/ordered-lottery';
import { PaginationOption } from '@/types/pagination';
import { TableColumnData } from '@/types/table';
import { Box, Text } from '@mantine/core'
import React, { useCallback, useEffect, useState } from 'react'

const Lottery = () => {
    const [orderedLotteryList, setOrderedLotteryList] = useState<OrderedLottery[]>([]);
    const { getRequest } = useClientRequest();
    const [totalRow, setTotalRow] = useState(0);
    const [pagination, setPagination] = useState<PaginationOption>({
        page: 1,
        pageSize: 10,
        total: 0
    })
    // const columnData: TableColumnData[] = [
    //     {
    //         label: "",
    //         renderCell: (rowData: {
    //             id: string
    //         }) => {
    //             return <div>{rowData.id}</div>
    //         },
    //     }
    // ]

    const getLotteryList = useCallback(async (page: number, pageSize: number) => {
        const res = await getRequest(`/generator/lottery/list?page=${page}&pageSize=${pageSize}`);
        setOrderedLotteryList(res.lotteryList);
        setTotalRow(res.total);
    }, [getRequest]);

    useEffect(() => {
        getLotteryList(pagination.page, pagination.pageSize)
    }, [getLotteryList, pagination]);

    return (
        <Box mt="md" px="md" pb="md">
            <Text mb="md">Борлуулагдсан сугалааны жагсаалт</Text>
            <LotteryList data={orderedLotteryList} pagination={{ ...pagination, total: totalRow }} setPagination={setPagination} />
        </Box>
    );
}

export default Lottery;