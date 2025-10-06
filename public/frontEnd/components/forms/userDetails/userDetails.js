const fileChooser = document.querySelector(".fileSelector");
const uploadSection = document.querySelector(".uploadSection");

const boxForm = document.querySelector(".boxForm");
const body = document.querySelector("body");

export function createElement(elementName, className, target, content) {
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

uploadSection.addEventListener('click', () => {
    fileChooser.click();
})

fileChooser.addEventListener('change', () => {
    const preview = document.createElement("div");
    preview.className = "preview";
    body.prepend(preview);

    const images = createElement("div", "images", preview, "");

    const previewImage = createElement("img", "previewImage", images, "");

    const buttons = createElement("div", "buttons", preview, "");
    const removeButton = createElement("button", "removeButton", buttons, "cancel");
    const uploadButton = createElement("button", "uploadButton", buttons, "upload");
    const file = fileChooser.files[0];
    const image = URL.createObjectURL(file);
    previewImage.src = image

    removeButton.addEventListener("click", () => {
        fileChooser.value = "";
        body.removeChild(preview);
    });

    uploadButton.addEventListener("click", () => {
        boxForm.removeChild(uploadSection)
        body.removeChild(preview);
        const imageContainer = document.createElement("div");
        imageContainer.className = "imageContainer";
        boxForm.prepend(imageContainer);

        const imageSemiContainer = createElement("div", "imageSemiContainer", imageContainer, "")

        createElement("img", "imageUploaded", imageSemiContainer, image)

    });

});


