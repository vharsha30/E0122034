import React, { useEffect, useState } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js";
import { Container, Typography, Select, MenuItem, Box } from "@mui/material";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

const API_BASE = "http://20.244.56.144/evaluation-service";

export default function StockPage() {
  const [stocks, setStocks] = useState({});
  const [selectedStock, setSelectedStock] = useState("");
  const [timeRange, setTimeRange] = useState(5);
  const [priceData, setPriceData] = useState([]);
  const [labels, setLabels] = useState([]);

  const fetchStocks = async () => {
    try {
      const res = await axios.get(`${API_BASE}/stocks`);
      setStocks(res.data.stocks);
      setSelectedStock(Object.values(res.data.stocks)[0]);
    } catch (err) {
      console.error("Error fetching stocks:", err);
    }
  };

  const fetchStockPrices = async () => {
    if (!selectedStock) return;
    try {
      const res = await axios.get(`${API_BASE}/stocks/${selectedStock}?minutes=${timeRange}`);
      const prices = res.data;
      setPriceData(prices.map((p) => p.price));
      setLabels(prices.map((p) => p.lastUpdatedAt));
    } catch (err) {
      console.error("Error fetching stock prices:", err);
    }
  };

  useEffect(() => {
    fetchStocks();
  }, []);

  useEffect(() => {
    fetchStockPrices();
  }, [selectedStock, timeRange]);

  const lineData = {
    labels,
    datasets: [
      {
        label: `${selectedStock} Stock Price`,
        data: priceData,
        borderColor: "#1976d2",
        backgroundColor: "rgba(25, 118, 210, 0.4)",
        fill: true,
        tension: 0.3,
      },
    ],
  };

  return (
    <Container>
      <Typography variant="h6" style={{ marginBottom: 20 }}>
        Stock Chart
      </Typography>

      <Box display="flex" gap={2} mb={3}>
        <Select
          value={selectedStock}
          onChange={(e) => setSelectedStock(e.target.value)}
        >
          {Object.entries(stocks).map(([name, symbol]) => (
            <MenuItem key={symbol} value={symbol}>
              {name} ({symbol})
            </MenuItem>
          ))}
        </Select>

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

      <Line data={lineData} />
    </Container>
  );
}
