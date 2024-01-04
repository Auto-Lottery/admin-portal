"use client";
import { useAuth } from "@/contexts/auth-context";
import React, { useEffect } from "react";
import Loading from "../loading";
import { notifications } from "@mantine/notifications";
import { TbAlertCircle } from "react-icons/tb";

const Logout = () => {
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
  }, []);

  return <Loading />;
};

export default Logout;
