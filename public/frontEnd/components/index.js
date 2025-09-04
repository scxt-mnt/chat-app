
const parentCard = document.querySelector(".chats");
const nav = document.querySelector(".nav");

function createElement(elementName, className, target, content) {
    const element = document.createElement(elementName);
    element.className = className
    if((elementName === "h1" || "h2" || "h3") && content) element.textContent = content
    if(elementName === "img" && content) element.src = content
    target.appendChild(element)
    return element
}


document.addEventListener("DOMContentLoaded", async () => {

    const url = await fetch("http://127.0.0.1:8080/login", {
        method: "GET",
        headers: { Accept: "application/json" },
        credentials: "include"
    })
    const toJson = await url.json();

    if (url.status === 401) {
        return console.log(toJson.msg);
    }
    console.log(toJson.msg)

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


        createElement("img", "profileImage", nav, data.data.imgLink)
        createElement("h1", "profileName", nav, `${data.data.name} ${data.data.lastName} `)
    }

    if (url.status === 200) {
        toJson.data.map((field) => {

            
            const nameElement = document.createElement("h3");
        
            const containerCard = document.createElement("div")

            createElement("img", "profile", containerCard, (field.ProfileLink ? field.ProfileLink :  "no content") )


            containerCard.className = "accountCard";

            nameElement.textContent = `${field.name} ${field.lastName}`;

            parentCard.appendChild(containerCard);
            containerCard.appendChild(nameElement)
        })
    }
})



