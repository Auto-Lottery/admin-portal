"use client";
import React from "react";
import UserList from "@/components/users/user-list";
import { Box, Text } from "@mantine/core";

export default function Dashboard() {

    return (
        <Box mt="md" px="md" pb="md">
            <Text mb="md">Хэрэглэгчийн жагсаалт</Text>
            <UserList />
        </Box>
    );
}
