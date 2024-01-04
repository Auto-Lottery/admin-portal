"use client";
import UserLotteryList from "@/components/users/user-lottery-list";
import UserTransactionList from "@/components/users/user-transaction-list";
import { Box, Group, Tabs, Text } from "@mantine/core";
import React from "react";

const UserDetail = ({ params }: { params: { slug: string[] } }) => {
  return (
    <Box mt="md" px="md" pb="md">
      <Group gap={80} mb={"lg"}>
        <div>
          <Text size="md" c="dimmed">
            ID
          </Text>
          <Text size="md" fw={"bold"}>
            {params.slug[0]}
          </Text>
        </div>
        <div>
          <Text size="md" c="dimmed">
            Утасны дугаар
          </Text>
          <Text size="md" fw={"bold"}>
            {params.slug[1]}
          </Text>
        </div>
      </Group>
      <Tabs defaultValue="lottery">
        <Tabs.List>
          <Tabs.Tab value="lottery">Сугалааны мэдээлэл</Tabs.Tab>
          <Tabs.Tab value="transaction">Гүйлгээний мэдээлэл</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="lottery" pt={"md"}>
          <UserLotteryList userId={params.slug[0]} />
        </Tabs.Panel>
        <Tabs.Panel value="transaction" pt={"md"}>
          <UserTransactionList
            userData={{
              userId: params.slug[0],
              phoneNumber: params.slug[1],
            }}
          />
        </Tabs.Panel>
      </Tabs>
    </Box>
  );
};

export default UserDetail;
