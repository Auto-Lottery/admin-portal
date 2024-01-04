/* eslint-disable @typescript-eslint/no-explicit-any */
import { getLoggedUserCookie } from "@/services/auth-service";
import axios, { AxiosError } from "axios";
import { redirect } from "next/navigation";

const serverSideRequest = axios.create({});

serverSideRequest.interceptors.request.use(
  (config: any) => {
    try {
      const loggedUserData = getLoggedUserCookie();
      return {
        ...config,
        headers: {
          ...config.headers,
          Authorization: loggedUserData?.token
            ? `Bearer ${loggedUserData.token}`
            : null,
        },
      };
    } catch (err) {
      return config;
    }
  },
  (error) => Promise.reject(error)
);

serverSideRequest.interceptors.response.use(
  (response) => response.data,
  (error) => Promise.reject(error)
);

const responseChecker = async (request: Promise<any>) => {
  try {
    const res = await request;
    return res;
  } catch (error) {
    if (error instanceof AxiosError) {
      const { response } = error;
      if (response?.status === 401) {
        return redirect("/logout");
      }
    }
    return Promise.reject(error);
  }
};

const post = async (url: string, data: any, config?: any) =>
  responseChecker(serverSideRequest.post(url, data, config));

const get = (url: string, config?: any) =>
  responseChecker(serverSideRequest.get(url, config));

const ssrRequests = {
  post,
  get,
};
export { ssrRequests };
