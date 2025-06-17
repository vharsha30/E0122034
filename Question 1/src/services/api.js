// src/services/api.js
import axios from "axios";

const TOKEN_URL = "http://20.244.56.144/token";
const API_BASE = "http://20.244.56.144/evaluation-service";

let token = null;

const getToken = async () => {
  if (token) return token;
  const res = await axios.post(TOKEN_URL, {
    clientID: "affordmed",
    clientSecret: "codeforinterview",
  });
  token = res.data.access_token;
  return token;
};

export const fetchStocks = async () => {
  const accessToken = await getToken();
  const res = await axios.get(`${API_BASE}/stocks`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return res.data.stocks;
};

export const fetchStockPrices = async (symbol, minutes) => {
  const accessToken = await getToken();
  const res = await axios.get(`${API_BASE}/stocks/${symbol}?minutes=${minutes}`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return res.data;
};
