import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "./store/userstore";
import axios from "axios";
import {
  TextField,
  Button,
  InputAdornment,
  IconButton,
  Typography,
  Box,
  Paper,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

function Register() {
  const { pass, setPass, phone, setPhone, fullname, setFullname, isDark } =
    useUserStore();
  const [repeatPass, setRepeatPass] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [showRepeatPass, setShowRepeatPass] = useState(false);
  const [error, setError] = useState("");
  const [submit, setSubmit] = useState(false);
  const navigate = useNavigate();

  function getRandomString(length = 10) {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    let result = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      result += chars[randomIndex];
    }
    return result;
  }

  function yoz() {
    localStorage.setItem("value", getRandomString());
  }

  useEffect(() => {
    if (!submit) return;

    const userData = { fullname, pass, phone };
    localStorage.setItem("registerData", JSON.stringify(userData));

    const send = { type: "register", phone };
    axios
      .post("http://13.49.74.5:3000/verification/send", send)
      .then(() => yoz())
      .then(() => navigate("/code"))
      .catch((err) =>
        alert(err.response?.data?.message || "Xatolik yuz berdi")
      );
  }, [submit, fullname, pass, phone, navigate]);

  function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (pass !== repeatPass) {
      setError("Parollar bir xil emas!");
      return;
    }

    setSubmit(true);
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: isDark ? "#121212" : "#f3f4f6",
        px: 2,
      }}
    >
      <Paper
        elevation={6}
        sx={{
          p: { xs: 4, sm: 6 },
          borderRadius: 4,
          width: "100%",
          maxWidth: { xs: 350, sm: 450 },
          bgcolor: isDark ? "#1e1e1e" : "#fff",
          color: isDark ? "#fff" : "#000",
        }}
      >
        <Typography
          variant="h5"
          fontWeight="bold"
          mb={3}
          textAlign="center"
          sx={{ fontSize: { xs: "1.5rem", sm: "2rem" } }}
        >
          Ro'yxatdan o'tish
        </Typography>

        <form onSubmit={handleSubmit}>
          {/* Telefon */}
          <TextField
            label="Telefon"
            variant="outlined"
            fullWidth
            margin="normal"
            required
            type="tel"
            placeholder="+998901234567"
            onChange={(e) => setPhone(e.target.value)}
            sx={{
              input: { color: isDark ? "#fff" : "#000" },
              label: { color: isDark ? "#bbb" : "#555" },
            }}
          />

          {/* Parol */}
          <TextField
            label="Parol"
            variant="outlined"
            fullWidth
            margin="normal"
            required
            type={showPass ? "text" : "password"}
            placeholder="12345678"
            onChange={(e) => setPass(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPass(!showPass)}
                    edge="end"
                    sx={{ color: isDark ? "#fff" : "#000" }}
                  >
                    {showPass ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{
              input: { color: isDark ? "#fff" : "#000" },
              label: { color: isDark ? "#bbb" : "#555" },
            }}
          />

          {/* Parolni takrorlash */}
          <TextField
            label="Parolni takrorlang"
            variant="outlined"
            fullWidth
            margin="normal"
            required
            type={showRepeatPass ? "text" : "password"}
            placeholder="12345678"
            onChange={(e) => setRepeatPass(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowRepeatPass(!showRepeatPass)}
                    edge="end"
                    sx={{ color: isDark ? "#fff" : "#000" }}
                  >
                    {showRepeatPass ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{
              input: { color: isDark ? "#fff" : "#000" },
              label: { color: isDark ? "#bbb" : "#555" },
            }}
          />

          {/* Fullname */}
          <TextField
            label="Fullname"
            variant="outlined"
            fullWidth
            margin="normal"
            required
            placeholder="Asqaraliyev Faxriddin"
            onChange={(e) => setFullname(e.target.value)}
            sx={{
              input: { color: isDark ? "#fff" : "#000" },
              label: { color: isDark ? "#bbb" : "#555" },
            }}
          />

          {/* Xatolik */}
          {error && (
            <Typography color="error" fontSize="0.875rem" mt={1} mb={1}>
              {error}
            </Typography>
          )}

          {/* Submit button */}
          <Button
            variant="contained"
            fullWidth
            type="submit"
            sx={{
              mt: 2,
              py: { xs: 1.5, sm: 2 },
              fontSize: { xs: "0.9rem", sm: "1rem" },
              bgcolor: "#1976d2",
              "&:hover": { bgcolor: "#1565c0" },
            }}
          >
            Ro'yxatdan o'tish
          </Button>
        </form>

        {/* Kirish link */}
        <Typography
          mt={2}
          textAlign="center"
          fontSize={{ xs: "0.8rem", sm: "0.9rem" }}
          color="textSecondary"
        >
          Allaqachon akkount bormi?{" "}
          <a
            href="/login"
            style={{
              color: "#1976d2",
              textDecoration: "underline",
              marginLeft: 4,
            }}
          >
            Kirish
          </a>
        </Typography>
      </Paper>
    </Box>
  );
}

export default Register;
