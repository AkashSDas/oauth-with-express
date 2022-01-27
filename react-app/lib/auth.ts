import { fetchFromAPI } from "./base";

export const login = async () => {
  return fetchFromAPI("/auth/login/google", { method: "GET" });
};
