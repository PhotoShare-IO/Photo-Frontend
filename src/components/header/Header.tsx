import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { Menu, MenuItem, styled } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { logOut, selectUser } from "../../redux/auth";
import { formatUserName } from "../../utils/formatUserName";
import { Link, useNavigate } from "react-router-dom";
import { AccountCircle } from "@mui/icons-material";
import { useState } from "react";
import CreatePost from "../createPost/CreatePost";

const HeaderBar = styled(AppBar)(() => ({
  boxShadow: "none",
  backgroundColor: "transparent",
  color: "#618c7b",
  backdropFilter: "blur(5px)",
  WebkitBackdropFilter: "blur(5px)",
  borderRadius: 0,
}));

function Header() {
  const [open, setOpen] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLogout = () => {
    dispatch(logOut());
    setAnchorEl(null);
    navigate("/auth/login");
  };

  const createPost = () => {
    setOpen(true);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <HeaderBar position="fixed">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <b>Ph-Sh</b>
          </Typography>
          {user && user.id ? (
            <>
              <Button
                sx={{ marginRight: "20px" }}
                variant="contained"
                onClick={createPost}
              >
                Create post
              </Button>
              <Typography>
                {formatUserName(user?.first_name, user?.last_name)}
              </Typography>
              <Box sx={{ marginLeft: "15px" }}>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorEl)}
                  onClose={() => setAnchorEl(null)}
                >
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
              </Box>
              <CreatePost open={open} setOpen={setOpen} />
            </>
          ) : (
            <>
              <Box sx={{ marginRight: "15px" }}>
                <Button variant="contained" color="primary">
                  <Link
                    style={{ color: "inherit", textDecoration: "none" }}
                    to="/auth/login"
                  >
                    Login
                  </Link>
                </Button>
              </Box>
              <Box>
                <Button variant="contained" color="primary">
                  <Link
                    style={{ color: "inherit", textDecoration: "none" }}
                    to="/auth/register"
                  >
                    Register
                  </Link>
                </Button>
              </Box>
            </>
          )}
        </Toolbar>
      </HeaderBar>
    </Box>
  );
}

export default Header;
