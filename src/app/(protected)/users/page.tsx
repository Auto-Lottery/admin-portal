import UserList from "@/components/users/user-list";
import classes from "./index.module.css";
import { Box, Text } from "@mantine/core";

export default function Dashboard() {
    return (
        <Box mt="md" px="md" pb="md">
            <Text mb="md">Хэрэглэгчийн жагсаалт</Text>
            <UserList />
        </Box>
    );
}
