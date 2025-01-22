import React, { useEffect } from "react";
import { Box, Button, Typography, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const NotFoundPage = () => {
  const navigate = useNavigate();

  // Handle redirect to home page
  const handleRedirect = () => {
    navigate("/");
  };

  useEffect(() => {
    // Optional: Automatically redirect after a few seconds
    setTimeout(() => {
      navigate("/");
    }, 5000);
  }, [navigate]);

  return (
    <Container
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        background: "#f5f5f5",
        position: "relative",
      }}
    >
      {/* Animated Not Found text */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <Typography
          variant="h3"
          sx={{
            fontWeight: "bold",
            color: "#FF6347",
            textAlign: "center",
            letterSpacing: "2px",
          }}
        >
          Oops! Page Not Found
        </Typography>
      </motion.div>

      {/* Animated error number */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
      >
        <Typography
          variant="h1"
          sx={{
            fontWeight: "bold",
            color: "#333",
            fontSize: "150px",
            textAlign: "center",
            margin: "20px 0",
          }}
        >
          404
        </Typography>
      </motion.div>

      {/* Animated text with the button */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.6 }}
        style={{alignContent:"center",alignItems:"center", display:"flex", flexDirection:"column"}}
      >
        <Typography
          variant="h6"
          sx={{
            color: "#555",
            textAlign: "center",
            marginBottom: "20px",
          }}
        >
          We couldn't find the page you're looking for.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          sx={{
            fontWeight: "bold",
            padding: "10px 20px",
            borderRadius: "30px",
            transition: "all 0.3s ease",
            "&:hover": {
              backgroundColor: "#FF6347",
            },
            
          }}
          onClick={handleRedirect}
        >
          Go to Home
        </Button>
      </motion.div>

      {/* Background animation */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background:
            "linear-gradient(45deg, rgba(255, 99, 71, 0.5), rgba(255, 69, 0, 0.5))",
          filter: "blur(10px)",
          zIndex: -1,
        }}
      />
    </Container>
  );
};

export default NotFoundPage;
