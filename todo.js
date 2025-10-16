let stuff = [];


const input = document.querySelector("input");
const list = document.querySelector("#list");


const redB = document.querySelector("#r");
const yellowB = document.querySelector("#y");
const greenB = document.querySelector("#g");


let bullets = document.createDocumentFragment();


let ifEdit = false;
let boxV;
let position;

function loadUI() {
    while (list.firstChild) {
        list.removeChild(list.firstChild);
    }
    for (let i = 0; i < stuff.length; i++) {
        const b = document.createElement("li");
        const sp = document.createElement("span");
        const sp2 = document.createElement("span");
        sp2.textContent = "_____";
        sp2.setAttribute("class", "space");
        sp.textContent = `${stuff[i].slice(0, stuff[i].length - 1)}`;
        sp.setAttribute("title", "Right-click me to edit!");
        switch (stuff[i].charAt(stuff[i].length - 1)) {
            case "r": sp.setAttribute("class", "red"); break;
            case "y": sp.setAttribute("class", "yellow"); break;
            case "g": sp.setAttribute("class", "green"); break;
        }
        ifEdit = false;
        b.appendChild(sp);
        b.appendChild(sp2);
        b.appendChild(buildDeleteButton(i));
        b.addEventListener("contextmenu", (e) => editText(sp.textContent, e, sp, i, b));
        bullets.appendChild(b);
    }
    list.appendChild(bullets);
}




function editText(text, e, child, i, parent) {
    e.preventDefault();
    let box = document.createElement("input");
    box.setAttribute("type", "text");
    box.setAttribute("value", `${text}`);
    stuff.splice(i, 1);
    parent.insertBefore(box, child);
    child.textContent = "";
    boxV = box;
    position = i;
    ifEdit = true;
    input.disabled = true;
    document.querySelectorAll("button").forEach(btn => {
        btn.disabled = true;
    });
    redB.disabled = false;
    yellowB.disabled = false;
    greenB.disabled = false;
    box.focus();
}


function isRed(str) {
    return (str.charAt(str.length - 1) === "r");
}


function isYellow(str) {
    return (str.charAt(str.length - 1) === "y");
}


function isGreen(str) {
    return (str.charAt(str.length - 1) === "g");
}


function removeBullet(e) {
    stuff.splice(Number(`${e.target.getAttribute("id").slice(1)}`), 1);
    localStorage.setItem("stuff", JSON.stringify(stuff));
    loadUI();
}


function buildDeleteButton(num) {
    const del = document.createElement("button");
    del.setAttribute("id", `b${num}`);
    del.setAttribute("type", "button");
    del.textContent = "Finished!";
    del.addEventListener("click", removeBullet);
    return del;
}

function whenSubmit(c) {
    if (!ifEdit) {
        stuff.push(`${input.value}${c}`);
    }
    else {
        stuff.splice(position, 0, `${boxV.value}${c}`);
        input.disabled = false;
    }
    console.log(`${stuff}`);
    let rValues = stuff.filter(isRed);
    let yValues = stuff.filter(isYellow);
    let gValues = stuff.filter(isGreen);
    gValues = gValues.concat(yValues);
    stuff = gValues.concat(rValues);
    localStorage.setItem("stuff", JSON.stringify(stuff));
    input.value = "";
    input.focus();
    loadUI();
}


stuff = JSON.parse(localStorage.getItem("stuff"));
if(stuff===null){
    stuff = ["Learn Gitg"];
}
loadUI();
input.focus();


redB.addEventListener("click", () => whenSubmit("r"));
yellowB.addEventListener("click", () => whenSubmit("y"));
greenB.addEventListener("click", () => whenSubmit("g"));

