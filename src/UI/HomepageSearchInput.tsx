import React from "react";
import { Autocomplete, styled, TextField } from "@mui/material";
// import SearchIcon from "@mui/icons-material/Search";

type Props = {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  items: any[];
};

const SearchInput = styled(TextField)(() => ({
  backgroundColor: "#fff",
  borderRadius: 5,
  "& .MuiFormLabel-root": {
    "&:focus, &:active": {
      color: "#000",
    },
  },
  "& .MuiInputBase-root": {
    border: "3px solid #fff",
    borderRadius: 5,
    fontSize: "16px",
    "&.Mui-focused": {
      border: "3px solid #000",
    },
  },
  "& .MuiInputBase-input": {
    border: "none",
  },
  "& .MuiOutlinedInput-notchedOutline": {
    border: "none",
  },
}));

function HomepageSearchInput({ value, setValue, items }: Props) {
  return (
    <Autocomplete
      sx={{ width: "60%" }}
      id="main-search-input"
      freeSolo
      inputValue={value}
      onInputChange={(event, newInputValue) => {
        setValue(newInputValue);
      }}
      value=""
      options={items?.map((option) => option.name)}
      renderInput={(params: any) => (
        <SearchInput
          {...params}
          placeholder="Search..."
          // InputProps={{
          //   startAdornment: (
          //     <InputAdornment position="start">
          //       <SearchIcon />
          //     </InputAdornment>
          //   ),
          // }}
        />
      )}
    />
  );
}

export default HomepageSearchInput;
