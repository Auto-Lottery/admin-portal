"use client";
import React, { useState } from "react";
import UserList from "@/components/users/user-list";
import { Box, Group, Text } from "@mantine/core";
import { operatorsData } from "@/utilities";
import Filter from "@/components/shared/filter";

export default function Dashboard() {
  const [filters, setFilters] = useState({});

  return (
    <Box mt="md" px="md" pb="md">
      <Group align="center" justify="space-between" mb="md">
        <Text>Хэрэглэгчийн жагсаалт</Text>
        <Filter
          formInitialValue={{
            operator: "",
            phoneNumber: "",
          }}
          filterFields={[
            {
              fieldKey: "operator",
              label: "Үүрэн телефон оператор",
              valueType: "string",
              inputType: "select",
              selectData: operatorsData,
            },
            {
              fieldKey: "phoneNumber",
              label: "Утасны дугаар",
              valueType: "string",
              inputType: "text",
            },
          ]}
          onFilter={(values) => {
            setFilters(values);
          }}
        />
      </Group>

      <UserList filters={filters} />
    </Box>
  );
}
