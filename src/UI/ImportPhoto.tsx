import React, { useRef, useEffect } from "react";
import { Box, InputLabel, styled, Typography } from "@mui/material";
import { COLORS } from "../theme/colors";
import ImageTwoToneIcon from "@mui/icons-material/ImageTwoTone";
import { useDropzone } from "react-dropzone";

const UploadLabel = styled(InputLabel)(() => ({
  cursor: "pointer",
  width: "250px",
  height: "350px",
  textAlign: "center",
  backgroundColor: COLORS.lightGray,
  border: `2px dashed ${COLORS.gray}`,
  borderRadius: 15,
  "&:hover, &:focus": {
    border: "2px dashed #5d5d5f",
    "& .MuiTypography-root": {
      color: "#5d5d5f",
    },
    "& .MuiSvgIcon-root": {
      color: "#5d5d5f",
    },
  },
}));

const InputContent = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "100%",
  backgroundPosition: "center",
  backgroundSize: "cover",
}));

const ImageIcon = styled(ImageTwoToneIcon)(() => ({
  fontSize: "32px",
  color: COLORS.gray,
}));

const Text = styled(Typography)(() => ({
  color: COLORS.gray,
}));

function ImportPhoto() {
  const inputContent: React.MutableRefObject<HTMLElement | null> = useRef(null);
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/jpeg": [],
      "image/png": [],
    },
  });

  useEffect(() => {
    setPhoto(acceptedFiles[0]);
  }, [acceptedFiles]);

  const setPhoto = (image: File | undefined) => {
    if (image && inputContent.current) {
      inputContent.current.style.backgroundImage = `url(${URL.createObjectURL(
        image,
      )})`;
      inputContent.current.textContent = "";
      inputContent.current.style.border = "0";
    }
  };

  return (
    <UploadLabel htmlFor="image-file">
      <InputContent {...getRootProps()} ref={inputContent} id="image-content">
        <ImageIcon />
        <Text variant="h4">
          Drag and drop or click here
          <br />
          to upload the image
        </Text>
        <br />
        <Text variant="body2">Upload any images from desktop</Text>
      </InputContent>
      <input {...getInputProps()} />
    </UploadLabel>
  );
}

export default ImportPhoto;
