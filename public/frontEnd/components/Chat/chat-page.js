import { io } from "https://cdn.socket.io/4.7.2/socket.io.esm.min.js";
const messageButton = document.querySelector(".sendButton")
const messageInput = document.querySelector(".messageInput");
const chatSection = document.querySelector(".chatSection");

const socket = io("http://127.0.0.1:8080");
const params = new URLSearchParams(window.location.search)
const targetUserId = params.get("userId")
// send user Id 


document.addEventListener("DOMContentLoaded", async () => {

    const getDetails = await fetch("http://127.0.0.1:8080/get-Details", {
        method: "GET",
        headers: { Accept: "application/json" },
        credentials: "include"
    });

    const data = await getDetails.json();

    if (getDetails.status === 401) {
        return console.log(data.msg)
    }
    if (getDetails.status === 200) {
        console.log(data.msg);
        socket.emit("userId", data.data.id)
    }


})

messageButton.addEventListener("click", () => {
    const messageValue = messageInput.value
    if (messageValue) {
        const messageBox = document.createElement("div");
        messageBox.textContent = messageValue
        messageBox.className = "messageBox"
        chatSection.appendChild(messageBox);

        socket.emit("message",  messageValue, targetUserId)
    }
    messageInput.value = ""
})

socket.on("feedback", (data) => {
    const senderMessage = document.createElement("div");
    senderMessage.textContent = data
    senderMessage.className = "senderMessage"
    chatSection.appendChild(senderMessage);
})









