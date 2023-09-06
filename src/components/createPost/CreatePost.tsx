import React, { Dispatch, SetStateAction } from "react";
import CustomDialog from "../../UI/Dialog";
import PostForm from "./PostForm";

interface Props {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

function CreatePost({ open, setOpen }: Props) {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <CustomDialog
      fullWidth
      maxWidth="md"
      open={open}
      setOpen={setOpen}
      onClose={handleClose}
      form={<PostForm />}
    />
  );
}

export default CreatePost;
