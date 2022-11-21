import _axios from "axios";

enum URLS {
  DEV = "http://localhost:5000",
  PROD = "https://hahu-sms.herokuapp.com",
  LOCAL = "http://127.0.0.1:5002",
  VPS = "http://18.134.74.142:5003",
}

export const axios = _axios.create({
  baseURL: URLS.LOCAL,
  headers: {
    // "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
  },
});
