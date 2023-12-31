"use client";

import React from "react";
import { Button, Container, Group, Text, Title } from "@mantine/core";
import { useRouter } from "next/navigation";
import InternalServerErrorIllusration from "@/components/illustration/internal-server-error";
import classes from "./error.module.css";

export default function Error({
  reset,
}: {
  reset: () => void;
}) {
  const router = useRouter();

  return (
    <Container className={classes.root}>
      <div className={classes.inner}>
        <InternalServerErrorIllusration className={classes.image} />
        <div className={classes.content}>
          <Title className={classes.title}>Алдаа гарлаа</Title>
          <Text
            c="dimmed"
            size="lg"
            ta="center"
            className={classes.description}
          >
            Тус хуудсыг ачааллах алдаа гарлаа. Та дахин ачааллаж үзээд алдаа
            гарсан хэвээр байвал системийн админд хандана уу.
          </Text>
          <Group justify="center">
            <Button onClick={() => reset()} size="md">
              Дахин ачааллах
            </Button>
            <Button
              onClick={() => {
                router.push("/");
              }}
              variant="outline"
              size="md"
            >
              Нүүр хуудасруу очих
            </Button>
          </Group>
        </div>
      </div>
    </Container>
  );
}
