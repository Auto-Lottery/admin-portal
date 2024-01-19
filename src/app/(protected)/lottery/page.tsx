"use client";

import React from "react";
import { Box, Button, Group, Modal, NumberInput, Stack, Text, TextInput } from "@mantine/core";
import LotteryList from "@/components/lottery/lottery-list";
import { useDisclosure } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import { useClientRequest } from "@/contexts/client-request-context";
import { useNotifcationContext } from "@/contexts/notification-context";

function Lottery() {

  const [opened, { open, close }] = useDisclosure(false);
  const { postRequest } = useClientRequest();
  const { successNotif } = useNotifcationContext();

  const form = useForm({
    initialValues: {
      phoneNumber: "",
      lotteryCount: 0
    },
    validate: {
      phoneNumber: (value) => {
        if (!value) {
          return "Утасны дугаар оруулна уу!"
        }
        return null;
      }
    }
  });

  const submit = async (values: {
    phoneNumber: string,
    lotteryCount: number
  }) => {
    const res = await postRequest(
      "/transaction/adminTransaction/manualCreateTransaction",
      values
    );
    if (res) {
      successNotif({
        message: "Сугалааг үүсгэх хүсэлтийг хүлээж авлаа."
      })
      form.reset();
      close();
    }
  }


  return (
    <Box mt="md" px="md" pb="md">
      <Group align="center" justify="space-between" mb="md">
        <Text>Борлуулагдсан сугалааны жагсаалт</Text>
        <Button onClick={open}>Сугалаа үүсгэх</Button>
      </Group>
      <Modal opened={opened}
        onClose={close}
        title="Сугалаа үүсгэх"
        overlayProps={{
          backgroundOpacity: 0.55,
          blur: 3,
        }}>

        <form onSubmit={form.onSubmit(submit)}>
          <Stack>
            <TextInput label="Утасны дугаар" {...form.getInputProps("phoneNumber")} />
            <NumberInput label="Сугалааны тоо" {...form.getInputProps("lotteryCount")} />
            <Button type="submit">Үүсгэх</Button>
          </Stack>
        </form>
      </Modal>
      <LotteryList />
    </Box >
  );
}

export default Lottery;
