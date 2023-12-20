import axios from "axios";
export const clientRequest = axios.create({});

clientRequest.interceptors.request.use(
  (config: any) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");

      return {
        ...config,
        headers: {
          ...config.headers,
          Authorization: token ? `Bearer ${token}` : null,
        },
      };
    }
    return config;
  },
  function (error) {
    // Do something with request error

    return Promise.reject(error);
  }
);

// Add a response interceptor
clientRequest.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    return Promise.reject(error);
  }
);
