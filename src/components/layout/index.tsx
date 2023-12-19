"use client"
import React, { useMemo } from 'react'
import LeftSideNavbar from '../leftside-navbar'
import classes from "./index.module.css"
import { Title } from '@mantine/core'
import { usePathname } from 'next/navigation'
import {
    TbGauge,
    TbUsers,
    TbGift,
} from "react-icons/tb";
import { GrUserAdmin } from "react-icons/gr";

export type MenuItem = {
    key: string,
    label: string,
    icon: typeof TbGauge,
    href: string,
    links?: Array<{
        label: string,
    }>
}

const ProtectedLayout = ({ children }: { children: React.ReactNode }) => {

    const pathname = usePathname();

    const mockdata: MenuItem[] = [
        { key: "dashboard", label: "Хянах самбар", href: "/", icon: TbGauge },
        {
            key: "users",
            label: "Хэрэглэгч", href: "/users",
            icon: TbUsers,
        },
        {
            key: "lottery",
            label: "Сугалаа", href: "/lottery",
            icon: TbGift
        },
        { key: "admin_users", label: "Админ хэрэглэгч", href: "/admin-users", icon: GrUserAdmin },
    ];

    const activeMenu = useMemo(() => {
        const selectedMenuItem = mockdata.find(menuItem => menuItem.href === pathname);

        if (selectedMenuItem) {
            return selectedMenuItem;
        }
        return null;
    }, [pathname]);

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
    )
}

export default ProtectedLayout