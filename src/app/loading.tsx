import { Flex, Loader } from "@mantine/core";
import React from "react";

function Loading() {
  return (
    <Flex align="center" justify="center" h="100vh" w="100%">
      <Loader size={30} />
    </Flex>
  );
}

export default Loading;
