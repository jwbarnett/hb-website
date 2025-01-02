const contentTitle = document.getElementById("content-title");
const constructionParagraph = document.getElementById("construction-paragraph");
const contentElement = document.getElementById("content");
const endlessElement = document.getElementById("endless-os");

const specialDateInitialText = "To my wonderful wife, wishing you the best birthday. Since you asked me how " +
"much I love you, I figured part of this present would be providing the answer. So here it is: I love you sooo";

const lotsOfOs = "o".repeat(3000);
const specialDate = new Date(2025, 1, 2);
const numberOfScrolls = 10;

const addedSpans = [];

let counter = 0;

const appendOs = (entries, observer) => {
    entries.forEach((entry) => {
        console.log(`Crossing threshold of target ${entry.target.id} with intersection ratio ${entry.intersectionRatio}`);
        if (entry.intersectionRatio >= 0.25) {
            if (counter < numberOfScrolls) {
                const previousSpan = addedSpans.shift();
                observer.unobserve(previousSpan);

                const newSpan = appendOsNode(endlessElement, counter++);
                observer.observe(newSpan);
                addedSpans.push(newSpan);
            } else {
                console.log("Added all spans, adding final text")
                const previousSpan = addedSpans.shift();
                observer.unobserve(previousSpan);

                appendFinalText(contentElement);
            }
        }
    })
}

if (new Date().getDate() === specialDate.getDate()) {
    setSpecialDateContent(contentElement);

    const options = {
        root: document.querySelector("#scrollArea"),
        rootMargin: "0px",
        threshold: [0.25]
    };

    const observer = new IntersectionObserver(appendOs, options);

    const newSpan = appendOsNode(endlessElement, counter++);
    addedSpans.push(newSpan);
    observer.observe(newSpan);
}

function setSpecialDateContent(parentNode) {
    document.title = "Happy Birthday!";
    constructionParagraph.setAttribute("hidden", true);

    contentTitle.innerText = "Happy Birthday, Claire!";

    const textSpan = document.createElement("span");
    textSpan.classList.add("text");
    const content = document.createTextNode(specialDateInitialText);
    textSpan.appendChild(content);
    parentNode.prepend(textSpan);
}

function appendOsNode(parentNode, counter) {
    console.log("Appending new span");
    const newSpan = document.createElement("span");
    newSpan.id = `span-${counter}`;
    const newContent = document.createTextNode(lotsOfOs);
    newSpan.appendChild(newContent);
    parentNode.appendChild(newSpan);
    return newSpan;
}

function appendFinalText(parentNode) {
    const textSpan = document.createElement("span");
    textSpan.classList.add("text", "range-class");
    const content = document.createTextNode(" much. Happy birthday!");
    textSpan.appendChild(content);

    const specialDayImage = new Image(200);
    specialDayImage.src = "static/images/hbd.png";
    const cakeImage = new Image(200);
    cakeImage.src = "static/images/cake.jpg";

    parentNode.appendChild(textSpan);
    parentNode.appendChild(specialDayImage);
    parentNode.appendChild(cakeImage);
}
