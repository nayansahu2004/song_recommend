import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:5000",
});

export const chat = (context) =>
    API.post("/chat", { context });