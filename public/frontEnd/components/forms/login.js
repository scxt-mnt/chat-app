const username = document.querySelector(".username");
const password = document.querySelector(".password");
const main = document.querySelector(".main");
const forms = document.querySelector(".forms")

const div = document.createElement("h1");
forms.addEventListener("submit", async (e) => {
    e.preventDefault();
    const userContent = username.value
    const passContent = password.value;

    if (userContent  && passContent) {
        try {
            const fetchUrl = await fetch("http://127.0.0.1:8080/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    user: userContent,
                    pass: passContent
                }),
                credentials: "include"
            })
            const toJson = await fetchUrl.json();
            if (fetchUrl.status === 401) return console.log(toJson.msg);
            
            if(fetchUrl.status === 200){
            console.log(toJson.msg)
            window.location.href = "../index.html"

            const getDetails = await fetch("http://127.0.0.1:8080/get-Details");
            const data = await getDetails.json()
        }
        } catch (e) {
            console.log(e);
        }
    }
})



