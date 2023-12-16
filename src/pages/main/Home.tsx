import React, { useState } from "react";
import { Box, styled, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import HomepageSearchInput from "../../UI/HomepageSearchInput";
import { Post } from "../../redux/types";
import { fetchPosts, selectPosts } from "../../redux/posts";
import { useNavigate } from "react-router-dom";
import { useSearch } from "../../hooks/useSearch";

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

const Container = styled(Box)(() => ({
  padding: "20px",
  columns: 6,
  columnGap: "20px",
  "@media (max-width: 1500px)": {
    width: "calc(100% - 40px)",
    columns: 4,
  },
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

const Wrapper = styled(Box)(() => ({
  marginTop: "150px",
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
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

  const [searchValue, setSearhValue] = useState<string>("");
  const [results] = useSearch(posts, searchValue, "name");

  const navigate = useNavigate();

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    dispatch(fetchPosts()); // TODO: remove ts-ignore
  }, [dispatch]);

  const filteredPosts = () => {
    return results?.map((post: Post, idx) => (
      <Item key={idx}>
        <Image
          sx={{ cursor: "pointer" }}
          onClick={() => navigate(`post/${post?.id}`)}
          src={post?.file_url}
          alt="Picture"
        />
      </Item>
    ));
  };

  return (
    <Box>
      <ImageBox>
        <StartImage src="/images/homepage.jpg" alt="" />
        <Wrapper sx={{}}>
          <Typography variant="h2" sx={{ textAlign: "center" }}>
            Wallpapers
          </Typography>
          <Typography variant="h4" p={3} sx={{ textAlign: "center" }}>
            From epic drone shots to inspiring moments in nature — submit your
            best desktop and mobile backgrounds.
          </Typography>
          <HomepageSearchInput
            value={searchValue}
            setValue={setSearhValue}
            items={posts}
          />
        </Wrapper>
      </ImageBox>
      <Container>{filteredPosts()}</Container>
    </Box>
  );
}

export default Home;
