import * as React from "react";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import InfoIcon from "@mui/icons-material/Info";
import ContactSupportIcon from "@mui/icons-material/ContactSupport";
import Link from "next/link";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Hidden from "@mui/material/Hidden";
import LoginIcon from "@mui/icons-material/Login";
import { Box, Menu, MenuItem, Tooltip } from "@mui/material";
import Avatar from "@mui/material/Avatar";

import CategoryIcon from "@mui/icons-material/Category";
import Person4Icon from "@mui/icons-material/Person4";
import AddCircleIcon from "@mui/icons-material/AddCircle";

import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { styled } from "@mui/system";

const CustomTypography = styled(Typography)({
  fontFamily: "VampireWars",
  fontSize: "25px",
  color: "lightblue",
  textShadow: "2px 2px 0px rgba(0, 0, 0, 0.9)",
});

function Sidebar() {
  const pages = [
    { name: "Home", path: "/", icon: <LibraryMusicIcon /> },
    {
      name: "Categories",
      path: "/home/categories",
      icon: <CategoryIcon />,
    },
    { name: "Artists", path: "/home/artists", icon: <Person4Icon /> },
    {
      name: "Player",
      path: "/player-controller/player",
      icon: <LibraryMusicIcon />,
    },
    { name: "Contact Us", path: "/contact", icon: <ContactSupportIcon /> },
    { name: "About", path: "/about", icon: <InfoIcon /> },
  ];
  const adminPages = [
    { name: "Add Track", path: "/tracks/add", icon: <AddCircleIcon /> },
    { name: "Add Artist", path: "/home/artists/add", icon: <AddCircleIcon /> },
  ];
  const bottomPages = [
    { name: "Login", path: "/auth/login", icon: <LoginIcon /> },
    { name: "Register", path: "/auth/register", icon: <LoginIcon /> },
  ];
  const settings = [
    { name: "Profile", path: "/user/profile" },
    { name: "Logout", path: "/auth/logout" },
  ];
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = React.useState(false);

  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const toggleMobileSidebar = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
  };

  const handlePageClick = () => {
    setIsMobileSidebarOpen(false); // Close the mobile sidebar when a page is clicked
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = (path: string) => {
    setAnchorElUser(null);
    routher.push(path);
  };

  const routher = useRouter();
  const { data: session } = useSession();

  console.log(session?.user?.image);
  return (
    <>
      <Hidden mdUp>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={toggleMobileSidebar}
          sx={{ mr: 0, marginLeft: 0 }}
        >
          <MenuIcon
            sx={{
              color: "orange",
              fontSize: "2rem",
              position: "fixed",
              top: "10px",
              left: "10px",
            }}
          />
        </IconButton>
        <Drawer
          variant="temporary"
          open={isMobileSidebarOpen}
          onClose={toggleMobileSidebar}
          sx={{
            "& .MuiDrawer-paper": {
              width: "50vw",
              backgroundColor: "#4b0082", // Darker purple background color
            },
          }}
        >
          <Box p={2} bgcolor="#4b0082" textAlign="center">
            {" "}
            {/* Darker purple background color */}
            <CustomTypography>SpaceTune</CustomTypography>
          </Box>
          <List>
            {pages.map((page) => (
              <Link key={page.name} href={page.path} passHref>
                <ListItem button onClick={handlePageClick}>
                  <ListItemIcon sx={{ color: "lightsalmon" }}>
                    {page.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={<Typography color="white">{page.name}</Typography>}
                  />
                  ;
                </ListItem>
              </Link>
            ))}
          </List>
          <Divider />
          <List>
            {session &&
              adminPages.map((page) => (
                <Link key={page.name} href={page.path} passHref>
                  <ListItem button onClick={handlePageClick}>
                    <ListItemIcon sx={{ color: "orange" }}>
                      {page.icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Typography color="lightblue">{page.name}</Typography>
                      }
                    />
                  </ListItem>
                </Link>
              ))}
          </List>
          <Divider />
          <List>
            {session ? (
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <div
                    onClick={handleOpenUserMenu}
                    style={{
                      display: "flex",
                      gap: 10,
                      marginLeft: "10px",
                      justifyContent: "flex-start",
                      alignItems: "center",
                    }}
                  >
                    <IconButton sx={{ p: 0 }}>
                      <Avatar src={session!.user!.image?.toString()} />
                    </IconButton>
                    <Typography
                      variant="h6"
                      component="h6"
                      sx={{ fontSize: 15 }}
                      color={"#ddd"}
                    >
                      {session?.user?.name || session.user?.email}{" "}
                    </Typography>
                  </div>
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
              bottomPages.map((page) => (
                <Link key={page.name} href={page.path} passHref>
                  <ListItem button>
                    <ListItemIcon sx={{ color: "orange" }}>
                      {page.icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Typography color="lightblue">{page.name}</Typography>
                      }
                    />
                  </ListItem>
                </Link>
              ))
            )}
          </List>
        </Drawer>
      </Hidden>
      <Hidden smDown>
        <Drawer
          variant="permanent"
          className="d-md-block"
          sx={{
            width: 220,
            "& .MuiDrawer-paper": {
              width: 240,
              height: "calc(100vh + 0px)",
              boxSizing: "border-box",
              bgcolor: "#4b0082", // Darker purple background color
              overflowY: "auto", // Ensure the drawer can scroll
              "&::-webkit-scrollbar": {
                width: "8px", // Width of the scrollbar
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "lightgray", // Color of the scrollbar thumb
                borderRadius: "4px", // Border radius of the scrollbar thumb
              },
            },
          }}
        >
          <Box py={2} bgcolor="#4b0082">
            {" "}
            {/* Darker purple background color */}
            <CustomTypography align="center">SpaceTune</CustomTypography>
            <Divider />
          </Box>
          <List>
            {pages.map((page) => (
              <Link key={page.name} href={page.path} passHref>
                <ListItem button>
                  <ListItemIcon sx={{ color: "lightsalmon" }}>
                    {page.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={<Typography color="white">{page.name}</Typography>}
                  />
                </ListItem>
              </Link>
            ))}
          </List>
          <Divider />
          <List>
            {session &&
              adminPages.map((page) => (
                <Link key={page.name} href={page.path} passHref>
                  <ListItem button onClick={handlePageClick}>
                    <ListItemIcon sx={{ color: "orange" }}>
                      {page.icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Typography color="lightblue">{page.name}</Typography>
                      }
                    />
                  </ListItem>
                </Link>
              ))}
          </List>
          <Divider />
          <List>
            {session ? (
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <div
                    onClick={handleOpenUserMenu}
                    style={{
                      display: "flex",
                      gap: 10,
                      marginLeft: "10px",
                      justifyContent: "flex-start",
                      alignItems: "center",
                    }}
                  >
                    <IconButton sx={{ p: 0 }}>
                      <Avatar
                        alt={session.user?.email?.toString()}
                        src={session.user?.image?.toString()}
                      />
                    </IconButton>
                    <Typography
                      variant="h6"
                      component="h6"
                      sx={{ fontSize: 15 }}
                      color={"#ddd"}
                    >
                      {session?.user?.name || session.user?.email}{" "}
                    </Typography>
                  </div>
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
              bottomPages.map((page) => (
                <Link key={page.name} href={page.path} passHref>
                  <ListItem button>
                    <ListItemIcon sx={{ color: "orange" }}>
                      {page.icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Typography color="lightblue">{page.name}</Typography>
                      }
                    />
                  </ListItem>
                </Link>
              ))
            )}
          </List>
        </Drawer>
      </Hidden>
    </>
  );
}

export default Sidebar;
