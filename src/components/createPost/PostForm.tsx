import React from "react";
import { Box, styled } from "@mui/material";
import { Formik } from "formik";
import TextField from "../../UI/TextField";
import * as Yup from "yup";
import LoadingButton from "@mui/lab/LoadingButton";
import ImportPhoto from "../../UI/ImportPhoto";

const Wrapper = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
}));

const ImageFieldBox = styled(Box)(() => ({
  width: "40%",
  margin: "20px 0",
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

function PostForm() {
  const initialValues = {
    name: "",
    description: "",
  };

  return (
    <Wrapper>
      <ImageFieldBox>
        <ImportPhoto />
      </ImageFieldBox>
      <FormBox>
        <Formik
          initialValues={initialValues}
          validationSchema={Yup.object().shape({
            name: Yup.string().max(255).required("Name of post is required"),
          })}
          onSubmit={() => {}}
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
                value={values.description}
                type="text"
                name="description"
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
