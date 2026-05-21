const signupDir = document.querySelector(".signupDir");
const googleBox = document.querySelector(".googleBox");
const facebookBox = document.querySelector(".facebookBox");
const instagramBox = document.querySelector(".instagramBox");
const username = document.querySelector(".username");
const password = document.querySelector(".password");
const forms = document.querySelector(".forms");
const usernameHeader = document.querySelector(".usernamePlaceholder");
const passwordHeader = document.querySelector(".passwordPlaceholder");
const usernameSection = document.querySelector(".usernameSection");

function createElement(elementName, className, target, content) {
    const element = document.createElement(elementName);
    element.className = className;
    if ((elementName === "h1" ||
        elementName === "h2" ||
        elementName === "h3" ||
        elementName === "p" ||
        elementName === "button") && content) element.textContent = content;
    if (elementName === "img" && content) element.src = content;
    target.appendChild(element);
    return element;
}

function liftLabel(label) {
    label.style.transform = "translateY(-0.68rem) scale(0.78)";
    label.style.transformOrigin = "left top";
}

function resetLabel(label) {
    label.style.transform = "translateY(0) scale(1)";
}

signupDir.addEventListener("click", () => {
    window.location.href = "http://127.0.0.1:5501/public/frontEnd/components/forms/signup.html";
});

googleBox.addEventListener("click", () => {
    window.location.href = "http://127.0.0.1:8080/auth/google";
});

[facebookBox, instagramBox].forEach((provider) => {
    provider.addEventListener("click", () => {
        provider.classList.add("oauthUnavailable");
        setTimeout(() => provider.classList.remove("oauthUnavailable"), 900);
    });
});

username.addEventListener("focus", () => liftLabel(usernameHeader));
password.addEventListener("focus", () => liftLabel(passwordHeader));

username.addEventListener("blur", () => {
    if (!username.value) resetLabel(usernameHeader);
});

password.addEventListener("blur", () => {
    if (!password.value) resetLabel(passwordHeader);
});

forms.addEventListener("submit", async (e) => {
    e.preventDefault();
    const userContent = username.value;
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
            });
            const toJson = await fetchUrl.json();
            if (fetchUrl.status === 401) {
                let errSection = document.querySelector(".errorSec");

                if (!errSection) {
                    errSection = createElement("p", "errorSec", usernameSection, "credentials error");

                    [username, password].forEach((el) => el.addEventListener("click", () => {
                        errSection?.remove();
                    }));
                } else {
                    errSection.textContent = "credentials error";
                }
            }

            if (fetchUrl.status === 200) {
                console.log(toJson.msg);
                window.location.href = "../index.html";
            }
        } catch (e) {
            console.log(e);
        }
    }
});
