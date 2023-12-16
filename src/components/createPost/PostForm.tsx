import React, { useState } from "react";
import { Box, styled } from "@mui/material";
import { Formik } from "formik";
import TextField from "../../UI/TextField";
import * as Yup from "yup";
import LoadingButton from "@mui/lab/LoadingButton";
import ImportPhoto from "../../UI/ImportPhoto";
import { AxiosResponse } from "axios";
import { PostData } from "./types";
import { axiosInstance } from "../../services/axios";
import { useDispatch } from "react-redux";
import { createPost } from "../../redux/posts";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import fireStorage from "../../firebaseconfig";

const Wrapper = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
}));

const ImageFieldBox = styled(Box)(() => ({
  width: "35%",
  display: "flex",
  justifyContent: "center",
}));

const FormBox = styled(Box)(() => ({
  width: "60%",
  marginLeft: "10px",
}));

const SubmitButton = styled(LoadingButton)(() => ({
  height: "45px",
  fontWeight: 700,
  margin: "15px 0",
}));

function PostForm({
  setOpen,
}: {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [image, setImage] = useState<File | null>(null);
  const [percent, setPercent] = useState<number>(0);

  const dispatch = useDispatch();

  const initialValues = {
    name: "",
    desc: "",
  };

  const uploadFileToFireStorage = async ({
    name,
    desc,
  }: {
    name: string;
    desc: string;
  }) => {
    if (!image) return;
    const fireStorageRef = ref(fireStorage, `images/${image.name}`);
    const uploadTask = uploadBytesResumable(fireStorageRef, image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const percent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
        );
        // update progress
        setPercent(percent);
      },
      (err) => console.log(err),
      async () => {
        // download url
        const url = await getDownloadURL(uploadTask.snapshot.ref);
        if (url) {
          const response: AxiosResponse<PostData> = await axiosInstance.post(
            "api/post/create",
            {
              file_url: url,
              name,
              description: desc,
              album_id: 1,
              user_id: 1,
            },
          );
          if (response?.status === 201) {
            dispatch(createPost(response.data));
            setOpen(false);
          }
        }
      },
    );
  };

  return (
    <Wrapper>
      <ImageFieldBox>
        <ImportPhoto setImage={setImage} />
      </ImageFieldBox>
      <FormBox>
        <Formik
          initialValues={initialValues}
          validationSchema={Yup.object().shape({
            name: Yup.string().max(255).required("Name of post is required"),
          })}
          onSubmit={async (values, actions) => {
            try {
              uploadFileToFireStorage({
                name: values.name,
                desc: values.desc,
              });
            } catch (error) {
              console.log(error);
            }
            actions.setSubmitting(false);
          }}
        >
          {({
            values,
            handleBlur,
            handleChange,
            handleSubmit,
            isSubmitting,
            touched,
            errors,
          }) => (
            <form noValidate onSubmit={handleSubmit}>
              <h3>{percent}</h3>
              <TextField
                fullWidth
                value={values.name}
                type="text"
                name="name"
                variant="outlined"
                label="Name of post"
                onChange={handleChange}
                onBlur={handleBlur}
                error={Boolean(touched.name && errors.name)}
                helperText={touched.name && errors.name}
              />
              <TextField
                multiline
                fullWidth
                minRows={6}
                maxRows={12}
                value={values.desc}
                type="text"
                name="desc"
                variant="outlined"
                label="Post description"
                onChange={handleChange}
              />
              <SubmitButton
                fullWidth
                type="submit"
                variant="contained"
                color="primary"
                disabled={isSubmitting}
              >
                Create post
              </SubmitButton>
            </form>
          )}
        </Formik>
      </FormBox>
    </Wrapper>
  );
}

export default PostForm;
