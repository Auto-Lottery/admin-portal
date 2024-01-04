'use client';
import AdminUserList from "@/components/admin-users/admin-user-list";
import Filter from "@/components/shared/filter";
import { useClientRequest } from "@/contexts/client-request-context";
import { ActionIcon, Box, Button, Checkbox, CopyButton, Group, Modal, Stack, Text, TextInput, Tooltip, rem } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import React, { useState } from "react";
import { TbCheck, TbCircleCheck, TbCopy } from "react-icons/tb";
import { nanoid } from 'nanoid'
import { notifications } from "@mantine/notifications";

const AdminUsers = () => {
  const [filters, setFilters] = useState({});
  const [loading, setLoading] = useState(false);
  const { postRequest } = useClientRequest();
  const [generatedPassword, setGeneratedPassword] = useState("");
  const [opened, { open, close }] = useDisclosure(false);
  const form = useForm({
    initialValues: {
      phoneNumber: "",
      password: "",
      roles: []
    },
    validate: {
      phoneNumber: (value) => {
        if (/\d{8}/.test(value) && value.length === 8) {
          return null;
        }
        return "Утасны дугаарын формат буруу байна!";
      },
      roles: (value) => {
        if (value.length > 0) {
          return null;
        }
        return "Үүрэг сонгоно уу!";
      }
    },
  });

  const onSubmit = async (values: Record<string, string | string[]>) => {
    setLoading(true);
    try {
      const res = await postRequest("/auth/admin/register", values);
      if (res === true) {
        notifications.show({
          title: "Амжилттай",
          color: "green",
          autoClose: 2000,
          icon: <TbCircleCheck size="1rem" />,
          message: "Админ хэрэглэгч амжилттай бүртгэгдлээ",
        });
        form.reset();
        close();
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  return <Box mt="md" px="md" pb="md">
    <Group align="center" justify="space-between" mb="md">
      <Text>Админ хэрэглэгчийн жагсаалт</Text>
      <Group gap={"sm"}>
        <Button size="xs" type="button" onClick={() => {
          const pass = nanoid(6)
          setGeneratedPassword(pass);
          form.setFieldValue("password", pass);
          open()
        }}>
          Админ бүртгэх
        </Button>
        <Filter
          formInitialValue={{
            operator: "",
            phoneNumber: "",
          }}
          filterFields={[
            {
              fieldKey: "phoneNumber",
              label: "Утасны дугаар",
              valueType: "string",
              inputType: "text",
            },
          ]}
          onFilter={(values) => {
            setFilters(values);
          }}
        />
      </Group>
    </Group>

    <Modal opened={opened} onClose={() => {
      form.reset();
      close();
    }} title="Админ бүртгэх"
      overlayProps={{
        backgroundOpacity: 0.55,
        blur: 3,
      }}>
      <form onSubmit={form.onSubmit((values) => onSubmit(values))}>
        <Stack>
          <TextInput label="Утасны дугаар" {...form.getInputProps('phoneNumber')} withAsterisk />
          <TextInput label="Нууц үг" readOnly {...form.getInputProps('password')} withAsterisk rightSection={
            <CopyButton value={generatedPassword} timeout={2000}>
              {({ copied, copy }) => (
                <Tooltip label={copied ? 'Хуулагдсан' : 'Хуулах'} withArrow position="right">
                  <ActionIcon color={copied ? 'teal' : 'gray'} variant="subtle" onClick={copy}>
                    {copied ? (
                      <TbCheck style={{ width: rem(16) }} />
                    ) : (
                      <TbCopy style={{ width: rem(16) }} />
                    )}
                  </ActionIcon>
                </Tooltip>
              )}
            </CopyButton>

          } />
          <Checkbox.Group
            label="Админы үүрэг"
            {...form.getInputProps('roles')}
            withAsterisk
          >
            <Group mt="xs">
              <Checkbox value="supervisor" label="Supervisor" />
              <Checkbox value="admin" label="Admin" />
            </Group>
          </Checkbox.Group>
          <Button type="submit" loading={loading}>Бүртгэх</Button>
        </Stack>
      </form>
    </Modal>
    <AdminUserList filters={filters} />
  </Box >
};

export default AdminUsers;
