"use client";
import React from 'react'
import { Badge, Table } from '@mantine/core'
import dayjs from 'dayjs'
import { User } from '@/types/user';

const UserList = ({ data = [] }: {
    data: User[]
}) => {

    const renderOperator = (user: User) => {
        if (user.operator === "MOBICOM") {
            return <Badge color="red" style={{
                textTransform: "none"
            }}>Mobicom</Badge>;
        }
        if (user.operator === "UNITEL") {
            return <Badge color="green" style={{
                textTransform: "none"
            }}>Unitel</Badge>;
        }
        if (user.operator === "GMOBILE") {
            return <Badge color="#fdb913" style={{
                color: "black",
                textTransform: "none"
            }}>G-Mobile</Badge>;
        }
        if (user.operator === "SKYTEL") {
            return <Badge color="white" style={{
                color: "#00359B",
                textTransform: "none"
            }}>SKYtel</Badge>;
        }
        if (user.operator === "ONDO") {
            return <Badge color="#ff0099">ONDO</Badge>;
        }
        return null
    }

    const rows = data.map((user) => (
        <Table.Tr key={user._id}>
            <Table.Td>{user._id}</Table.Td>
            <Table.Td>{user.phoneNumber}</Table.Td>
            <Table.Td>{renderOperator(user)}</Table.Td>
            <Table.Td>{dayjs(user.createdDate).format("YYYY-MM-DD HH:mm:ss")}</Table.Td>
        </Table.Tr>
    ));
    return (
        <Table stickyHeader stickyHeaderOffset={-1} withTableBorder>
            <Table.Thead>
                <Table.Tr>
                    <Table.Th>Хэрэглэгчийн Д/Д</Table.Th>
                    <Table.Th>Утасны дугаар</Table.Th>
                    <Table.Th>Оператор</Table.Th>
                    <Table.Th>Бүртгүүлсэн огноо</Table.Th>
                </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{rows}</Table.Tbody>
            {/* <Table.Caption>Scroll page to see sticky thead</Table.Caption> */}
        </Table>
    )
}

export default UserList