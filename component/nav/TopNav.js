import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import HomeIcon from "@mui/icons-material/Home";
import PhoneIcon from "@mui/icons-material/Phone";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Button from "@mui/material/Button";
import MenuIcon from "@mui/icons-material/Menu";
import LanguageIcon from "@mui/icons-material/Language";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Navbar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { data: session } = useSession();
  const router = useRouter();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const toggleDrawer = (newOpen) => () => {
    setDrawerOpen(newOpen);
  };

  const handleClick = () => {
    router.push(`/dashboard/${session?.user?.role}`);
  };

  const drawer = (
    <Box sx={{ width: 250, backgroundColor: "#FAF3E0", height: "100%" }}>
      <List>
        <ListItem>
          <LanguageIcon sx={{ mr: 1, color: "#3E2723" }} />
          <Select
            value="Vietnamese"
            variant="standard"
            disableUnderline
            sx={{ color: "#3E2723" }}
          >
            <MenuItem value="Vietnamese">Vietnamese</MenuItem>
            <MenuItem value="English">English</MenuItem>
          </Select>
        </ListItem>
        <ListItem>
          <Button
            color="inherit"
            startIcon={<AccountCircleIcon />}
            sx={{
              color: "#3E2723",
              "&:hover": { color: "#BCAAA4" },
            }}
          >
            Đăng nhập
          </Button>
        </ListItem>
        <ListItem>
          <Button
            color="inherit"
            startIcon={<AccountCircleIcon />}
            sx={{
              color: "#3E2723",
              "&:hover": { color: "#BCAAA4" },
            }}
          >
            Đăng ký
          </Button>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <AppBar
      position="static"
      sx={{
        background: "linear-gradient(90deg, #4E342E 0%, #6D4C41 100%)",
        boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        {/* Logo + Language */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <LanguageIcon sx={{ mr: 1, color: "#D7CCC8" }} />
          <Select
            value="Vietnamese"
            variant="standard"
            disableUnderline
            sx={{ color: "#D7CCC8" }}
          >
            <MenuItem value="Vietnamese">Vietnamese</MenuItem>
            <MenuItem value="English">English</MenuItem>
          </Select>
        </Box>

        {/* Responsive */}
        {isMobile ? (
          <>
            <IconButton
              edge="end"
              color="inherit"
              aria-label="menu"
              onClick={toggleDrawer(true)}
            >
              <MenuIcon sx={{ color: "#FAF3E0" }} />
            </IconButton>
            <Drawer open={drawerOpen} onClose={toggleDrawer(false)}>
              {drawer}
            </Drawer>
          </>
        ) : (
          <Box
            sx={{ display: "flex", alignItems: "center", fontWeight: "bold" }}
          >
            <HomeIcon sx={{ mr: 1, color: "#FFB300" }} />
            <Typography variant="body1" sx={{ color: "#FAF3E0", mr: 2 }}>
              Serenova - Đặt Phòng Nghỉ Dưỡng Cao Cấp
            </Typography>
            <PhoneIcon sx={{ mr: 1, color: "#FFB300" }} />
            <Typography variant="body1" sx={{ color: "#FAF3E0", mr: 2 }}>
              +84 372 073 044
            </Typography>

            {session?.user ? (
              <img
                onClick={handleClick}
                src={session?.user?.image || "/images/pic1.jpg"}
                alt="User Avatar"
                style={{
                  width: "60px",
                  height: "60px",
                  borderRadius: "50%",
                  objectFit: "cover",
                  cursor: "pointer",
                }}
              />
            ) : (
              <>
                <Button
                  startIcon={<AccountCircleIcon />}
                  sx={{
                    color: "#D7CCC8",
                    fontWeight: "bold",
                    "&:hover": { color: "#FFB300" },
                  }}
                >
                  <Link href="/login" passHref>
                    <Box
                      component="span"
                      sx={{ textDecoration: "none", color: "inherit" }}
                    >
                      Đăng nhập
                    </Box>
                  </Link>
                </Button>
                <Button
                  startIcon={<AccountCircleIcon />}
                  sx={{
                    color: "#D7CCC8",
                    fontWeight: "bold",
                    "&:hover": { color: "#FFB300" },
                  }}
                >
                  <Link href="/register" passHref>
                    <Box
                      component="span"
                      sx={{ textDecoration: "none", color: "inherit" }}
                    >
                      Đăng ký
                    </Box>
                  </Link>
                </Button>
              </>
            )}
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
