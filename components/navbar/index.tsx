import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import LoginIcon from "@mui/icons-material/Login";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

const pages = [
  { name: "About", path: "/about", auth: false },
  { name: "Contact Us", path: "/contact", auth: false },
];
const settings = [
  { name: "Profile", path: "/user/profile" },
  { name: "Logout", path: "/auth/logout" },
];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  const routher = useRouter();
  const handleCloseUserMenu = (path: string) => {
    setAnchorElUser(null);
    routher.push(path);
  };
  const { data: session } = useSession();
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <LibraryMusicIcon
            sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
          />
          <Link href="/" style={{ textDecoration: "none" }}>
            <Typography
              variant="h6"
              noWrap
              component="h6"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "#ddd",
              }}
            >
              SpaceTune
            </Typography>
          </Link>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => {
                if (page.auth) {
                  if (session) {
                    return (
                      <MenuItem key={page.path} onClick={handleCloseNavMenu}>
                        <Link
                          href={page.path}
                          style={{ color: "#333", textDecoration: "none" }}
                        >
                          <Typography textAlign="center">
                            {page.name}
                          </Typography>
                        </Link>
                      </MenuItem>
                    );
                  } else {
                    return null;
                  }
                } else {
                  return (
                    <MenuItem key={page.path} onClick={handleCloseNavMenu}>
                      <Link
                        href={page.path}
                        style={{ color: "#333", textDecoration: "none" }}
                      >
                        <Typography textAlign="center">{page.name}</Typography>
                      </Link>
                    </MenuItem>
                  );
                }
              })}
            </Menu>
          </Box>
          <LibraryMusicIcon
            sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}
          />
          <Link
            href="/"
            style={{
              textDecoration: "none",
              justifySelf: "flex-start",
              flexGrow: 1,
            }}
          >
            <Typography
              variant="h5"
              noWrap
              component="h5"
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "#ddd",
              }}
            >
              SpaceTune
            </Typography>
          </Link>
          <Box
            sx={{
              flexGrow: 1,
              display: {
                xs: "none",
                md: "flex",
                alignItems: "flex-start",
                width: "100%",
              },
            }}
          >
            {pages.map((page) => {
              if (page.auth) {
                if (session) {
                  return (
                    <Link
                      key={page.path}
                      href={page.path}
                      style={{ display: "block" }}
                    >
                      <Button
                        onClick={handleCloseNavMenu}
                        sx={{ my: 2, color: "white" }}
                      >
                        {page.name}
                      </Button>
                    </Link>
                  );
                } else {
                  return null;
                }
              } else {
                return (
                  <Link
                    key={page.path}
                    href={page.path}
                    style={{ display: "block" }}
                  >
                    <Button
                      onClick={handleCloseNavMenu}
                      sx={{ my: 2, color: "white" }}
                    >
                      {page.name}
                    </Button>
                  </Link>
                );
              }
            })}
          </Box>
          {session ? (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src={`${session!.user!.image}`} />
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
                {settings.map((setting) => (
                  <MenuItem
                    key={setting.path}
                    onClick={() => handleCloseUserMenu(setting.path)}
                  >
                    <Typography textAlign="center">{setting.name}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          ) : (
            <Box sx={{ flexGrow: 0, display: "flex", gap: "10px" }}>
              <Link href="/auth/register" passHref>
                <Button variant="contained" color="secondary">
                  <Box sx={{ display: { xs: "none", md: "block" } }}>
                    Rigister
                  </Box>
                  <AppRegistrationIcon
                    sx={{ marginLeft: { xs: 0, md: 1 }, width: 19 }}
                  />
                </Button>
              </Link>
              <Link href="/auth/login" passHref>
                <Button variant="contained" color="secondary">
                  <Box sx={{ display: { xs: "none", md: "block" } }}>Login</Box>
                  <LoginIcon sx={{ marginLeft: { xs: 0, md: 1 }, width: 19 }} />
                </Button>
              </Link>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
