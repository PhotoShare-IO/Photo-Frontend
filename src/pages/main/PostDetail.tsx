import React, { useEffect, useState } from "react";
import {
  Box,
  Container as MuiContainer,
  styled,
  Typography,
  Divider,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { axiosInstance } from "../../services/axios";
import { AxiosResponse } from "axios";
import { Post } from "../../redux/types";
import ArrowBackButton from "../../components/buttons/ArrowBackButton";

const Wrapper = styled(Box)(() => ({
  marginTop: "100px",
}));

const Container = styled(MuiContainer)(() => ({
  display: "flex",
  borderRadius: "20px",
}));

const Photo = styled("img")(() => ({
  width: "100%",
  height: "100%",
  maxHeight: "800px",
  borderRadius: "20px 0 0 20px",
}));

const PhotoBox = styled(Box)(() => ({
  width: "50%",
}));

const ContentBox = styled(Box)(() => ({
  width: "50%",
  textAlign: "center",
  boxShadow: "3px 0px 10px #f2f2f2",
  "& > div": {
    margin: "20px",
    padding: "20px",
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
      <ArrowBackButton />
      <Container disableGutters>
        <PhotoBox>
          <Box>
            <Photo src={post.file_url} alt="photo" />
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
