function createGrid(size) {
    let table = document.querySelector("#table");
    let tableWidth = table.clientWidth;
    let tableHeight = table.clientHeight;

    //Create Rows
    for (let i = 0; i < size; i++) {
        let row = document.createElement("div");
        row.className = "row";
        row.style.width = tableWidth;
        row.style.height = tableHeight / size + "px";
        table.appendChild(row);
        
        //Fill one Row with Cells
        for (let j = 0; j < size; j++) {
            let cell = document.createElement("div");
            cell.className = "cell";
            cell.style.width = tableWidth / size + "px";
            cell.style.height = tableHeight / size + "px";

            row.appendChild(cell);
        }
    }  
}

function createSlider(size) {
    let slider = document.createElement("input");
    slider.id = "slider";
    slider.type= "range";
    slider.min = "2";
    slider.max ="100";
    slider.step = "1";
    slider.value = size;

    let inputContainer = document.querySelector("#inputContainer");
    inputContainer.appendChild(slider);

    createInputText(size);



}

function createInputText(number) {
    let inputText = document.querySelector("#rangeInputText")
    if (!inputText) {
        let inputText = document.createElement("p");
        inputText.id = "rangeInputText";
        inputText.textContent = `${number} x ${number}`;

        let inputContainer = document.querySelector("#inputContainer");
        inputContainer.appendChild(inputText);
    } else {
        document.querySelector("#rangeInputText").textContent = `${number} x ${number}`;
    }
}

function watchChange() {
    let slider = document.querySelector("#slider");
    let table = document.querySelector("#table");

    slider.addEventListener("input", () => {
        createInputText(slider.value);
        table.replaceChildren();
        createGrid(slider.value);
    })
}

function drawOnTable() {
    let table = document.querySelector("#table");
    table.addEventListener("dragstart", (e) => {
        e.preventDefault();
    })

    table.addEventListener("mouseover", (event) => {
        event.preventDefault();

        if (event.buttons == 1) {
            let bgColor = event.target.style.backgroundColor;
            if (bgColor == "" && event.target.className === "cell") {
                event.target.style.backgroundColor = randomRgb();
            } else {
                event.target.style.backgroundColor = shadeRgb(event.target.style.backgroundColor);
                console.log("currentBG: "+ event.target.style.backgroundColor);
                console.log("shadeBG: " + shadeRgb(event.target.style.backgroundColor));
            }
        }
    })
}

function randomRgb() {
    let r = Math.round(Math.random() * 255);
    let g = Math.round(Math.random() * 255);
    let b = Math.round(Math.random() * 255);
    return `rgba(${r}, ${g}, ${b}, 0.1)`;
}

function shadeRgb(rgbaString) {
    let arr = rgbaString.split(",");
    let alpha = Number(arr[3].slice(1,-1));
    
    if (alpha < 1) {
        alpha += 0.1;
    }
    
    arr[3] = " " + alpha + ")";
    
    
    return(arr.join(","));
}

shadeRgb("rgba(233, 200, 200, 0.1)");

function setCleanButton() {
    let cleanBtn = document.createElement("button");
    cleanBtn.textContent = "CLEAN";
    cleanBtn.id = "cleanBtn";
    
    let inputContainer = document.querySelector("#inputContainer");
    inputContainer.append(cleanBtn);

    let cells = document.querySelectorAll(".cell")
    cleanBtn.addEventListener("click", () => {
        cells.forEach(cell => {
            cell.style.backgroundColor = ""
        });
    })
}

createGrid(50);
createSlider(50);
setCleanButton();
watchChange();
drawOnTable();


