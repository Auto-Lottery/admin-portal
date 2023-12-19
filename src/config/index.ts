import axios from "axios";
export const clientRequest = axios.create({});

clientRequest.interceptors.request.use(
  (config: any) => {
    // Do something before request is sent
    if (typeof window !== "undefined") {
      const loggedDataStr = localStorage.getItem("loggedData");

      if (!loggedDataStr) {
        return config;
      }
      try {
        const loggedData = JSON.parse(loggedDataStr);
        return {
          ...config,
          headers: {
            ...config.headers,
            Authorization: loggedData?.token
              ? `Bearer ${loggedData.token}`
              : null,
          },
        };
      } catch (err) {
        return config;
      }
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
    if (response.status === 401) {
      localStorage.removeItem("loggedData");
      window.location.reload();
      return response.data;
    }
    return response.data;
  },
  function (error) {
    return Promise.reject(error);
  }
);
