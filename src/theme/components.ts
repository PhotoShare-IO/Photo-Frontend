import { COLORS } from "./colors";

export const components = {
  MuiButtonBase: {
    defaultProps: {
      disableRipple: true,
    },
  },
  MuiButton: {
    styleOverrides: {
      containedPrimary: {
        border: "none",
        boxShadow: "none",
        borderRadius: "10px",
        backgroundColor: COLORS.main,
        color: "#fff",
        "&:hover": {
          boxShadow: "none",
          backgroundColor: COLORS.mainHover,
        },
        "&:active": {
          backgroundColor: COLORS.mainActive,
          transform: "scale(0.97)",
        },
      },
    },
  },
  MuiInputBase: {
    styleOverrides: {
      input: {
        position: "relative",
        borderRadius: 40,
        padding: "10px 15px",
        border: `2px solid ${COLORS.gray}`,
        "&:hover, &:focus": {
          borderColor: COLORS.grayHover,
        },
      },
      multiline: {
        "& textarea": {
          borderRadius: 15,
        },
      },
    },
  },
  MuiInputLabel: {
    styleOverrides: {
      root: {
        fontSize: "16px",
      },
    },
  },
  MuiPaper: {
    styleOverrides: {
      root: {
        borderRadius: "20px",
      },
    },
  },
};
