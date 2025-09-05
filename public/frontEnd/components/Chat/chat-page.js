import { io } from "https://cdn.socket.io/4.7.2/socket.io.esm.min.js";
const messageButton = document.querySelector(".sendButton")
const messageInput = document.querySelector(".messageInput");
const chatSection = document.querySelector(".chatSection");
const accountCard = document.querySelector(".accountCard");
const socket = io("http://127.0.0.1:8080");
const params = new URLSearchParams(window.location.search)
const userId = params.get("userId")
// send user Id 
socket.emit("userId", userId)
messageButton.addEventListener("click", () => {
    const messageValue = messageInput.value
    if (messageValue) {

        socket.emit("message", messageValue)
        const messageBox = document.createElement("div");
        messageBox.textContent = messageValue
        messageBox.className = "messageBox"
        chatSection.appendChild(messageBox);


    }
    messageInput.value = ""
})

document.addEventListener("DOMContentLoaded", () => {

})









