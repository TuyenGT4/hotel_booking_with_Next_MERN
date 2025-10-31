"use client";

import React, { useState } from "react";
import {
  Divider,
  Container,
  Grid,
  TextField,
  Button,
  Link,
  Typography,
  Box,
  Snackbar,
  Alert,
} from "@mui/material";
import { signIn } from "next-auth/react";
import HotelHubLogo from "@/component/nav/HotelLogo";
import { useRouter } from "next/navigation";
import GoogleIcon from "@mui/icons-material/Google";

const LoginPage = () => {
  const [loginId, setLoginId] = useState("");

  const [password, setPassword] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const [isEmail, setIsEmail] = useState(true);

  const router = useRouter();

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validatedPhone = (phone) => {
    const re = /^\d{10}$/;
    return re.test(phone);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const isInputEmail = validateEmail(loginId);
    const isInputPhone = validatedPhone(loginId);

    if (!loginId || !password) {
      setSnackbarMessage(
        "Đăng nhập yêu cầu nhập email (số điện thoại) và mật khẩu."
      );

      setSnackbarSeverity("Lỗi");

      setOpenSnackbar(true);
      return;
    }

    if (!isInputEmail && !isInputPhone) {
      setSnackbarMessage("Vui lòng nhập Email hoặc số điện thoại hợp lệ!");
      setSnackbarSeverity("Lỗi");

      setOpenSnackbar(true);
      return;
    }

    try {
      const result = await signIn("credentials", {
        redirect: false,
        [isInputEmail ? "email" : "phone"]: loginId,
        password,
      });

      if (result?.error) {
        setSnackbarMessage(result.error || "Đăng nhập thất bại");
        setSnackbarSeverity("Lỗi");
      } else {
        setSnackbarMessage("Đăng nhập thành công");
        setSnackbarSeverity("Thành công");

        router.push("/");
      }
    } catch (error) {
      setSnackbarMessage("Đã xảy ra lỗi. Vui lòng thử lại!");
    }

    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const handleLoginIdChange = (e) => {
    const value = e.target.value;
    setLoginId(value);

    if (value.includes("@")) {
      setIsEmail(true);
    } else if (/^[0-9]+$/.test(value)) {
      setIsEmail(false);
    }
  };

  return (
    <Container maxWidth="xxl">
      <Grid
        container
        spacing={2}
        alignItems="center"
        justifyContent="center"
        sx={{ minHeight: "100vh" }}
      >
        <Grid item xs={12} md={6}>
          <Box
            component="form"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            sx={{ p: 3 }}
            onSubmit={handleLogin}
          >
            <Typography variant="h4" gutterBottom>
              <HotelHubLogo />
            </Typography>

            <Typography variant="h4" gutterBottom>
              Đăng nhập
            </Typography>
            <TextField
              label={isEmail ? "Email" : "Số điện thoại"}
              type={isEmail ? "email" : "tel"}
              variant="outlined"
              fullWidth
              margin="normal"
              value={loginId}
              onChange={handleLoginIdChange}
              InputLabelProps={{
                style: { color: "red" },
              }}
              InputProps={{
                style: {
                  color: "#fff",
                  borderColor: "red",
                },
              }}
              sx={{
                input: { color: "black" },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "red",
                  },
                  "&:hover fieldset": {
                    borderColor: "red",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "red",
                  },
                },
              }}
            />
            <TextField
              label="Mật khẩu"
              type="password"
              variant="outlined"
              fullWidth
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputLabelProps={{
                style: { color: "red" },
              }}
              InputProps={{
                style: {
                  color: "#fff",
                  borderColor: "red",
                },
              }}
              sx={{
                input: { color: "black" },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "red",
                  },
                  "&:hover fieldset": {
                    borderColor: "red",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "red",
                  },
                },
              }}
            />

            <Link
              href="/forgot-password"
              variant="body2"
              sx={{ alignSelf: "flex-end", mt: 1 }}
            >
              Quên mật khẩu?
            </Link>

            <Button
              type="submit"
              variant="contained"
              sx={{
                backgroundColor: "red",
                "&:hover": {
                  backgroundColor: "red",
                },
                mt: 2,
                width: "100%",
              }}
            >
              Đăng nhập
            </Button>

            <Divider sx={{ mt: 2 }}>or</Divider>

            <Button
              fullWidth
              variant="outlined"
              startIcon={<GoogleIcon />}
              sx={{
                color: "white",
                backgroundColor: "red",
                "&:hover": {
                  color: "white",
                  backgroundColor: "red",
                },
                mt: 2,
                width: "100%",
              }}
              onClick={() => signIn("google")}
            >
              Đăng nhập với Google
            </Button>

            <Link href="/register" variant="body2" sx={{ mt: 2 }}>
              Bạn chưa có tài khoản? Đăng ký
            </Link>
          </Box>
        </Grid>

        <Grid item xs={12} md={6}>
          <Box
            sx={{
              width: "100%",
              height: "100vh",
              display: { xs: "none", md: "block" },
            }}
          >
            <Box
              component="img"
              src="/images/login5.jpg"
              alt="Login image"
              sx={{
                marginTop: "3px",
                marginBottom: "2px",
                width: "100%",
                height: "100vh",
                objectFit: "cover",
              }}
            />
          </Box>
        </Grid>
      </Grid>
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
          severity={snackbarSeverity}
          variant="filled"
          sx={{
            width: "100%",
            bgcolor: "#dcf170ff",
            color: "black",
            boxShadow: 3,
          }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default LoginPage;
