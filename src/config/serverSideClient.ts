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
  function (error) {
    return Promise.reject(error);
  }
);

serverSideRequest.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    return Promise.reject(error);
  }
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

const post = async (url: string, data: any, config?: any) => {
  return responseChecker(serverSideRequest.post(url, data, config));
};

const get = (url: string, config?: any) => {
  return responseChecker(serverSideRequest.get(url, config));
};

const ssrRequests = {
  post,
  get,
};
export { ssrRequests };
