import axios from "axios";

const token = localStorage.getItem("accessToken");

export const api = axios.create({
    baseURL:"http://localhost:8888",
    headers:{
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
    }
})