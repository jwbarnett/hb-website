const contentTitle = document.getElementById("content-title");
const constructionParagraph = document.getElementById("construction-paragraph");
const contentElement = document.getElementById("content");
const endlessElement = document.getElementById("endless");

const lotsOfOs = "o".repeat(3000);
const specialDate = new Date(2025, 1, 3);
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
    setSpecialDateContent(endlessElement);

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

function setSpecialDateContent(endlessElementNode) {
    document.title = "Happy Birthday!";
    constructionParagraph.setAttribute("hidden", true);

    contentTitle.innerText = "Happy Birthday, Claire!";

    const textSpan = document.createElement("span");
    const content = document.createTextNode("Here is some text");
    textSpan.appendChild(content);
    endlessElementNode.appendChild(textSpan);
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
    const content = document.createTextNode(" much");
    textSpan.appendChild(content);
    parentNode.appendChild(textSpan);
}
