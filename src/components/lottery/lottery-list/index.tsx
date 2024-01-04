"use client";

import React, { useCallback, useEffect, useState } from "react";
import { Badge, Code, Group } from "@mantine/core";
import { OrderedLottery } from "@/types/ordered-lottery";
import { PaginationOption } from "@/types/pagination";
import { RowItemType, TableColumnConfig } from "@/types/table";
import CustomTable from "@/components/shared/table";
import { useClientRequest } from "@/contexts/client-request-context";

function LotteryList() {
  const [orderedLotteryList, setOrderedLotteryList] = useState<
    OrderedLottery[]
  >([]);
  const { postRequest } = useClientRequest();
  const [totalRow, setTotalRow] = useState(0);
  const [pagination, setPagination] = useState<PaginationOption>({
    page: 1,
    pageSize: 10,
    total: 0,
    filtersData: {},
  });

  const getLotteryList = useCallback(
    async (page: number, pageSize: number) => {
      const res = await postRequest(`/generator/lottery/list`, {
        pagination: {
          page,
          pageSize,
        },
      });
      setOrderedLotteryList(res.lotteryList);
      setTotalRow(res.total);
    },
    [postRequest]
  );

  useEffect(() => {
    getLotteryList(pagination.page, pagination.pageSize);
  }, [getLotteryList, pagination]);

  const columnConfig: TableColumnConfig[] = [
    {
      label: "#",
      renderCell: (_, rowIndex) => (pagination.page - 1) * pagination.pageSize + rowIndex + 1,
    },
    {
      label: "Тохиролын дугаар",
      renderCell: (rowData: RowItemType) => `${rowData?.tohirol?.tohirolNumber}-р тохирол`,
    },
    {
      label: "Сугалааны дугаар",
      renderCell: (rowData: RowItemType) => (
        <Group>
          {/* <TbChevronRight style={{
                    transform: `rotate(${isOpenRow ? 90 : 0}deg)`,
                    transition: "all 0.2s ease"
                }} /> */}
          <Code fz={14}>{rowData?.lotteryNumber}</Code>
        </Group>
      ),
    },
    {
      label: "Төлөв",
      renderCell: (rowData: RowItemType) => rowData?.status === "ACTIVE" ? (
        <Badge>Идэвхитэй</Badge>
      ) : (
        <Badge color="gray">Идэвхигүй</Badge>
      ),
    },
  ];

  return (
    <CustomTable
      data={orderedLotteryList}
      columnConfig={columnConfig}
      rowKeyField="_id"
      pagination={{ ...pagination, total: totalRow }}
      setPagination={setPagination}
    />
  );
}

export default LotteryList;
