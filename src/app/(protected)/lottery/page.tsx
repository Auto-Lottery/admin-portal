"use client";

import React from "react";
import { Box, Text } from "@mantine/core";
import LotteryList from "@/components/lottery/lottery-list";

function Lottery() {
  return (
    <Box mt="md" px="md" pb="md">
      <Text mb="md">Борлуулагдсан сугалааны жагсаалт</Text>
      <LotteryList />
    </Box>
  );
}

export default Lottery;
