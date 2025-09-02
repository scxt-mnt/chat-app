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
            const fetchUrl = await fetch("http://localhost:8080/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    user: userContent,
                    pass: passContent
                })
            })
            const toJson = await fetchUrl.json();
            if (toJson.status === 401) return console.log(toJson.msg);
            console.log(toJson.msg)
            window.location.href = "/public/frontEnd/components/index.html"
        } catch (e) {
            console.log(e);
        }
    }
})



