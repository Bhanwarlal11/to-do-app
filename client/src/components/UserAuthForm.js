import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  Box,
  Tab,
  Tabs,
  Typography,
  Container,
} from "@mui/material";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerUser, SigninUser } from "../api/api";
import { loginUser } from "../redux/authSlice";

function UserAuthForm() {
  const [activeTab, setActiveTab] = useState(0);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      navigate("/");
    }
  }, [navigate]);

  // Handle tab change (Login or Sign Up)
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  // Handle form field change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle Login
  const handleLogin = async () => {
    try {
      setLoading(true);
      const response = await SigninUser(formData.email, formData.password);
      if (response.data.success) {
        dispatch(loginUser({ token: response.data.token }));
        toast.success(response.data.message);
        navigate("/");
      } else {
        toast.error(response.data.message || "Login failed!");
      }
    } catch (error) {
      toast.error("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Handle Sign Up
  const handleSignUp = async () => {
    try {
      setLoading(true);
      const response = await registerUser(
        formData.username,
        formData.email,
        formData.password
      );
      console.log("response", response);

      if (response.data.success) {
        toast.success(response.data.message);
        setActiveTab(0);
      } else {
        toast.error(response.data.message || "Sign-up failed.");
      }
    } catch (error) {
      toast.error(
        error.response.data.message || "Sign-up failed. Please try again"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 5 }}>
      <Box
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <Typography variant="h4" gutterBottom>
          {activeTab === 0 ? "Login" : "Sign Up"}
        </Typography>

        <Tabs value={activeTab} onChange={handleTabChange} centered>
          <Tab label="Login" />
          <Tab label="Sign Up" />
        </Tabs>

        {/* Login Form */}
        {activeTab === 0 && (
          <Box sx={{ width: "100%", mt: 2 }}>
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              margin="normal"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
            <TextField
              label="Password"
              variant="outlined"
              fullWidth
              margin="normal"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
            />
            <Button
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2 }}
              onClick={handleLogin}
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </Button>
          </Box>
        )}

        {/* Sign Up Form */}
        {activeTab === 1 && (
          <Box sx={{ width: "100%", mt: 2 }}>
            <TextField
              label="Username"
              variant="outlined"
              fullWidth
              margin="normal"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
            />
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              margin="normal"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
            <TextField
              label="Password"
              variant="outlined"
              fullWidth
              margin="normal"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
            />
            <Button
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2 }}
              onClick={handleSignUp}
              disabled={loading}
            >
              {loading ? "Signing up..." : "Sign Up"}
            </Button>
          </Box>
        )}
      </Box>
    </Container>
  );
}

export default UserAuthForm;
