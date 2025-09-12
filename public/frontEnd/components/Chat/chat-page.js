import { io } from "https://cdn.socket.io/4.7.2/socket.io.esm.min.js";

const messageButton = document.querySelector(".sendButton")
const messageInput = document.querySelector(".messageInput");
const chatSection = document.querySelector(".chatSection");
const profileNav = document.querySelector(".profileNav")
const navButton = document.querySelector(".navButton");
const body = document.querySelector("body");
const navLine2 = document.querySelector(".navLine2")

let isClick = false;
let myProfilePicture = "";
let myName = "";
let myLastName = "";
let isActive;

function createElement(elementName, className, target, content) {
    const element = document.createElement(elementName);
    element.className = className
    if ((elementName === "h1" || "h2" || "h3" || "p" || "button") && content) element.textContent = content
    if (elementName === "img" && content) element.src = content
    target.appendChild(element)
    return element
}



const socket = io("http://127.0.0.1:8080");
const params = new URLSearchParams(window.location.search)
const targetUserId = params.get("userId")
let profileImage = ""




document.addEventListener("DOMContentLoaded", async () => {

    //get own details

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

    myProfilePicture = data.data.imgLink
    myName = data.data.name
    myLastName = data.data.lastName


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
        createElement("div", "messageBox", chatSection, messageValue)
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
    createElement("div", "senderMessage", senderBubble, data)
    createElement("img", "senderImage", senderBubble, profileImage)
    chatSection.scrollTop = chatSection.scrollHeight
})










// side bar
navButton.addEventListener("click", async () => {


    isClick = !isClick
    if (isClick) {
        const sideBar = document.createElement("main");



        sideBar.className = "sideBar"
        body.prepend(sideBar)
        navLine2.style.transform = 'rotate(0deg)'
        navLine2.style.backgroundColor = "red"
        sideBar.style.animation = "slide 0.7s ease-out"

        const sideBarContainer1 = createElement("div", "sideBarContainer1", sideBar, "")
        const sideBarContainer2 = createElement("div", "sideBarContainer2", sideBar, "")
        const sideBarContainer3 = createElement("div", "sideBarContainer3", sideBar, "")
        const sideBarContainer4 = createElement("div", "sideBarContainer4", sideBar, "")
        const sideBarContainer5 = createElement("div", "sideBarContainer5", sideBar, "")


        // sideBar1 elements
        createElement("img", "sideBarLogo", sideBarContainer1, "https://res.cloudinary.com/doan4g4r9/image/upload/v1757576831/white_on_trans_xxuhpm.png");
        // sideBar2 elements
        const sideBarSearch = createElement("input", "sideBarSearch", sideBarContainer2, "");
        sideBarSearch.placeholder = "Search Messages"
        //sideBar3 elements
        const sideBarReport = createElement("div", "sideBarReport", sideBarContainer3, "")
        createElement("img", "reportLogo", sideBarReport, "https://res.cloudinary.com/doan4g4r9/image/upload/v1757576857/icons8-warning-shield-50_sr2ang.png")
        createElement("h3", "reportHeader", sideBarReport, "Report")


        const sideBarNotifications = createElement("div", "sideBarNotifications", sideBarContainer3, "")
        createElement("img", "reportLogo", sideBarNotifications, "https://res.cloudinary.com/doan4g4r9/image/upload/v1757576857/icons8-notifications-78_nkidsw.png")
        createElement("h3", "reportHeader", sideBarNotifications, "Notifications")

        const sideBarContacts = createElement("div", "sideBarContacts", sideBarContainer3, "");
        createElement("img", "contactsLogo", sideBarContacts, "https://res.cloudinary.com/doan4g4r9/image/upload/v1757576857/icons8-contacts-50_ciwjdx.png")
        createElement("h3", "contactsHeader", sideBarContacts, "Contacts")

        const sideBarFAQ = createElement("div", "sideBarFAQ", sideBarContainer3, "");
        createElement("img", "faqLogo", sideBarFAQ, "https://res.cloudinary.com/doan4g4r9/image/upload/v1757579900/icons8-faq-24_gzwat1.png")
        createElement("h3", "faqHeader", sideBarFAQ, "FAQ   ")



        const sideBarSettings = createElement("div", "sideBarSettings", sideBarContainer4, "");
        createElement("img", "settingsLogo", sideBarSettings, "https://res.cloudinary.com/doan4g4r9/image/upload/v1757576856/icons8-settings-50_wdegm5.png")
        createElement("h3", "settingsHeader", sideBarSettings, "Settings")




        const sideBarProfile = createElement("div", "sideBarProfile", sideBarContainer5, "");
        const sideBarProfileDiv = createElement("div", "sideBarProfiileDiv", sideBarProfile, "");
        createElement("img", "sideBarProfileImg", sideBarProfileDiv, myProfilePicture);
        createElement("div", "sideBarProfileHeaders", sideBarProfileDiv, `${myName} ${myLastName}`);
        console.log(isActive)
        if (isActive) {
            createElement("div", "myStatus", sideBarProfileDiv, "");
        }
        createElement("h3", "logoutHeader", sideBarProfile, "Log out")


    } else {
        const sideBar = document.querySelector(".sideBar")
        navLine2.style.transform = 'rotate(90deg)'
        navLine2.style.transition = "transform 0.5s"
        navLine2.style.backgroundColor = "white"
        sideBar.style.animation = "fade-out 0.7s ease-out"

        sideBar.addEventListener("animationend", (e) => {
            if (e.animationName === "fade-out") {
                body.removeChild(sideBar)
            }
        }, { once: true })
    }
})

