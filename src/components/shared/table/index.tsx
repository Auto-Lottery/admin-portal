import { PaginationOption } from "@/types/pagination";
import { RowItemType, TableColumnConfig } from "@/types/table";
import { Group, Pagination, Table, Text } from "@mantine/core";
import React from "react";

function CustomTable({
  data = [],
  columnConfig = [],
  rowKeyField,
  pagination,
  highlightOnHover = false,
  onSelectRow = () => { },
  setPagination,
}: {
  data: Array<RowItemType>;
  rowKeyField: string;
  columnConfig: TableColumnConfig[];
  pagination: PaginationOption;
  highlightOnHover?: boolean;
  onSelectRow?: (rowData: RowItemType) => void;
  setPagination: React.Dispatch<React.SetStateAction<PaginationOption>>;
}) {
  // const [selectedRow, setSelectedRow] = useState<RowItemType>();
  const totalPage =
    pagination.total / pagination.pageSize +
    (pagination.total % pagination.pageSize > 0 ? 1 : 0);
  const currentMaxRow = pagination.page * pagination.pageSize;
  const currentRow =
    currentMaxRow > pagination.total ? pagination.total : currentMaxRow;
  const handleSelectRow = (rowData: RowItemType) => {
    onSelectRow(rowData);
    // if (rowData !== selectedRow) {
    //     setSelectedRow(rowData);
    // }
  };

  const changePage = (page: number) => {
    setPagination((prev) => ({
      ...prev,
      page,
    }));
  };

  const rows = data.map((rowData, rowIndex) =>
  // const isOpenRow = selectedRow?.[rowKeyField] === rowData?.[rowKeyField];
  (
    <React.Fragment key={rowData?.[rowKeyField]}>
      <Table.Tr
        onClick={() => handleSelectRow(rowData)}
        style={{
          cursor: highlightOnHover ? "pointer" : undefined,
        }}
      // bg={isOpenRow ? 'var(--mantine-color-blue-light)' : undefined}
      >
        {columnConfig.map((config, index) => (
          <Table.Td key={index}>
            {config?.renderCell(rowData, rowIndex)}
          </Table.Td>
        ))}
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
    </React.Fragment>
  )
  );

  return (
    <>
      <Table
        stickyHeader
        stickyHeaderOffset={-1}
        withTableBorder
        highlightOnHover={highlightOnHover}
      >
        <Table.Thead>
          <Table.Tr>
            {columnConfig.map((item, index) => <Table.Th key={index}>{item?.label}</Table.Th>)}
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
        {/* <Table.Caption>Scroll page to see sticky thead</Table.Caption> */}
      </Table>
      <Group mt="md" justify="space-between">
        <div />
        <Pagination
          total={totalPage}
          boundaries={3}
          siblings={3}
          onChange={(page) => {
            if (page !== pagination.page) {
              changePage(page);
            }
          }}
          onNextPage={() => {
            const nextPage = pagination.page + 1;
            if (totalPage >= nextPage) {
              changePage(nextPage);
            }
          }}
          onPreviousPage={() => {
            const prevPage = pagination.page - 1;
            if (prevPage > 0) {
              changePage(prevPage);
            }
          }}
        />
        <Text size="md" fw="bold">
          Нийт: {pagination.total}-с {currentRow} мөр
        </Text>
      </Group>
    </>
  );
}

export default CustomTable;
