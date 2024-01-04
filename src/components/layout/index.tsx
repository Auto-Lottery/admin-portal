"use client";

import React, { useMemo } from "react";
import { Title } from "@mantine/core";
import { usePathname } from "next/navigation";
import {
  TbGauge,
  TbUsers,
  TbGift,
  TbArrowsLeftRight,
  TbMessage,
} from "react-icons/tb";
import { GrUserAdmin } from "react-icons/gr";
import { MenuItem } from "@/types/menu";
import classes from "./index.module.css";
import LeftSideNavbar from "../leftside-navbar";

function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const mockdata: MenuItem[] = useMemo(() => [
    { key: "dashboard", label: "Хянах самбар", href: "/", icon: TbGauge },
    {
      key: "users",
      label: "Хэрэглэгч",
      href: "/users",
      icon: TbUsers,
    },
    {
      key: "lottery",
      label: "Сугалаа",
      href: "/lottery",
      icon: TbGift,
    },
    {
      key: "transactions",
      label: "Гүйлгээ",
      href: "/transactions",
      icon: TbArrowsLeftRight,
    },
    {
      key: "message",
      label: "Мессеж",
      href: "/message",
      icon: TbMessage,
    },
    {
      key: "admin_users",
      label: "Админ хэрэглэгч",
      href: "/admin-users",
      icon: GrUserAdmin,
    },
  ], []);

  const activeMenu = useMemo(() => {
    const selectedMenuItem = mockdata.find((menuItem) =>
      menuItem.key === "dashboard"
        ? pathname === menuItem.href
        : pathname.startsWith(menuItem.href)
    );

    if (selectedMenuItem) {
      return selectedMenuItem;
    }
    return null;
  }, [pathname, mockdata]);

  return (
    <div className={classes.layoutContainer}>
      <LeftSideNavbar active={activeMenu?.key || ""} menuData={mockdata} />
      <div className={classes.bodyContainer}>
        <div className={classes.headerSection}>
          <Title order={4}>{activeMenu?.label}</Title>
        </div>
        <div className={classes.contentSection}>{children}</div>
      </div>
    </div>
  );
}

export default ProtectedLayout;
