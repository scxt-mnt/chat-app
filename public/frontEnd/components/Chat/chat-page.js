import { io } from "https://cdn.socket.io/4.7.2/socket.io.esm.min.js";
const messageButton = document.querySelector(".sendButton")
const messageInput = document.querySelector(".messageInput");
const chatSection = document.querySelector(".chatSection")

const socket = io("http://127.0.0.1:8080");
messageButton.addEventListener("click", () => {
    const messageValue = messageInput.value
    if (messageValue) {
        socket.emit("message", messageValue)
    }
    messageInput.value = ""
})

socket.on("feedback", (data) => {
    const messageBox = document.createElement("div");
    messageBox.textContent = data
    messageBox.className = "messageBox"
    chatSection.appendChild(messageBox);

})







