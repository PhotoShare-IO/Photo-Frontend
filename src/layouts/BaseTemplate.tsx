import {useEffect} from "react";
import {
  Box
} from "@mui/material";
import {Outlet} from "react-router-dom";
import {axiosInstance} from "../services/axios";
import {useDispatch, useSelector} from "react-redux";
import {selectUser, setCredentials} from "../redux/auth";

function BaseTemplate() {
  const user = useSelector(selectUser)
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user.id) {
      const fetchUser = async () => {
        try {
          const response = await axiosInstance.get("/api/auth/user/")
          dispatch(setCredentials(response?.data))
        } catch (e: unknown) {
          console.log(e)
        }
      }
      fetchUser();
    }
  }, [dispatch, user])

  return (
    <Box>
      <Outlet/>
    </Box>
  );
}

export default BaseTemplate;
