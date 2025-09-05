import { io } from "https://cdn.socket.io/4.7.2/socket.io.esm.min.js";
const messageButton = document.querySelector(".sendButton")

const socket = io("http://127.0.0.1:8080");

messageButton.addEventListener("click", () => {
    socket.emit("message", "hello")
})





