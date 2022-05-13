import React from "react";
import { Link } from "react-router-dom";
import { Button, Typography, Box } from "@mui/material";

const AdminView = () => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
        flexDirection: "column",
        marginTop: "200px",
      }}
    >
      <Typography align="center" color="" variant="h3">
        404
      </Typography>
      <Typography
        align="center"
        color=""
        variant="h4"
        sx={{ marginBottom: "30px" }}
      >
        Admin
      </Typography>
      <Button>
        <Link to="/app">Ir Para Home</Link>
      </Button>
    </Box>
  );
};

export default AdminView;
