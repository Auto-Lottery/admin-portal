"use client";

import {
  ActionIcon,
  useComputedColorScheme,
  useMantineColorScheme,
} from "@mantine/core";
import React from "react";
import { TbMoon, TbSun } from "react-icons/tb";
import classes from "./index.module.css";

function ThemeButtom() {
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme("light");

  const toggleColorScheme = () => {
    setColorScheme(computedColorScheme === "dark" ? "light" : "dark");
  };

  return (
    <ActionIcon variant="filled" aria-label="Theme" onClick={toggleColorScheme}>
      <TbSun className={`${classes.icon} ${classes.light}`} />
      <TbMoon className={`${classes.icon} ${classes.dark}`} />
    </ActionIcon>
  );
}

export default ThemeButtom;
