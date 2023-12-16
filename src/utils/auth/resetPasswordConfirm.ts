import { axiosInstance } from "../../services/axios";
import { Dispatch, SetStateAction } from "react";
import { AxiosResponse } from "axios";
import { ResetPasswordConfirm } from "../../redux/types";

export const resetPasswordConfirm = async (
  password: string,
  uid64: string,
  token: string,
  setErrorMessage: Dispatch<SetStateAction<string>>,
): Promise<AxiosResponse<ResetPasswordConfirm> | undefined> => {
  try {
    delete axiosInstance.defaults.headers.common.Authorization;
    const response = await axiosInstance.post(
      "/api/auth/password-reset-confirm/",
      {
        password,
        uid64,
        token,
      },
    );
    return response;
  } catch (e: any) {
    setErrorMessage(e?.response?.data?.detail);
  }
};
