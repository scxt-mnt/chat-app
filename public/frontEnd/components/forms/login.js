
const username = document.querySelector(".username");
const password = document.querySelector(".password");
const forms = document.querySelector(".forms");
const usernameHeader = document.querySelector(".usernamePlaceholder");
const passwordHeader = document.querySelector(".passwordPlaceholder");
const usernameSection = document.querySelector(".usernameSection")

function createElement(elementName, className, target, content) {
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
            if (fetchUrl.status === 401) {
                let errSection = document.querySelector(".errorSec");


                if (!errSection) {
                    errSection = createElement("p", "errorSec", usernameSection, "credentials error");

                    [username, password].forEach((el) => el.addEventListener("click", () => {
                        errSection?.remove();
                    }))
                } else {
                    errSection.textContent = "credentials error"
                    [username, password].forEach((el) => el.addEventListener("click", () => {
                        errSection?.remove();
                    }))
                }
            }

            if (fetchUrl.status === 200) {
                console.log(toJson.msg)
                window.location.href = "../index.html"
            }
        } catch (e) {
            console.log(e);
        }
    }
})



