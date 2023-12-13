import React, { useEffect, useState } from "react";
import {
  Box,
  Container as MuiContainer,
  styled,
  Typography,
  Divider,
} from "@mui/material";
import { Link, useParams } from "react-router-dom";
import { axiosInstance } from "../../services/axios";
import { AxiosResponse } from "axios";
import { Post } from "../../redux/types";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const Wrapper = styled(Box)(() => ({
  marginTop: "100px",
}));

const Container = styled(MuiContainer)(() => ({
  display: "flex",
  minHeight: "calc(100vh - 250px)",
  backgroundColor: "#f2f2f2",
  padding: "20px",
  borderRadius: "20px",
}));

const Photo = styled("img")(() => ({
  width: "100%",
  height: "100%",
  borderRadius: "10px",
}));

const PhotoBox = styled(Box)(() => ({
  width: "50%",
  marginTop: "25px",
}));

const ContentBox = styled(Box)(() => ({
  width: "50%",
  margin: "30px",
  "& > div": {
    margin: "20px",
  },
}));

const ArrowBox = styled(Box)(() => ({
  margin: "0 80px",
  a: {
    width: "20px",
    display: "flex",
    padding: "10px",
    color: "#000",
    "&:hover": {
      color: "#000",
      backgroundColor: "#f2f2f2",
      borderRadius: "10px",
    },
    "&:active": {
      color: "#000",
    },
  },
}));

function PostDetail() {
  const { postID } = useParams();
  const [post, setPost] = useState<Post>({
    id: "",
    file_url: " ",
    name: "",
    description: "",
  });

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response: AxiosResponse<any, any> = await axiosInstance(
          `/api/post/${postID}`,
        );
        return response?.data;
      } catch (e) {
        console.log(e);
      }
    };
    fetchPost().then((result) => {
      if (result) {
        setPost(result);
      }
    });
  }, []);

  return (
    <Wrapper>
      <ArrowBox>
        <Link to="/">
          <ArrowBackIcon />
        </Link>
      </ArrowBox>
      <Container disableGutters>
        <PhotoBox>
          <Box>
            <Photo src={post.file_url} alt="" />
          </Box>
        </PhotoBox>
        <ContentBox>
          <Box>
            <Typography variant="h1">{post.name}</Typography>
          </Box>
          <Divider />
          <Box>
            <Typography variant="subtitle1">{post.description}</Typography>
          </Box>
        </ContentBox>
      </Container>
    </Wrapper>
  );
}

export default PostDetail;
