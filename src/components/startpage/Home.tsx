import React from "react";
import { Box, styled, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, setCredentials } from "../../redux/auth";
import { useEffect } from "react";
import { axiosInstance } from "../../services/axios";
import HomepageSearchInput from "../../UI/HomepageSearchInput";
import { AxiosResponse } from "axios";
import { LoginData, Post, User } from "../../redux/types";
import { fetchPosts, selectPosts } from "../../redux/posts";

const StartImage = styled("img")(() => ({
  width: "100vw",
  height: "62vh",
  position: "absolute",
  zIndex: -1,
}));

const ImageBox = styled(Box)(() => ({
  position: "relative",
  width: "100vw",
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
  const user: User = useSelector(selectUser);
  const dispatch = useDispatch();
  const posts: Post[] = useSelector(selectPosts);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    dispatch(fetchPosts()); // TODO: remove ts-ignore
  }, [dispatch]);

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
      fetchUser();
    }
  }, [dispatch, user]);

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
            <Image src={post?.file_url} alt="Picture" />
          </Item>
        ))}
        {/*<Item>*/}
        {/*  <Image*/}
        {/*    src="https://firebasestorage.googleapis.com/v0/b/photo-share-938f3.appspot.com/o/images%2Fadam-davis-ZHGh3WaaTf4-unsplash.jpg?alt=media&token=6a1ca322-d701-4ffe-a071-b85f96c104c0"*/}
        {/*    alt=""/>*/}
        {/*</Item>*/}
        {/*<Item>*/}
        {/*  <Image*/}
        {/*    src="https://firebasestorage.googleapis.com/v0/b/photo-share-938f3.appspot.com/o/images%2Fandrew-haimerl-IthnAY5oztk-unsplash.jpg?alt=media&token=3727875f-8fe3-46c0-9279-ba94949bbae5"*/}
        {/*    alt=""/>*/}
        {/*</Item>*/}
        {/*<Item>*/}
        {/*  <Image*/}
        {/*    src="https://firebasestorage.googleapis.com/v0/b/photo-share-938f3.appspot.com/o/images%2Fbruno-guerrero-E78O9UPHo-s-unsplash.jpg?alt=media&token=acc99d5b-f7bc-4221-bcf1-ac90367f534c"*/}
        {/*    alt=""/>*/}
        {/*</Item>*/}
        {/*<Item>*/}
        {/*  <Image*/}
        {/*    src="https://firebasestorage.googleapis.com/v0/b/photo-share-938f3.appspot.com/o/images%2Fadam-davis-ZHGh3WaaTf4-unsplash.jpg?alt=media&token=6a1ca322-d701-4ffe-a071-b85f96c104c0"*/}
        {/*    alt=""/>*/}
        {/*</Item>*/}
        {/*<Item>*/}
        {/*  <Image*/}
        {/*    src="https://firebasestorage.googleapis.com/v0/b/photo-share-938f3.appspot.com/o/images%2Fandrew-haimerl-IthnAY5oztk-unsplash.jpg?alt=media&token=3727875f-8fe3-46c0-9279-ba94949bbae5"*/}
        {/*    alt=""/>*/}
        {/*</Item>*/}
        {/*<Item>*/}
        {/*  <Image*/}
        {/*    src="https://firebasestorage.googleapis.com/v0/b/photo-share-938f3.appspot.com/o/images%2Fbruno-guerrero-E78O9UPHo-s-unsplash.jpg?alt=media&token=acc99d5b-f7bc-4221-bcf1-ac90367f534c"*/}
        {/*    alt=""/>*/}
        {/*</Item>*/}
        {/*<Item>*/}
        {/*  <Image*/}
        {/*    src="https://firebasestorage.googleapis.com/v0/b/photo-share-938f3.appspot.com/o/images%2Fadam-davis-ZHGh3WaaTf4-unsplash.jpg?alt=media&token=6a1ca322-d701-4ffe-a071-b85f96c104c0"*/}
        {/*    alt=""/>*/}
        {/*</Item>*/}
        {/*<Item>*/}
        {/*  <Image*/}
        {/*    src="https://firebasestorage.googleapis.com/v0/b/photo-share-938f3.appspot.com/o/images%2Fandrew-haimerl-IthnAY5oztk-unsplash.jpg?alt=media&token=3727875f-8fe3-46c0-9279-ba94949bbae5"*/}
        {/*    alt=""/>*/}
        {/*</Item>*/}
        {/*<Item>*/}
        {/*  <Image*/}
        {/*    src="https://firebasestorage.googleapis.com/v0/b/photo-share-938f3.appspot.com/o/images%2Fbruno-guerrero-E78O9UPHo-s-unsplash.jpg?alt=media&token=acc99d5b-f7bc-4221-bcf1-ac90367f534c"*/}
        {/*    alt=""/>*/}
        {/*</Item>*/}
        {/*<Item>*/}
        {/*  <Image*/}
        {/*    src="https://firebasestorage.googleapis.com/v0/b/photo-share-938f3.appspot.com/o/images%2Fadam-davis-ZHGh3WaaTf4-unsplash.jpg?alt=media&token=6a1ca322-d701-4ffe-a071-b85f96c104c0"*/}
        {/*    alt=""/>*/}
        {/*</Item>*/}
        {/*<Item>*/}
        {/*  <Image*/}
        {/*    src="https://firebasestorage.googleapis.com/v0/b/photo-share-938f3.appspot.com/o/images%2Fandrew-haimerl-IthnAY5oztk-unsplash.jpg?alt=media&token=3727875f-8fe3-46c0-9279-ba94949bbae5"*/}
        {/*    alt=""/>*/}
        {/*</Item>*/}
        {/*<Item>*/}
        {/*  <Image*/}
        {/*    src="https://firebasestorage.googleapis.com/v0/b/photo-share-938f3.appspot.com/o/images%2Fbruno-guerrero-E78O9UPHo-s-unsplash.jpg?alt=media&token=acc99d5b-f7bc-4221-bcf1-ac90367f534c"*/}
        {/*    alt=""/>*/}
        {/*</Item>*/}
        {/*<Item>*/}
        {/*  <Image*/}
        {/*    src="https://firebasestorage.googleapis.com/v0/b/photo-share-938f3.appspot.com/o/images%2Fadam-davis-ZHGh3WaaTf4-unsplash.jpg?alt=media&token=6a1ca322-d701-4ffe-a071-b85f96c104c0"*/}
        {/*    alt=""/>*/}
        {/*</Item>*/}
        {/*<Item>*/}
        {/*  <Image*/}
        {/*    src="https://firebasestorage.googleapis.com/v0/b/photo-share-938f3.appspot.com/o/images%2Fandrew-haimerl-IthnAY5oztk-unsplash.jpg?alt=media&token=3727875f-8fe3-46c0-9279-ba94949bbae5"*/}
        {/*    alt=""/>*/}
        {/*</Item>*/}
        {/*<Item>*/}
        {/*  <Image*/}
        {/*    src="https://firebasestorage.googleapis.com/v0/b/photo-share-938f3.appspot.com/o/images%2Fbruno-guerrero-E78O9UPHo-s-unsplash.jpg?alt=media&token=acc99d5b-f7bc-4221-bcf1-ac90367f534c"*/}
        {/*    alt=""/>*/}
        {/*</Item>*/}
      </Container>
    </Box>
  );
}

export default Home;
