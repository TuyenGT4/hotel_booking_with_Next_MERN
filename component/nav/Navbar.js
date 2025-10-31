import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import useMediaQuery from "@mui/material/useMediaQuery";
import MenuIcon from "@mui/icons-material/Menu";
import Link from "next/link";
import Box from "@mui/material/Box";
import HotelLogo from "./HotelLogo";

const Navbar = () => {
  const isMobile = useMediaQuery("(max-width:600px)");
  const [anchorEl, setAnchorEI] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEI(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEI(null);
  };

  const navLinks = [
    "Giới thiệu",
    "Nhà hàng",
    "Thư viện ảnh",
    "Blog",
    "Phòng nghỉ",
    "Liên hệ",
  ];

  return (
    <AppBar
      position="static"
      sx={{
        background: "linear-gradient(90deg, #4E342E 0%, #6D4C41 100%)",
        boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
      }}
    >
      <Box
        sx={{
          margin: "0 auto",
          width: "80%",
          maxWidth: "1070px",
        }}
      >
        <Toolbar>
          <Box
            sx={{
              display: "flex",
              flexGrow: 1,
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            {/* Logo */}
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, fontWeight: "bold", color: "#FFB300" }}
            >
              <Link href="/" passHref>
                <Box
                  display="flex"
                  alignItems="center"
                  sx={{
                    textDecoration: "none",
                    color: "#FFB300",
                    fontWeight: "bold",
                    fontFamily: "serif",
                    letterSpacing: "0.5px",
                  }}
                >
                  <HotelLogo />
                </Box>
              </Link>
            </Typography>

            {isMobile ? (
              <>
                {/* Menu icon (mobile) */}
                <IconButton
                  sx={{ zIndex: 1400 }}
                  edge="start"
                  aria-label="menu"
                  onClick={handleMenu}
                >
                  <MenuIcon sx={{ color: "#FAF3E0" }} />
                </IconButton>
                <Menu
                  id="simple-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={open}
                  onClose={handleClose}
                  PaperProps={{
                    sx: {
                      backgroundColor: "#FAF3E0",
                      color: "#3E2723",
                    },
                  }}
                >
                  {navLinks.map((link) => (
                    <MenuItem key={link} onClick={handleClose}>
                      <Link href={`/${link.toLowerCase()}`} passHref>
                        <Box
                          component="p"
                          sx={{
                            textDecoration: "none",
                            color: "inherit",
                            fontWeight: 500,
                          }}
                        >
                          {link}
                        </Box>
                      </Link>
                    </MenuItem>
                  ))}
                </Menu>
              </>
            ) : (
              <Box display="flex" alignItems="center">
                {/* Links (desktop) */}
                {navLinks.map((link) => (
                  <Button
                    key={link}
                    sx={{
                      color: "#FAF3E0",
                      fontWeight: 600,
                      mx: 1,
                      "&:hover": { color: "#FFB300" },
                    }}
                  >
                    <Link href={`/${link.toLowerCase()}`} passHref>
                      <Box
                        component="p"
                        sx={{
                          textDecoration: "none",
                          color: "inherit",
                          transition: "color 0.3s ease",
                        }}
                      >
                        {link}
                      </Box>
                    </Link>
                  </Button>
                ))}

                {/* Call to action button */}
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "#FFB300",
                    color: "#4E342E",
                    marginLeft: "20px",
                    fontWeight: "bold",
                    "&:hover": {
                      backgroundColor: "#FFD54F",
                      color: "#3E2723",
                    },
                  }}
                >
                  Đặt phòng ngay
                </Button>
              </Box>
            )}
          </Box>
        </Toolbar>
      </Box>
    </AppBar>
  );
};

export default Navbar;
