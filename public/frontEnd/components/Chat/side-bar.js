import { createElement } from "./chat-page.js";
import { isActive } from "./chat-page.js";
import { socket } from "./chat-page.js";




let isClick = false;

export let loading;



const navButton = document.querySelector(".navButton");
const body = document.querySelector("body");
const navLine2 = document.querySelector(".navLine2")




let myProfilePicture = "";
let myName = "";
let myLastName = "";


document.addEventListener('DOMContentLoaded', async () => {
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
        const sideBarLogo = createElement("img", "sideBarLogo", sideBarContainer1, "https://res.cloudinary.com/doan4g4r9/image/upload/v1757576831/white_on_trans_xxuhpm.png");
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
        createElement("button", "logoutHeader", sideBarProfile, "Log out")

        const logoutHeader = document.querySelector(".logoutHeader");



        //loading animations

        const loadingAnimation = () => {
            const loadingAnimationDiv = createElement("div", "loadingAnimationDiv", sideBar, "");
            const loadingAnimation = createElement("div", "loadingAnimation", loadingAnimationDiv, "");
            return loadingAnimation;
        }

        logoutHeader.addEventListener("click", async () => {

            loading = loadingAnimation();
            const setLogout = await fetch('http://127.0.0.1:8080/logout', {
                headers: {
                    Accept: "application/json"
                },
                credentials: 'include'
            })

            const data = await setLogout.json();

            if (setLogout.status === 200) {
                console.log(data.msg)
                loading.style.visibility = "hidden";
                window.location.href = "http://127.0.0.1:5501/public/frontEnd/components/forms/login.html";
            }
        })



    } else {
        const sideBar = document.querySelector(".sideBar")

        sideBar.innerHTML = ""

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

