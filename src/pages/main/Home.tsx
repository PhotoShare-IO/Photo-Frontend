import React from "react";
import { Box, styled, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import HomepageSearchInput from "../../UI/HomepageSearchInput";
import { Post } from "../../redux/types";
import { fetchPosts, selectPosts } from "../../redux/posts";
import { useNavigate } from "react-router-dom";

const StartImage = styled("img")(() => ({
  width: "100%",
  height: "62vh",
  position: "absolute",
  zIndex: -1,
}));

const ImageBox = styled(Box)(() => ({
  position: "relative",
  width: "100%",
  height: "62vh",
  marginBottom: "30px",
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
}));

const LogoImage = styled("img")(() => ({
  color: "#fff", // TODO: change logo color to white (error)
  width: "400px",
  marginBottom: "60px",
}));

const Container = styled(Box)(() => ({
  padding: "20px",
  columns: 4,
  columnGap: "20px",
  "@media (max-width: 1200px)": {
    width: "calc(100% - 40px)",
    columns: 3,
  },
  "@media (max-width: 768px)": {
    columns: 2,
  },
  "@media (max-width: 480px)": {
    columns: 1,
  },
}));

const Item = styled(Box)(() => ({
  width: "100%",
  marginBottom: "10px",
}));

const Image = styled("img")(() => ({
  maxWidth: "100%",
  borderRadius: "15px",
}));

function Home() {
  const dispatch = useDispatch();
  const posts: Post[] = useSelector(selectPosts);

  const navigate = useNavigate();

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    dispatch(fetchPosts()); // TODO: remove ts-ignore
  }, [dispatch]);

  return (
    <Box>
      <ImageBox>
        <StartImage src="/images/homepage.jpg" alt="" />
        <Box sx={{ marginTop: "150px" }}>
          <Typography sx={{ textAlign: "center" }}>
            <LogoImage src="/images/logo.svg" alt="logo" />
          </Typography>
          <HomepageSearchInput />
        </Box>
      </ImageBox>
      <Container>
        {posts?.map((post: Post, idx) => (
          <Item key={idx}>
            <Image
              sx={{ cursor: "pointer" }}
              onClick={() => navigate(`post/${post?.id}`)}
              src={post?.file_url}
              alt="Picture"
            />
          </Item>
        ))}
      </Container>
    </Box>
  );
}

export default Home;
