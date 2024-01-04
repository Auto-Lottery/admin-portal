"use client";

import { useAuth } from "@/contexts/auth-context";
import React, { useEffect } from "react";
import { notifications } from "@mantine/notifications";
import { TbAlertCircle } from "react-icons/tb";
import Loading from "../loading";

function Logout() {
  const { logout } = useAuth();

  useEffect(() => {
    notifications.show({
      title: "Анхааруулга",
      color: "yellow",
      autoClose: 2000,
      icon: <TbAlertCircle size="1rem" />,
      message: "Таны хандах хугацаа дууссан байна.",
    });
    logout();
  }, [logout]);

  return <Loading />;
}

export default Logout;
