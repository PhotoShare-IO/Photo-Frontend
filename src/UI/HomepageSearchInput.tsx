import React from "react";
import { Autocomplete, styled } from "@mui/material";
import TextField from "./TextField";
import SearchIcon from "@mui/icons-material/Search";
import { COLORS } from "../theme/colors";

const SearchInput = styled(Autocomplete)(() => ({
  backgroundColor: "#fff",
  borderRadius: 5,
  "& .MuiFormControl-root": {
    margin: 0,
  },
  "& .MuiInputBase-root": {
    borderRadius: 5,
    border: "2px solid #fff",
    "&:focus": {
      // TODO: add focus border of main color
      borderColor: COLORS.main,
    },
  },
  "& .MuiInputBase-input": {
    fontSize: "16px",
    width: "700px",
    border: "none",
    padding: "13px",
    "&:hover, &:focus": {
      borderColor: "none",
    },
  },
  "& .MuiSvgIcon-root": {
    marginLeft: "10px",
  },
}));

function HomepageSearchInput() {
  return (
    <SearchInput
      id="main-search-input"
      freeSolo
      options={[]}
      renderInput={(params: any) => (
        <TextField
          {...params}
          startAdornment={<SearchIcon />}
          placeholder="Search images"
        />
      )}
    />
  );
}

export default HomepageSearchInput;
