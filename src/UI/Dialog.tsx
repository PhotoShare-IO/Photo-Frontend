import React from "react";
import {
  Dialog,
  DialogContent,
  DialogProps,
  DialogTitle,
  Slide,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";

interface Props extends DialogProps {
  form: React.ReactElement<any, any>;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function CustomDialog({ form, title, ...rest }: Props) {
  return (
    <Dialog
      {...rest}
      TransitionComponent={Transition}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent sx={{ padding: "30px" }}>{form}</DialogContent>
    </Dialog>
  );
}

export default CustomDialog;
