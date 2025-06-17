import React, { useEffect, useState } from "react";
import axios from "axios";
import HeatMap from "react-heatmap-grid";
import { Container, Typography, Select, MenuItem, Box } from "@mui/material";

const API_BASE = "http://20.244.56.144/evaluation-service";

export default function HeatmapPage() {
  const [timeRange, setTimeRange] = useState(5);
  const [heatmapData, setHeatmapData] = useState([]);
  const [stocks, setStocks] = useState([]);

  const fetchHeatmap = async () => {
    try {
      const res = await axios.get(`${API_BASE}/correlation-heatmap?minutes=${timeRange}`);
      setHeatmapData(res.data.matrix);
      setStocks(Object.values(res.data.stocks));
    } catch (err) {
      console.error("Error fetching heatmap:", err);
    }
  };

  useEffect(() => {
    fetchHeatmap();
  }, [timeRange]);

  return (
    <Container>
      <Typography variant="h6" style={{ marginTop: 20, marginBottom: 20 }}>
        Correlation Heatmap
      </Typography>

      <Box mb={3}>
        <Select
          value={timeRange}
          onChange={(e) => setTimeRange(Number(e.target.value))}
        >
          {[5, 15, 30, 60].map((min) => (
            <MenuItem key={min} value={min}>
              {min} min
            </MenuItem>
          ))}
        </Select>
      </Box>

      <div style={{ width: "100%", overflowX: "auto" }}>
        <HeatMap
          xLabels={stocks}
          yLabels={stocks}
          data={heatmapData}
          cellStyle={(_x, _y, value) => ({
            background: `rgb(255, ${255 - value * 255}, ${255 - value * 255})`,
            fontSize: "10px",
            textAlign: "center",
          })}
          cellRender={(value) => value && value.toFixed(2)}
        />
      </div>
    </Container>
  );
}
