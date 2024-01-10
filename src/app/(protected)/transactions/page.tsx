"use client";

import { Box, Group, Text } from "@mantine/core";
import React, { useState } from "react";
import Filter from "@/components/shared/filter";
import TransactionList from "@/components/transactions/transaction-list";

function Transactions() {
  const [filters, setFilters] = useState({});

  return (
    <Box mt="md" px="md" pb="md">
      <Group align="center" justify="space-between" mb="md">
        <Text>Гүйлгээний жагсаалт</Text>
        <Group gap="sm">
          {/* <Button size="xs" type="button">
            Гараар гүйлгээ үүсгэх
          </Button> */}
          <Filter
            formInitialValue={{
              status: "",
              phoneNumber: "",
              tranDescription: "",
              _id: "",
            }}
            filterFields={[
              {
                fieldKey: "_id",
                label: "Гүйлгээний ID",
                valueType: "string",
                inputType: "text",
              },
              {
                fieldKey: "tranDescription",
                label: "Гүйлгээний утга",
                valueType: "string",
                inputType: "text",
              },
              {
                fieldKey: "phoneNumber",
                label: "Утасны дугаар",
                valueType: "string",
                inputType: "text",
              },
              {
                fieldKey: "status",
                label: "Төлөв",
                valueType: "string",
                inputType: "select",
                selectData: [
                  { label: "Амжилттай", value: "COMPLETE" },
                  { label: "Амжилтгүй", value: "FAILED" },
                  { label: "Шийдвэрлэгдсэн", value: "DECIDED" },
                  { label: "Хүлээгдэж байгаа", value: "PENDING" },

                ],
              },
            ]}
            onFilter={(values) => {
              setFilters(values);
            }}
          />
        </Group>
      </Group>

      <TransactionList filters={filters} />
    </Box>
  );
}

export default Transactions;
