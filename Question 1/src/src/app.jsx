// App.jsx
import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { Button, Container, Typography } from "@mui/material";
import StockPage from "./pages/StockPage";
import HeatmapPage from "./pages/HeatmapPage";

export default function App() {
  return (
    <BrowserRouter>
      <Container style={{ paddingTop: 30 }}>
        <Typography variant="h4" gutterBottom align="center">
          📊 Stock Price Dashboard
        </Typography>

        <div style={{ display: "flex", justifyContent: "center", marginBottom: 20 }}>
          <Button variant="contained" color="primary" component={Link} to="/">
            Stock Chart
          </Button>
          <Button
            variant="contained"
            color="secondary"
            component={Link}
            to="/heatmap"
            style={{ marginLeft: 16 }}
          >
            Heatmap
          </Button>
        </div>

        <Routes>
          <Route path="/" element={<StockPage />} />
          <Route path="/heatmap" element={<HeatmapPage />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}
