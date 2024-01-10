"use client"

import { notifications } from "@mantine/notifications";
import React, { useCallback, useMemo } from "react";
import { TbAlertCircle, TbAlertSmall, TbCircleCheck } from "react-icons/tb";

interface NotifConfig {
    title?: string, message: React.ReactNode
}
const NotificationContext = React.createContext<{
    successNotif: (config: NotifConfig) => void
    errorNotif: (config: NotifConfig) => void
    warnNotif: (config: NotifConfig) => void
}>({
    successNotif: () => { },
    errorNotif: () => { },
    warnNotif: () => { }
});

export const useNotifcationContext = () => React.useContext(NotificationContext)

function NotificationProvider({ children }: { children: React.ReactNode }) {
    const success = useCallback(({ title, message }: NotifConfig) => {
        notifications.show({
            title: title || "Амжилттай",
            color: "green",
            autoClose: 2000,
            icon: <TbCircleCheck size="1rem" />,
            message,
        });
    }, []);

    const error = useCallback(({ title, message }: NotifConfig) => {
        notifications.show({
            title: title || "Алдаа",
            color: "red",
            autoClose: 2000,
            icon: <TbAlertSmall />,
            message,
        });
    }, []);

    const warn = useCallback(({ title, message }: NotifConfig) => {
        notifications.show({
            title: title || "Амжилтгүй",
            color: "yellow",
            autoClose: 2000,
            icon: <TbAlertCircle size="1rem" />,
            message,
        });
    }, []);

    // const info = useCallback(({ title, message }: NotifConfig) => {
    //     notifications.show({
    //         title: title || "Амжилттай",
    //         color: "green",
    //         autoClose: 2000,
    //         icon: <TbCircleCheck size="1rem" />,
    //         message,
    //     });
    // }, []);

    const passValues = useMemo(() => ({
        successNotif: success,
        errorNotif: error,
        warnNotif: warn
    }), [success, error, warn]);

    return <NotificationContext.Provider value={passValues}>{children}</NotificationContext.Provider>;
}

export default NotificationProvider;
