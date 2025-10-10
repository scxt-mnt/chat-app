
const loginDir = document.querySelector(".loginDir");
const googleBox = document.querySelector(".googleBox");


loginDir.addEventListener("click", () => {
    console.log("click");
    window.location.href = "http://127.0.0.1:5501/public/frontEnd/components/forms/login.html"
})

googleBox.addEventListener("click", () => {
    window.location.href = "http://127.0.0.1:8080/auth/google";
})