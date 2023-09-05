import { axiosInstance } from "../../services/axios";
import { AxiosResponse } from "axios";
import { Dispatch, SetStateAction } from "react";

interface RegisterData {
  id: number;
  email: string;
  first_name?: string;
  last_name?: string;
  tokens: {
    access: string;
    refresh: string;
  };
}

export const signUp = async (
  username: string,
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  setErrorMessage: Dispatch<SetStateAction<string>>,
): Promise<AxiosResponse<RegisterData> | undefined> => {
  try {
    delete axiosInstance.defaults.headers.common.Authorization;
    const response = await axiosInstance.post("/api/auth/register/", {
      username,
      first_name: firstName,
      last_name: lastName,
      email,
      password,
    });
    return response;
  } catch (e: any) {
    setErrorMessage(e?.response?.data?.detail);
  }
};
