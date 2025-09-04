
const parentCard = document.querySelector(".chats");

let userData;


document.addEventListener("DOMContentLoaded", async () => {

    const url = await fetch("http://localhost:8080/accounts", {
        method: "GET",
        headers: { Accept: "application/json" },
        credentials: "include"
    })
    const toJson = await url.json();

    if (url.status === 401) {
        return console.log(toJson.msg);
    }

    userData = toJson.data;
    console.log(toJson.msg)

    if (userData) {
        console.log(userData)
        userData.map((field) => {
            const nameElement = document.createElement("h3");
            const imageElement = document.createElement("img")
            const containerCard = document.createElement("div")

            imageElement.src = field.ProfileLink;



            containerCard.className = "accountCard";
            imageElement.className = "profile";

            nameElement.textContent = `${field.name} ${field.lastName}`;

            parentCard.appendChild(containerCard);
            containerCard.appendChild(imageElement)
            containerCard.appendChild(nameElement)


        })
    }
})



