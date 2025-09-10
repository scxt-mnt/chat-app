import { io } from "https://cdn.socket.io/4.7.2/socket.io.esm.min.js";

const messageButton = document.querySelector(".sendButton")
const messageInput = document.querySelector(".messageInput");
const chatSection = document.querySelector(".chatSection");
const profileNav = document.querySelector(".profileNav")
const navButton = document.querySelector(".navButton");
const body = document.querySelector("body");
const navLine2 = document.querySelector(".navLine2")

let isClick = false;




// side bar
navButton.addEventListener("click", () => {

    isClick = !isClick
    if (isClick) {
        const sideBar = document.createElement("main");
        sideBar.className = "sideBar"
        body.prepend(sideBar)
        navLine2.style.transform = 'rotate(0deg)'
        navLine2.style.backgroundColor = "red"
        sideBar.style.animation = "slide 1s ease-out"
    } else {
        const sideBar = document.querySelector(".sideBar")
        navLine2.style.transform = 'rotate(90deg)'
        navLine2.style.transition = "transform 0.5s"
        navLine2.style.backgroundColor = "white"
        sideBar.style.animation = "fade-out 1s ease-out"

        sideBar.addEventListener("animationend", (e) => {
            if (e.animationName === "fade-out") {
                body.removeChild(sideBar)
            }
        }, { once: true })
    }
})



const socket = io("http://127.0.0.1:8080");
const params = new URLSearchParams(window.location.search)
const targetUserId = params.get("userId")
let profileImage = ""

function createElement(elementName, className, target, content) {
    const element = document.createElement(elementName);
    element.className = className
    if ((elementName === "h1" || "h2" || "h3" || "p") && content) element.textContent = content
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

//send messages

messageButton.addEventListener("click", () => {
    const messageValue = messageInput.value
    if (messageValue) {
        createElement("div", "messageBox", chatSection, messageValue)
        socket.emit("message", messageValue, targetUserId)
        chatSection.scrollTop = chatSection.scrollHeight
    }
    messageInput.value = ""
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
    profileImage = toJson.data.ProfileLink

    if (fetchData.status === 401) return console.log(toJson.msg)
    if (fetchData.status === 200) {
        console.log(toJson.msg)
        createElement("img", "userProfile", profileNav, toJson.data.ProfileLink)
        createElement("p", "userName", profileNav, `${toJson.data.name} ${toJson.data.lastName}`)
    }

})

createElement("div", "offStatus", profileNav, "");

// checks active user

socket.on("activeUser", (data) => {
    console.log(data.isActive);
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
    createElement("div", "senderMessage", senderBubble, data)
    createElement("img", "senderImage", senderBubble, profileImage)
    chatSection.scrollTop = chatSection.scrollHeight
})






