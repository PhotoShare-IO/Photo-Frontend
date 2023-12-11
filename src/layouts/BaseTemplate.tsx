import React, { useEffect } from "react";
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import { AxiosResponse } from "axios";
import { LoginData, User } from "../redux/types";
import { axiosInstance } from "../services/axios";
import { selectUser, setCredentials } from "../redux/auth";
import { useDispatch, useSelector } from "react-redux";

function BaseTemplate() {
  const user: User = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user.id) {
      const fetchUser = async () => {
        try {
          const response: AxiosResponse<LoginData> =
            await axiosInstance.get("/api/auth/user/");
          dispatch(setCredentials(response?.data));
        } catch (e: unknown) {
          console.log(e);
        }
      };
      fetchUser().then();
    }
  }, [dispatch, user]);

  return (
    <Box>
      <Outlet />
    </Box>
  );
}

export default BaseTemplate;
