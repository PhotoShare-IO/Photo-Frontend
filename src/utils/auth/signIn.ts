import { axiosInstance } from "../../services/axios";
import { setCredentials } from "../../redux/auth";
import { Dispatch, SetStateAction } from "react";
import { LoginData, setCredentialsAction } from "../../redux/types";
import { AxiosResponse } from "axios";

export const signIn = async (
  email: string,
  password: string,
  dispatch: Dispatch<setCredentialsAction>,
  setErrorMessage: Dispatch<SetStateAction<string>>,
): Promise<AxiosResponse<LoginData> | undefined> => {
  try {
    delete axiosInstance.defaults.headers.common.Authorization;
    const response = await axiosInstance.post("/api/auth/login/", {
      email,
      password,
    });
    dispatch(setCredentials(response.data));
    return response;
  } catch (e: any) {
    setErrorMessage(e?.response?.data?.detail);
  }
};
