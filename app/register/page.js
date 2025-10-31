"use client";

import React, { useState } from "react";
import {
  Container,
  Grid,
  TextField,
  Button,
  Link,
  Typography,
  Box,
  Snackbar,
  Alert,
  Divider,
} from "@mui/material";
import HotelHubLogo from "@/component/nav/HotelLogo";
import GoogleIcon from "@mui/icons-material/Google";

import { signIn } from "next-auth/react";
const RegisterPage = () => {
  const [name, setName] = useState("");

  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!name || !phone || !email || !password) {
      setSnackbarMessage("Tất cả đều bắt buộc. Vui lòng không bỏ trống! ");
      setSnackbarSeverity("Lỗi");
      setOpenSnackbar(true);

      return;
    }

    if (!/^\d{10}$/.test(phone)) {
      setSnackbarMessage("Vui lòng nhập số điện thoại gồm 10 chữ số hợp lệ!");
      setSnackbarSeverity("Lỗi");

      setOpenSnackbar(true);
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setSnackbarMessage("Vui lòng nhập địa chỉ email hợp lệ!");
      setSnackbarSeverity("Lỗi");

      setOpenSnackbar(true);
      return;
    }

    try {
      const response = await fetch(`${process.env.API}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, phone, email, password }),
      });

      if (response.ok) {
        setSnackbarMessage("Đăng ký tài khoản thành công.");

        setSnackbarSeverity("Thành công");

        setName("");
        setPhone("");

        setEmail("");

        setPassword("");
      } else {
        const data = await response.json();
        setSnackbarMessage(data.message || "Đăng ký thất bại");
        setSnackbarSeverity("Lỗi");
      }
    } catch (error) {
      setSnackbarMessage("Có lỗi xảy ra, vui lòng thử lại!");
      setSnackbarSeverity("Lỗi");
    }

    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        width: "100vw",
        overflow: "hidden",
      }}
    >
      {/* Left Side - Registration Form */}
      <Box
        sx={{
          width: { xs: "100%", md: "50%" },
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "background.paper",
          p: 2,
          overflowY: "auto",
        }}
      >
        <Box
          onSubmit={handleRegister}
          component="form"
          sx={{
            width: "100%",
            maxWidth: 400,
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          {/* Logo Section */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              width: "100%",
              ml: "5px", // Your left margin
            }}
          >
            <Typography variant="h4" gutterBottom>
              <HotelHubLogo />
            </Typography>
          </Box>

          <Typography variant="h4" gutterBottom align="center">
            Đăng ký
          </Typography>

          <TextField
            label="Họ và tên"
            variant="outlined"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "red" },
                "&:hover fieldset": { borderColor: "red" },
                "&.Mui-focused fieldset": { borderColor: "red" },
              },
              "& .MuiInputLabel-root": { color: "red" },
              "& .MuiInputBase-input": { color: "black" },
            }}
          />

          <TextField
            label="Số điện thoại"
            variant="outlined"
            fullWidth
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "red" },
                "&:hover fieldset": { borderColor: "red" },
                "&.Mui-focused fieldset": { borderColor: "red" },
              },
              "& .MuiInputLabel-root": { color: "red" },
              "& .MuiInputBase-input": { color: "black" },
            }}
          />

          <TextField
            label="Email"
            type="email"
            variant="outlined"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "red" },
                "&:hover fieldset": { borderColor: "red" },
                "&.Mui-focused fieldset": { borderColor: "red" },
              },
              "& .MuiInputLabel-root": { color: "red" },
              "& .MuiInputBase-input": { color: "black" },
            }}
          />

          <TextField
            label="Mật khẩu"
            type="password"
            variant="outlined"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "red" },
                "&:hover fieldset": { borderColor: "red" },
                "&.Mui-focused fieldset": { borderColor: "red" },
              },
              "& .MuiInputLabel-root": { color: "red" },
              "& .MuiInputBase-input": { color: "black" },
            }}
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              backgroundColor: "red",
              "&:hover": { backgroundColor: "darkred" },
              py: 1.5,
            }}
          >
            Đăng ký
          </Button>

          <Divider>Hoặc</Divider>

          <Button
            fullWidth
            variant="outlined"
            startIcon={<GoogleIcon />}
            sx={{
              color: "white",
              backgroundColor: "red",
              "&:hover": { backgroundColor: "darkred" },
              py: 1.5,
            }}
            onClick={() => signIn("google")}
          >
            Đăng nhập với Google
          </Button>

          <Typography align="center" sx={{ mt: 2 }}>
            <Link href="/login" underline="hover">
              Bạn đã có tài khoản? Đăng nhập
            </Link>
          </Typography>
        </Box>
      </Box>

      {/* Right Side - Image (Hidden on mobile) */}
      <Box
        sx={{
          display: { xs: "none", md: "block" },
          width: "50%",
          height: "100%",
        }}
      >
        <Box
          component="img"
          src="/images/register.jpg"
          alt="Register"
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </Box>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "left" }}
        sx={{
          "& .MuiSnackbar-root": {
            top: "24px",
            left: "24px",
          },
        }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbarSeverity} // "error", "success", "info", "warning"
          variant="filled" // nền đặc, dễ nhìn hơn
          sx={{
            width: "100%",
            bgcolor: "#dcf170ff", // đổi mã màu tuỳ ý
            color: "black",
            boxShadow: 3,
          }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default RegisterPage;
