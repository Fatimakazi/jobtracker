import axios from "axios";

// If running locally, use your local URL
const API = axios.create({
  baseURL: "http://localhost:5000/api/jobs",  // 👈 Replace if hosted
});

export default API;
