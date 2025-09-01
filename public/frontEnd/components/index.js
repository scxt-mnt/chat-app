
const parentCard = document.querySelector(".chats");

let userData;


document.addEventListener("DOMContentLoaded", async () => {

    const url = await fetch("http://localhost:8080/accounts", {
        method: "GET",
        headers: { Accept: "application/json" }
    })
    const toJson = await url.json();

    if (url.status === 401) {
        return console.log(toJson.msg);
    }

    userData = toJson.data;
    console.log(toJson.msg)

    if(userData.data){
    userData.forEach((field) => {
        const cardElement = document.createElement("div");
        cardElement.className = "accountCard" ;
        cardElement.textContent = field;
        parentCard.appendChild(cardElement.name);
    })
}
})



