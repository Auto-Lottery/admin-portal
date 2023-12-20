"use client";
import React, { useState } from 'react'
import { Badge, Code, Collapse, Group, Pagination, Table } from '@mantine/core'
import { OrderedLottery } from '@/types/ordered-lottery';
import { TbChevronRight } from 'react-icons/tb';
import { PaginationOption } from '@/types/pagination';

const LotteryList = ({ data = [], pagination, setPagination = () => { } }: {
    data: OrderedLottery[],
    pagination: PaginationOption,
    setPagination: React.Dispatch<React.SetStateAction<PaginationOption>>
}) => {
    const [selectedRow, setSelectedRow] = useState<OrderedLottery | undefined>();


    const handleSelectRow = (rowData: OrderedLottery) => {
        setSelectedRow(selectedRow?._id === rowData._id ? undefined : rowData);
    }

    const changePage = (page: number) => {
        setPagination((prev) => {
            return {
                ...prev,
                page
            }
        })
    }
    const rows = data.map((lottery) => {
        const isOpenRow = selectedRow?._id === lottery._id;
        return (
            <React.Fragment key={lottery._id}>
                <Table.Tr onClick={() => handleSelectRow(lottery)} bg={isOpenRow ? 'var(--mantine-color-blue-light)' : undefined}>
                    <Table.Td><Group>
                        <TbChevronRight style={{
                            transform: `rotate(${isOpenRow ? 90 : 0}deg)`,
                            transition: "all 0.2s ease"
                        }} />
                        <Code fz={14}>{lottery.lotteryNumber}</Code></Group></Table.Td>
                    <Table.Td>{lottery.status === "ACTIVE" ? <Badge>Идэвхитэй</Badge> : <Badge color="gray">Идэвхигүй</Badge>}</Table.Td>
                </Table.Tr>
                {/* <Table.Tr style={{
                    borderBottomWidth: isOpenRow ? 1 : 0
                }}>
                    <Table.Td colSpan={2} py={0} m={0}>
                        <Collapse in={isOpenRow}>
                            hellos
                        </Collapse>
                    </Table.Td>
                </Table.Tr > */}
            </React.Fragment >
        )
    });
    return (
        <>
            <Table stickyHeader stickyHeaderOffset={-1} withTableBorder highlightOnHover>
                <Table.Thead>
                    <Table.Tr>
                        {/* <Table.Th>Хэрэглэгчийн Д/Д</Table.Th> */}
                        <Table.Th>Сугалааны дугаар</Table.Th>
                        <Table.Th>Төлөв</Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>{rows}</Table.Tbody>
                {/* <Table.Caption>Scroll page to see sticky thead</Table.Caption> */}
            </Table>
            <Group mt="md" justify='center'>
                <Pagination
                    total={(pagination.total / pagination.pageSize) + ((pagination.total % pagination.pageSize) > 0 ? 1 : 0)}
                    boundaries={3}
                    siblings={3}
                    onChange={changePage}
                    onNextPage={() => changePage(pagination.page + 1)}
                    onPreviousPage={() => changePage(pagination.page + 1)} />
            </Group>
        </>
    )
}

export default LotteryList