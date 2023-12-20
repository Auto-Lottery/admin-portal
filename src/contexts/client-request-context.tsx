"use client";

import { clientRequest } from "@/config";
import { notifications } from "@mantine/notifications";
import { AxiosError } from "axios";
import React, { ReactNode, createContext, useContext } from "react";
import { TbAlertCircle, TbAlertSmall } from "react-icons/tb";

interface ClientRequestContextType {
  postRequest: (url: string, data?: any, config?: any) => Promise<any | null>;
  getRequest: (url: string, config?: any) => Promise<any | null>;
}

const ClientRequestContext = createContext<ClientRequestContextType>({
  postRequest: (url: string, data?: any, config?: any) => {
    return Promise.resolve(null);
  },
  getRequest: (url: string, config?: any) => {
    return Promise.resolve(null);
  },
});

export const useClientRequest = () => {
  const context = useContext(ClientRequestContext);
  return context;
};

function ClientRequestProvider({ children }: { children: ReactNode }) {
  const responseChecker = async (response: Promise<any>) => {
    try {
      const result: any = await response;
      if (result.code === 200) {
        return result.data;
      }
      notifications.show({
        title: "Амжилтгүй",
        color: "yellow",
        autoClose: 2000,
        icon: <TbAlertCircle size="1rem" />,
        message: result.message || "",
      });
      return null;
    } catch (err: any) {
      if (err instanceof AxiosError) {
        if (err.response?.status === 401) {
          // window.location.reload();
        }
      }
      notifications.show({
        title: err.response?.statusText || "Алдаа",
        color: "red",
        autoClose: 2000,
        icon: <TbAlertSmall />,
        message: "Системийн админд хандана уу!",
      });
      return null;
    }
  };

  const postRequest = (url: string, data: any, config?: any): any => {
    return responseChecker(clientRequest.post(url, data, config));
  };

  const getRequest = (url: string, config?: any) => {
    return responseChecker(clientRequest.get(url, config));
  };

  return (
    <ClientRequestContext.Provider
      value={{
        postRequest,
        getRequest,
      }}
    >
      {children}
    </ClientRequestContext.Provider>
  );
}

export default ClientRequestProvider;
