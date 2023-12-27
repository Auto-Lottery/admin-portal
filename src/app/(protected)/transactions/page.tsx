"use client";
import TransactionList from '@/components/transactions/transaction-list';
import { ActionIcon, Box, Button, Group, Indicator, Input, Modal, Select, Stack, Text, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import React, { useState } from 'react'
import { TbFilter } from 'react-icons/tb';

const Transactions = () => {
    const [filterModalOpened, { open: filterModalOpen, close: filterModalClose }] = useDisclosure(false);
    // const [opened: createModalOpened, { open, close }] = useDisclosure(false);
    const [filterCount, setFilterCount] = useState(0);
    const filterForm = useForm({
        initialValues: {
            status: "",
            phoneNumber: "",
            tranDescription: "",
            _id: "",
        }
    });

    const search = (values: { status: string, phoneNumber: string, tranDescription: string, _id: string }) => {
        filterModalClose();
        setFilterCount(Object.keys(values).filter((key: string) => values[key as keyof typeof values]).length);
    }

    return (
        <Box mt="md" px="md" pb="md">
            <Group align='center' justify='space-between' mb="md">
                <Text>Гүйлгээний жагсаалт</Text>
                <Group gap={"sm"}>
                    <Button size="xs" type="button">Гараар гүйлгээ үүсгэх</Button>
                    <Indicator inline label={filterCount} size={16} disabled={filterCount === 0}>
                        <ActionIcon variant='light' color="gray" type='button' onClick={filterModalOpen}><TbFilter /></ActionIcon>
                    </Indicator>
                </Group>
            </Group>
            <Modal opened={filterModalOpened} onClose={filterModalClose} title="Шүүлтүүр" overlayProps={{
                backgroundOpacity: 0.55,
                blur: 3,
            }}>
                <form onSubmit={filterForm.onSubmit(values => search(values))}>
                    <Stack>
                        <TextInput
                            label="Гүйлгээний ID"
                            placeholder="Гүйлгээний ID" {...filterForm.getInputProps('_id')} />
                        <TextInput
                            label="Гүйлгээний утга"
                            placeholder="Гүйлгээний утга" {...filterForm.getInputProps('tranDescription')} />
                        <TextInput
                            label="Утасны дугаар"
                            placeholder="Утасны дугаар" {...filterForm.getInputProps('phoneNumber')} />
                        <Select
                            label="Төлөв"
                            placeholder="Сонгох"
                            {...filterForm.getInputProps('status')}
                            data={[{ label: 'Бүгд', value: "" }, { label: 'Амжилттай', value: "COMPLETE" }, { label: 'Амжилтгүй', value: "FAILED" }, { label: 'Хүлээгдэж байгаа', value: "PENDING" }]}
                        />
                        <Button type='submit'>Хайх</Button>
                    </Stack>
                </form>
            </Modal>
            <TransactionList />
        </Box>
    )
}

export default Transactions;