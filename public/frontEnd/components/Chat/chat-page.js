import { io } from "https://cdn.socket.io/4.7.2/socket.io.esm.min.js";

const messageButton = document.querySelector(".sendButton")
const messageInput = document.querySelector(".messageInput");
const chatSection = document.querySelector(".chatSection");
const profileNav = document.querySelector(".profileNav");
const imageButton = document.querySelector(".imageButton");
const fileChooser = document.querySelector(".fileChooser");
const body = document.querySelector("body");


export let isActive;

export const socket = io("http://127.0.0.1:8080");
const params = new URLSearchParams(window.location.search)
const targetUserId = params.get("userId")
let profileImage = ""



fileChooser.addEventListener("change", () => {


    const imagePreviewContainer = document.createElement("div");
    imagePreviewContainer.className = "imagePreviewContainer"
    body.prepend(imagePreviewContainer);

    const imagePreview = createElement("img", "sentImage", imagePreviewContainer, "");

    const buttonContainer = createElement("div", "buttonContainer", imagePreviewContainer, "");
    const removeImage = createElement("button", "removeImage", buttonContainer, "cancel");
    const sendImage = createElement("button", "sendImage", buttonContainer, "send");

    const file = fileChooser.files[0];
    imagePreview.src = URL.createObjectURL(file);


    removeImage.addEventListener("click", () => {
        fileChooser.value = "";
        body.removeChild(imagePreviewContainer)
    });


    sendImage.addEventListener("click", () => {
        const reader = new FileReader();
        reader.readAsArrayBuffer(file)
        reader.onload = () => {
            socket.emit("sendImage", reader.result, targetUserId);
        }

        body.removeChild(imagePreviewContainer);
        createElement("img", "sentImage", chatSection, URL.createObjectURL(file));

    })
})





export function createElement(elementName, className, target, content) {
    const element = document.createElement(elementName);
    element.className = className
    if ((elementName === "h1" ||
        elementName === "h2" ||
        elementName === "h3" ||
        elementName === "p" ||
        elementName === "button") && content) element.textContent = content
    if (elementName === "img" && content) element.src = content
    target.appendChild(element)
    return element
}







document.addEventListener("DOMContentLoaded", async () => {




    // get user details 


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
    profileImage = toJson.data.ProfileLink

    if (fetchData.status === 401) return console.log(toJson.msg)
    if (fetchData.status === 200) {
        console.log(toJson.msg)
        createElement("img", "userProfile", profileNav, toJson.data.ProfileLink)
        createElement("p", "userName", profileNav, `${toJson.data.name} ${toJson.data.lastName}`)
    }

})

messageButton.addEventListener("click", () => {
    const messageValue = messageInput.value
    if (messageValue) {
        createElement("p", "messageBox", chatSection, messageValue)
        socket.emit("message", messageValue, targetUserId)
        chatSection.scrollTop = chatSection.scrollHeight
    }
    messageInput.value = ""
})




createElement("div", "offStatus", profileNav, "");

// checks active user


socket.on("ownActiveUser", (data) => {
    isActive = data.isActive
})


socket.on("activeUser", (data) => {

    if (data.isActive) {
        const dotElement = document.createElement("div");
        dotElement.className = "statusDot"
        profileNav.appendChild(dotElement);
    }

    if (!data.isActive) {
        createElement("div", "offStatus", profileNav, "");
    }

})


// message feedback

socket.on("feedback", (data) => {
    const senderBubble = createElement("div", "senderBubble", chatSection, "");
    createElement("p", "senderMessage", senderBubble, data)
    createElement("img", "senderImage", senderBubble, profileImage)
    chatSection.scrollTop = chatSection.scrollHeight
})


imageButton.addEventListener("click", () => {
    fileChooser.click();
})


socket.on("receiveMessage", (data) => {

    const blob = new Blob([data])
    console.log("hello")
    const bin = URL.createObjectURL(blob);
    createElement("img", "receiveImage", chatSection, bin);
})
