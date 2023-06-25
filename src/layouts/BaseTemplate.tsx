import { ReactNode, useState } from "react";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  TextField,
  Toolbar,
  Tooltip,
  Typography,
  styled,
} from "@mui/material";
import { Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { selectUser } from "../redux/user";
import { useSelector } from "react-redux";

interface Props {
  children?: ReactNode;
}

const pages = ["Home"];

const Header = styled(AppBar)(() => ({
  boxShadow: "none",
}));

const Navigation = styled(Toolbar)(() => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
}));

const Search = styled(TextField)(() => ({
  width: "80%",
}));

function BaseTemplate({ children }: Props) {
  const { signOut }: any = useAuth();
  const { user }: any = useSelector(selectUser);
  console.log(user);

  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleProfile = () => {
    setAnchorElUser(null);
  };

  const handleLogout = async () => {
    await signOut();
    setAnchorElUser(null);
  };

  return (
    <Box>
      <Header position="fixed" color="transparent">
        <Navigation>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/home"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              Ph-Sh
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map((page) => (
                <Button
                  key={page}
                  onClick={() => {}}
                  sx={{ my: 2, color: "#000", display: "block" }}
                >
                  {page}
                </Button>
              ))}
            </Box>
          </Box>
          <Search type="text" name="search" label="Search..." />
          <Box>
            <Typography variant="subtitle2">{user.first_name || "username"}</Typography>
          </Box>
          <Box>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar
                  alt="V"
                  src="https://i.pinimg.com/564x/b4/2b/71/b42b71dc24ff00054af6dfbb58f809a1.jpg"
                />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem onClick={handleProfile}>
                <Typography textAlign="center">Profile</Typography>
              </MenuItem>
              <MenuItem onClick={handleLogout}>
                <Typography textAlign="center">Logout</Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Navigation>
      </Header>
      <Box sx={{ marginBottom: "100px" }}>{children}</Box>
      <Outlet />
    </Box>
  );
}

export default BaseTemplate;
