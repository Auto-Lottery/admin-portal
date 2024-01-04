"use client";

import {
  Box,
  Button,
  Group,
  Radio,
  Select,
  Stack,
  Tabs,
  Textarea,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import React, { useState } from "react";
import { TbCircleCheck } from "react-icons/tb";
import { operatorsData } from "@/utilities";
import { useClientRequest } from "@/contexts/client-request-context";

function Message() {
  const { postRequest } = useClientRequest();
  const [loading, setLoading] = useState(false);
  const sendSmsForm = useForm({
    initialValues: {
      isExternal: "internal",
      smsBody: "",
      operator: "MOBICOM",
      toNumberList: "",
    },
    validate: {
      smsBody: (value) =>
        value.length > 168
          ? "Текстийн хэмжээ 168 тэмдэгтээс уртгүй байх ёстой"
          : null,
    },
  });

  const sendMassSms = async ({
    isExternal,
    smsBody,
    operator,
    toNumberList,
  }: {
    isExternal: string;
    smsBody: string;
    operator: string;
    toNumberList: string;
  }) => {
    setLoading(true);
    const tempIsExternal = isExternal === "external";
    const requestData = {
      smsBody,
      operator,
      isExternal: tempIsExternal,
      toNumberList: tempIsExternal ? toNumberList.trim().split(",") : [],
    };
    const res = await postRequest("/message/sms/sendMassSms", requestData);

    setLoading(false);
    if (res) {
      notifications.show({
        title: "Амжилттай",
        color: "green",
        autoClose: 2000,
        icon: <TbCircleCheck size="1rem" />,
        message: "Мессеж илгээх хүсэлтийг хүлээн авлаа",
      });
    }
  };

  return (
    <Box mt="md" px="md" pb="md">
      <Tabs defaultValue="massSms">
        <Tabs.List>
          <Tabs.Tab value="massSms">Масс мессеж илгээх</Tabs.Tab>
          <Tabs.Tab value="sendList">Илгээсэн мессеж жагсаалт</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="massSms" pt="md" w="50%" miw={500}>
          <form
            onSubmit={sendSmsForm.onSubmit((values) => sendMassSms(values))}
          >
            <Stack>
              <Select
                label="Үүрэн телефон оператор"
                placeholder="Сонгох"
                {...sendSmsForm.getInputProps("operator")}
                data={[{ label: "Бүгд", value: "" }, ...operatorsData]}
              />
              <Radio.Group
                label="Хэнрүү илгээх"
                {...sendSmsForm.getInputProps("isExternal")}
              >
                <Group mt="xs">
                  <Radio value="internal" label="Системийн хэрэглэгчид рүү" />
                  <Radio value="external" label="Гараар дугаар оруулах" />
                </Group>
              </Radio.Group>
              {sendSmsForm.values.isExternal === "external" ? (
                <Textarea
                  label="Мессеж хүлээн авах дугаар"
                  description="Таслалаар зааглан олон дугаар бичиж болно"
                  placeholder="Утасны дугаар оруулна уу"
                  {...sendSmsForm.getInputProps("toNumberList")}
                />
              ) : null}

              <Textarea
                label="Илгээх текст"
                {...sendSmsForm.getInputProps("smsBody")}
                placeholder="Мессежээр илгээх текст латинаар бичнэ үү"
              />

              <Button
                w={150}
                loading={loading}
                loaderProps={{ type: "dots" }}
                type="submit"
              >
                Илгээх
              </Button>
            </Stack>
          </form>
        </Tabs.Panel>
        <Tabs.Panel value="sendList" pt="md">
          Message List
        </Tabs.Panel>
      </Tabs>
    </Box>
  );
}

export default Message;
