"use client"

import { useClientRequest } from "@/contexts/client-request-context";
import { useNotifcationContext } from "@/contexts/notification-context";
import { RowItemType } from "@/types/table";
import { Button, Modal, Stack, Switch, TextInput, Textarea } from "@mantine/core";
import { useForm } from "@mantine/form";
import React from "react";

function TransactionEditModal({
    opened,
    close,
    transactionData
}: {
    opened: boolean,
    close: () => void,
    transactionData: RowItemType
}) {
    const { postRequest } = useClientRequest();
    const { successNotif } = useNotifcationContext();
    const form = useForm({
        initialValues: {
            tranDescription: transactionData?.tranDescription || "",
            description: "",
            isRetry: true
        },
        validate: {
            tranDescription: (value) => {
                if (!value) {
                    return "Гүйлгээний утга хоосон байна!"
                }
                return null;
            },
            description: (value: string) => {
                if (!value || value.length < 10) {
                    return "Тайлбар 10н тэмдэгтээс их урттай байх шаардлагатай!"
                }
                return null;
            }
        }
    });

    const updateTransaction = async (values: Record<string, string | number | boolean | undefined>) => {
        let additional = {};

        if (!values.isRetry) {
            additional = {
                status: "DECIDED"
            }
        }
        const res = await postRequest("/transaction/adminTransaction/updateTransaction", {
            id: transactionData?._id,
            ...values,
            ...additional
        });
        if (res) {
            successNotif({
                message: "Гүйлгээний мэдээлэл амжилттай засварлалаа."
            });
            close();
        }
    }

    const { value, ...other } = form.getInputProps("isRetry");

    return <Modal opened={opened}
        onClose={close}
        title="Гүйлгээ засварлах"
        overlayProps={{
            backgroundOpacity: 0.55,
            blur: 3,
        }}>

        <form onSubmit={form.onSubmit(updateTransaction)}>
            <Stack>
                <Switch
                    label="Дахин боловсруулах эсэх"
                    checked={value}
                    {...other}
                />
                <TextInput label="Гүйлгээний утга" {...form.getInputProps("tranDescription")} />
                <Textarea label="Тайлбар" placeholder="Ямар шалтгаанаар засвар оруулсан тайлбар..." {...form.getInputProps("description")} maxRows={5} />
                <Button type="submit">Хадгалах</Button>
            </Stack>
        </form>
    </Modal>;
}

export default TransactionEditModal;
