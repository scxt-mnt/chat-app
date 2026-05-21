const loginDir = document.querySelector(".loginDir");
const googleBox = document.querySelector(".googleBox");
const facebookBox = document.querySelector(".facebookBox");
const instagramBox = document.querySelector(".instagramBox");

loginDir.addEventListener("click", () => {
    window.location.href = "http://127.0.0.1:5501/public/frontEnd/components/forms/login.html";
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
