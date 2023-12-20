"use client";
import UserList from "@/components/users/user-list";
import classes from "./index.module.css";
import { Box, Text } from "@mantine/core";
import { useClientRequest } from "@/contexts/client-request-context";
import { useCallback, useEffect, useState } from "react";
import { User } from "@/types/user";

export default function Dashboard() {

    const [userList, setUserList] = useState<User[]>([]);
    const { getRequest } = useClientRequest();

    const getUserList = useCallback(async () => {
        const res = await getRequest("/backend/admin/users");
        setUserList(res.userList);
    }, [getRequest]);

    useEffect(() => {
        getUserList()
    }, [getUserList]);

    return (
        <Box mt="md" px="md" pb="md">
            <Text mb="md">Хэрэглэгчийн жагсаалт</Text>
            <UserList data={userList} />
        </Box>
    );
}
