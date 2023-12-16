import { axiosInstance } from "../../services/axios";
import { Dispatch, SetStateAction } from "react";
import { ResetPassword } from "../../redux/types";
import { AxiosResponse } from "axios";

export const resetPassword = async (
  email: string,
  setErrorMessage: Dispatch<SetStateAction<string>>,
): Promise<AxiosResponse<ResetPassword> | undefined> => {
  try {
    delete axiosInstance.defaults.headers.common.Authorization;
    const response = await axiosInstance.post("/api/auth/password-reset/", {
      email,
    });
    return response;
  } catch (e: any) {
    setErrorMessage(e?.response?.data?.detail);
  }
};
