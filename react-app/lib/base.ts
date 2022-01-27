import axios, { Method } from "axios";

export async function runAsync(promise: Promise<any>) {
  try {
    const data = await promise;
    return [data, null];
  } catch (err) {
    return [null, err];
  }
}

export const axiosBaseInstance = () => {
  return axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_API_BASE_URL,
  });
};

export const fetchFromAPI = async (
  endpointURL: string,
  opts: {
    method: Method;
    data?: any;
    token?: string;
    withCredentials?: boolean;
  }
) => {
  const api = axiosBaseInstance();
  const { method, data, token, withCredentials } = { ...opts };

  return await runAsync(
    api(endpointURL, {
      method,
      data,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      withCredentials: withCredentials,
    })
  );
};
