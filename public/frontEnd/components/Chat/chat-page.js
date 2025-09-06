import { io } from "https://cdn.socket.io/4.7.2/socket.io.esm.min.js";

const messageButton = document.querySelector(".sendButton")
const messageInput = document.querySelector(".messageInput");
const chatSection = document.querySelector(".chatSection");
const profileNav = document.querySelector(".profileNav")

const socket = io("http://127.0.0.1:8080");
const params = new URLSearchParams(window.location.search)
const targetUserId = params.get("userId")

function createElement(elementName, className, target, content) {
    const element = document.createElement(elementName);
    element.className = className
    if ((elementName === "h1" || "h2" || "h3" ||  "p") && content) element.textContent = content
    if (elementName === "img" && content) element.src = content
    target.appendChild(element)
    return element
}


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
        createElement("div", "messageBox", chatSection, messageValue)
        socket.emit("message", messageValue, targetUserId)
    }
    messageInput.value = ""
})

socket.on("feedback", (data) => {
    createElement("div", "senderMessage", chatSection, data)
})

// get user details 

document.addEventListener("DOMContentLoaded", async () => {
    const fetchData = await fetch("http://127.0.0.1:8080/userInfo", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            userId: targetUserId
        }),
    })
    const toJson = await fetchData.json();
    if (fetchData.status === 401) return console.loga(toJson.msg)
    if (fetchData.status === 200) {
        console.log(toJson.msg)
        createElement("img", "userProfile", profileNav, toJson.data.ProfileLink )
        createElement("p", "userName", profileNav, `${toJson.data.name} ${toJson.data.lastName}`)
    }
})








