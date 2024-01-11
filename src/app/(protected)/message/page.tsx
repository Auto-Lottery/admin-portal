"use client";

import {
  Box,
  Button,
  Group,
  Radio,
  Select,
  Stack,
  Tabs,
  TextInput,
  Textarea,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import React, { useState } from "react";
import { TbCircleCheck } from "react-icons/tb";
import { operatorsData } from "@/utilities";
import { useClientRequest } from "@/contexts/client-request-context";
import MassMessageList from "@/components/message/mass-message-list";
import LotteryMessageList from "@/components/message/lottery-message-list";

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
      smsBody: (value) => {
        if (!value) {
          return "Мессежээр илгээх тэкст оруулна уу";
        }
        if (value.length > 150)
          return "Текстийн хэмжээ 150 тэмдэгтээс уртгүй байх ёстой"
        return null;
      }
    },
  });
  const sendSingleSmsForm = useForm({
    initialValues: {
      toNumber: "",
      smsBody: "",
      operator: "MOBICOM"
    },
    validate: {
      smsBody: (value) => {
        if (!value) {
          return "Мессежээр илгээх тэкст оруулна уу";
        }
        if (value.length > 150)
          return "Текстийн хэмжээ 150 тэмдэгтээс уртгүй байх ёстой"
        return null;
      },
      toNumber: (value) => {
        if (!value) {
          return "Утасны дугаар оруулна уу.";
        }
        return null;
      }
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

  const sendSingleSms = async ({
    smsBody,
    operator,
    toNumber
  }: {
    smsBody: string;
    operator: string;
    toNumber: string;
  }) => {
    setLoading(true);
    const requestData = {
      smsBody,
      operator,
      toNumber,
    };
    const res = await postRequest("/message/sms/sendSms", requestData);

    setLoading(false);
    if (res) {
      notifications.show({
        title: "Амжилттай",
        color: "green",
        autoClose: 2000,
        icon: <TbCircleCheck size="1rem" />,
        message: "Мессеж илгээх хүсэлтийг хүлээн авлаа",
      });
      sendSingleSmsForm.reset();
    }
  };

  return (
    <Box mt="md" px="md" pb="md">
      <Tabs defaultValue="massSms">
        <Tabs.List>
          <Tabs.Tab value="massSms">Масс мессеж илгээх</Tabs.Tab>
          <Tabs.Tab value="singleSms">Нэг мессеж илгээх</Tabs.Tab>
          <Tabs.Tab value="sendMassList">Илгээсэн масс мессеж</Tabs.Tab>
          <Tabs.Tab value="sendLotteryList">Илгээсэн сугалааны мессеж</Tabs.Tab>
          <Tabs.Tab value="sendOtpList">Илгээсэн otp мессеж</Tabs.Tab>
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
                data={operatorsData}
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
        <Tabs.Panel value="singleSms" pt="md" w="50%" miw={500}>
          <form
            onSubmit={sendSingleSmsForm.onSubmit((values) => sendSingleSms(values))}
          >
            <Stack>
              <Select
                label="Үүрэн телефон оператор"
                placeholder="Сонгох"
                {...sendSingleSmsForm.getInputProps("operator")}
                data={operatorsData}
              />
              <TextInput label="Утасны дугаар"
                placeholder="Мессеж хүлээн авагчийн утасны дугаар"
                {...sendSingleSmsForm.getInputProps("toNumber")} />
              <Textarea
                label="Илгээх текст"
                {...sendSingleSmsForm.getInputProps("smsBody")}
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
        <Tabs.Panel value="sendMassList" pt="md">
          <MassMessageList filters={{}} />
        </Tabs.Panel>
        <Tabs.Panel value="sendLotteryList" pt="md">
          <LotteryMessageList filters={{}} />
        </Tabs.Panel>
        {/* <Tabs.Panel value="sendOtpList" pt="md">
          Message List
        </Tabs.Panel> */}
      </Tabs>
    </Box>
  );
}

export default Message;
