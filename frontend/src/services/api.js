import axios from "axios";

const API = axios.create({
    baseURL: "https://germproof-amiss-glimpse.ngrok-free.dev",
});

export const chat = (context) =>
    API.post("/chat", { context });