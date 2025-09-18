

const username = document.querySelector(".username");
const password = document.querySelector(".password");
const forms = document.querySelector(".forms");
const usernameHeader = document.querySelector(".usernamePlaceholder");
const passwordHeader = document.querySelector(".passwordPlaceholder");

username.addEventListener("focus", () => {
    usernameHeader.style.transform = "translateY(-1.5rem)"
});

password.addEventListener("focus", () => {
    passwordHeader.style.transform = "translateY(-1.5rem)"
});


username.addEventListener("blur", () => {
    if (!username.value)
        usernameHeader.style.transform = "translateY(0)"
});

password.addEventListener("blur", () => {
    if (!password.value)
        passwordHeader.style.transform = "translateY(0)"
});



forms.addEventListener("submit", async (e) => {
    e.preventDefault();
    const userContent = username.value
    const passContent = password.value;

    if (userContent && passContent) {
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

            if (fetchUrl.status === 200) {
                console.log(toJson.msg)
                window.location.href = "../index.html"
            }
        } catch (e) {
            console.log(e);
        }
    }
})



