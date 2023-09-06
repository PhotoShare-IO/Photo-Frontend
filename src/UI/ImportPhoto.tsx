import React, { ChangeEvent, useState } from "react";
import { Box, InputLabel, styled, Typography } from "@mui/material";
import { COLORS } from "../theme/colors";
import ImageTwoToneIcon from "@mui/icons-material/ImageTwoTone";

const ImportField = styled("input")(() => ({
  display: "none",
}));

const UploadLabel = styled(InputLabel)(() => ({
  cursor: "pointer",
  width: "250px",
  height: "350px",
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
}));

const ImageIcon = styled(ImageTwoToneIcon)(() => ({
  fontSize: "32px",
  color: COLORS.gray,
}));

const Text = styled(Typography)(() => ({
  color: COLORS.gray,
}));

function ImportPhoto() {
  const [image, setImage] = useState<string>(" ");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const image = e.target.files?.[0];
    if (image) {
      const imageUrl = URL.createObjectURL(image);
      console.log(imageUrl);
      setImage(imageUrl);
    }
  };

  return (
    <UploadLabel htmlFor="file">
      <InputContent>
        <ImageIcon />
        <Text variant="h4">Upload the image</Text>
        <img src={image} alt="" />
      </InputContent>
      <ImportField
        id="file"
        type="file"
        accept="image/*"
        onChangeCapture={handleChange}
      />
    </UploadLabel>
  );
}

export default ImportPhoto;
