import axios, { AxiosError, AxiosResponse } from "axios";

// export const initData = window?.Telegram?.WebApp?.initData;
export const initData = "query_id=AAGY74MOAwAAAJjvgw5wTIwH&user=%7B%22id%22%3A6685978520%2C%22first_name%22%3A%22EriK%20%F0%9F%8E%A7%22%2C%22last_name%22%3A%22%22%2C%22username%22%3A%22ERKDEV%22%2C%22language_code%22%3A%22en%22%2C%22allows_write_to_pm%22%3Atrue%7D&auth_date=1726731783&hash=9188ed4d191e52e7b3edfff22c44e9773f2d69a434ac9dba11b700ebd3ad8e01";

const token = window?.localStorage?.getItem('token');

const request = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 300000,
  headers: {
    auth: initData,
    Authorization : `Bearer ${token}` ,
  },
});

const errorHandler = (
    error: AxiosError
): Promise<AxiosResponse | undefined> => {
  const statusCode = error?.response?.status;

  if (statusCode === 401 && !window.location.href.includes('/language')) {

    window.localStorage.removeItem('token');

    window.location.href = '/unregistered';
  }

  return Promise.reject(error?.response);
};

request.interceptors.request.use(
  (config) => config,
  (error) => errorHandler(error)
);

request.interceptors.response.use((response) => {
  return response.data;
}, errorHandler);

export default request;
