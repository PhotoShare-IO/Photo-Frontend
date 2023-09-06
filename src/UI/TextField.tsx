import React from "react";
import {
  Box,
  FormControl,
  InputBase,
  InputBaseProps,
  Typography,
} from "@mui/material";
import { COLORS } from "../theme/colors";
import ErrorIcon from "@mui/icons-material/Error";

interface Props extends InputBaseProps {
  label?: string;
  helperText?: string | false;
  variant: "standard" | "filled" | "outlined";
  fullWidth?: boolean;
}

function TextField({ label, helperText, variant, fullWidth, ...rest }: Props) {
  return (
    <FormControl
      sx={{ marginTop: "5px" }}
      fullWidth={fullWidth}
      variant={variant}
    >
      <Typography sx={{ marginLeft: "10px" }} variant="body2">
        {label}
      </Typography>
      <InputBase
        sx={
          helperText
            ? { "& .MuiInputBase-input": { borderColor: COLORS.red } }
            : {}
        }
        {...rest}
      />
      <Typography
        component="div"
        sx={{ marginLeft: "10px", color: COLORS.red }}
        variant="body2"
      >
        {helperText ? (
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <ErrorIcon sx={{ fontSize: "14px", padding: "2px" }} />
            {helperText}
          </Box>
        ) : null}
      </Typography>
    </FormControl>
  );
}

export default TextField;
