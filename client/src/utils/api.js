import axios from "axios";
import store from "../store";
import { LOGOUT } from "../actions/types";

// Create an instance of axios
const api = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
  },
});

api.CancelToken = axios.CancelToken;
api.isCancel = axios.isCancel;

/*
  NOTE: intercept any error responses from the api
 and check if the token is no longer valid.
 ie. Token has expired or user is no longer
 authenticated.
 logout the user if the token has expired
*/

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response.status === 401) {
      store.dispatch({ type: LOGOUT });
    }
    return Promise.reject(err);
  }
);

export const getCsrfToken = async () => {
  const response = await axios.get("/api/csrf-token");
  return response.data.csrfToken;
};

api.get = async (url, config = {}) => {
  return await api.request({ url, method: "GET", ...config });
};

api.post = async (url, data = {}, config = {}) => {
  const csrfToken = await getCsrfToken();
  return await api.request({
    url,
    data,
    method: "POST",
    headers: { "X-CSRF-Token": csrfToken },
    ...config,
  });
};

api.put = async (url, data = {}, config = {}) => {
  const csrfToken = await getCsrfToken();
  return await api.request({
    url,
    data,
    method: "PUT",
    headers: { "X-CSRF-Token": csrfToken },
    ...config,
  });
};

api.patch = async (url, data = {}, config = {}) => {
  const csrfToken = await getCsrfToken();
  return await api.request({
    url,
    data,
    method: "PATCH",
    headers: { "X-CSRF-Token": csrfToken },
    ...config,
  });
};

api.delete = async (url, config = {}) => {
  const csrfToken = await getCsrfToken();
  return await api.request({
    url,
    method: "DELETE",
    headers: { "X-CSRF-Token": csrfToken },
    ...config,
  });
};

export default api;
