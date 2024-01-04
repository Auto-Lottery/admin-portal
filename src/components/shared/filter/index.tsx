import {
  ActionIcon,
  Button,
  ComboboxItem,
  Group,
  Indicator,
  Modal,
  NumberInput,
  Select,
  Stack,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import React, { useState } from "react";
import { TbFilter } from "react-icons/tb";

interface FilterFieldType {
  label: string;
  fieldKey: string;
  placeholder?: string;
  valueType: string;
  inputType: string;
  selectData?: ComboboxItem[];
}

function Filter({
  formInitialValue,
  filterFields = [],
  onFilter = () => {},
}: {
  formInitialValue: Record<string, string | number | undefined>;
  filterFields: FilterFieldType[];
  onFilter: (values: Record<string, string | number>) => void;
}) {
  const [opened, { open, close }] = useDisclosure(false);
  const [filterCount, setFilterCount] = useState(0);
  const filterForm = useForm({
    initialValues: formInitialValue,
  });

  const search = (values: Record<string, string | number | undefined>) => {
    close();
    const filteredObject: Record<string, string | number> = Object.fromEntries(
      Object.entries(values).filter(([_, value]) => value)
    ) as Record<string, string | number>;

    setFilterCount(Object.keys(filteredObject).length);
    onFilter(filteredObject);
  };

  const clearFilter = () => {
    filterForm.reset();
    setFilterCount(0);
    onFilter({});
  };

  return (
    <>
      <Indicator
        inline
        label={filterCount}
        size={16}
        disabled={filterCount === 0}
      >
        <ActionIcon variant="light" color="gray" type="button" onClick={open}>
          <TbFilter />
        </ActionIcon>
      </Indicator>
      <Modal
        opened={opened}
        onClose={close}
        title="Шүүлтүүр"
        overlayProps={{
          backgroundOpacity: 0.55,
          blur: 3,
        }}
      >
        <form onSubmit={filterForm.onSubmit((values) => search(values))}>
          <Stack>
            {filterFields.map((field, index) => {
              if (field.inputType === "text") {
                return (
                  <TextInput
                    key={`field_${index}`}
                    label={field.label}
                    placeholder={field.placeholder || field.label}
                    {...filterForm.getInputProps(field.fieldKey)}
                  />
                );
              }
              if (field.inputType === "number") {
                return (
                  <NumberInput
                    key={`field_${index}`}
                    label={field.label}
                    placeholder={field.placeholder || field.label}
                    {...filterForm.getInputProps(field.fieldKey)}
                  />
                );
              }
              if (field.inputType === "select") {
                return (
                  <Select
                    key={`field_${index}`}
                    label={field.label}
                    placeholder="Сонгох"
                    {...filterForm.getInputProps(field.fieldKey)}
                    data={[
                      { label: "Бүгд", value: "" },
                      ...(field?.selectData ? field.selectData : []),
                    ]}
                  />
                );
              }
            })}
            <Group grow>
              <Button
                disabled={filterCount === 0}
                variant="light"
                color="gray"
                type="button"
                onClick={clearFilter}
              >
                Арилгах
              </Button>
              <Button type="submit">Хайх</Button>
            </Group>
          </Stack>
        </form>
      </Modal>
    </>
  );
}

export default Filter;
