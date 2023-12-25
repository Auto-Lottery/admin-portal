import { PaginationOption } from '@/types/pagination';
import { TableColumnConfig } from '@/types/table';
import { Code, Group, Pagination, Table } from '@mantine/core'
import React, { useState } from 'react'

export type RowItemType = Record<string, any> | undefined;
const CustomTable = ({
    data = [],
    columnConfig = [],
    rowKeyField,
    pagination,
    highlightOnHover = false,
    setPagination
}: {
    data: Array<RowItemType>,
    rowKeyField: string,
    columnConfig: TableColumnConfig[],
    pagination: PaginationOption,
    highlightOnHover?: boolean,
    setPagination: React.Dispatch<React.SetStateAction<PaginationOption>>
}) => {
    const [selectedRow, setSelectedRow] = useState<RowItemType>();

    const handleSelectRow = (rowData: RowItemType) => {
        if (rowData !== selectedRow) {
            setSelectedRow(rowData);
        }
    }

    const changePage = (page: number) => {
        setPagination((prev) => {
            return {
                ...prev,
                page
            }
        })
    }

    const rows = data.map((rowData) => {
        // const isOpenRow = selectedRow?.[rowKeyField] === rowData?.[rowKeyField];
        return (
            <React.Fragment key={rowData?.[rowKeyField]}>
                <Table.Tr onClick={() => handleSelectRow(rowData)}
                    style={{
                        cursor: highlightOnHover ? "pointer" : undefined
                    }}
                // bg={isOpenRow ? 'var(--mantine-color-blue-light)' : undefined}
                >
                    {
                        columnConfig.map((config, index) => {
                            return <Table.Td key={index}>{config?.renderCell(rowData)}</Table.Td>
                        })
                    }
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
            <Table stickyHeader stickyHeaderOffset={-1} withTableBorder highlightOnHover={highlightOnHover}>
                <Table.Thead>
                    <Table.Tr>
                        {columnConfig.map((item, index) => {
                            return <Table.Th key={index}>{item?.label}</Table.Th>
                        })}
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

export default CustomTable