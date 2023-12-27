"use client";
import React from "react";
import {
  Code,
  Collapse,
  Group,
  ScrollArea,
  Title,
  UnstyledButton,
  rem,
} from "@mantine/core";
import {
  TbLogout,
} from "react-icons/tb";
import classes from "./index.module.css";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";
import { MenuItem } from "../layout";

const LeftSideNavbar = ({
  active,
  menuData,
}: {
  active: string,
  menuData: MenuItem[]
}) => {
  const router = useRouter();
  const { logout } = useAuth();
  // const [isOpenMenu, setIsOpenMenu] = useState<Record<string, boolean>>({});

  return (
    <nav className={classes.navbar}>
      <div className={classes.header}>
        <Group justify="space-between">
          <Title order={4} style={{ width: rem(140) }}>
            Auto Prime
          </Title>
          <Code fw={700}>v1.0</Code>
        </Group>
      </div>

      <ScrollArea className={classes.links}>
        <div className={classes.linksInner}>
          {menuData.map((item, index) => {
            return (
              <React.Fragment key={`menu_${index}`}>
                <a href={item.href} className={classes.menuItemButton} data-active={item.key === active || undefined} onClick={(e) => {
                  e.preventDefault();
                  // setIsOpenMenu(prev => ({
                  //   ...prev,
                  //   [item.label]: !prev[item.label]
                  // }));
                  router.push(item.href);
                }}>
                  <item.icon className={classes.menuItemIcon} />
                  <span>{item.label}</span>
                </a>
                {item?.links && item.links.length > 0 ? (
                  <Collapse in={false}>
                    {item.links.map((subItem, subIndex) => {
                      return (
                        <UnstyledButton
                          key={`subMenu_${subIndex}`}
                          className={classes.menuItemButton}
                          data-active={subItem.label === active || undefined} onClick={() => { }}
                        >
                          <span>{subItem.label}</span>
                        </UnstyledButton>
                      );
                    })}
                  </Collapse>
                ) : null}
              </React.Fragment>
            );
          })}
        </div>
      </ScrollArea>

      <div className={classes.footer}>
        <UnstyledButton className={classes.menuItemButton} onClick={logout}>
          <TbLogout className={classes.menuItemIcon} />
          <span>Гарах</span>
        </UnstyledButton>
      </div>
    </nav >
  );
};

export default LeftSideNavbar;
