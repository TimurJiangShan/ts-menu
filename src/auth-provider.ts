export const localStorageKey = "__auth_provider_token__";

export interface User {
  name: string;
  token: string;
}

export const getToken = () => window.localStorage.getItem(localStorageKey);

export const handleUserResponse = ({ data }: { data: User }) => {
  window.localStorage.setItem(localStorageKey, data?.token || "");
  return data;
};

export const login = (data: { username: string; password: string }) => {
  return fetch(`http://localhost:8000/user/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then(async (response) => {
    if (response.ok) {
      return handleUserResponse(await response.json());
    } else {
      return Promise.reject(await response.json());
    }
  });
};

export const register = (data: { username: string; password: string }) => {
  return fetch(`http://localhost:8000/user/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then(async (response) => {
    if (response.ok) {
      return handleUserResponse(await response.json());
    } else {
      return Promise.reject(await response.json());
    }
  });
};

export const logout = async () =>
  window.localStorage.removeItem(localStorageKey);
