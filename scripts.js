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

    setSliderText(size);



}

function setSliderText(number) {
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

function setNewTable() {
    let slider = document.querySelector("#slider");
    let table = document.querySelector("#table");

    slider.addEventListener("input", () => {
        setSliderText(slider.value);
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
        
        
        if (event.buttons == 1) {
            let bgColor = event.target.style.backgroundColor;
            let color = document.querySelector(".colorBtn").textContent;

            if (bgColor == "" && event.target.className === "cell") {
                switch(color) {
                    case("COLOR"):
                        event.target.style.backgroundColor = randomRgb();
                        break;
                    case("B&W"):
                        event.target.style.backgroundColor = "rgba(0, 0, 0, 0.1)";
                        break;
                }
            } else if (bgColor != "" && event.target.className === "cell") {
                switch(color) {
                    case("COLOR"):
                        event.target.style.backgroundColor = 
                            setColorAlpha(event.target.style.backgroundColor);
                        break;
                    case("B&W"):
                        event.target.style.backgroundColor = 
                            setColorAlpha(event.target.style.backgroundColor);
                        break;
                        
                }
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

function setColorAlpha(rgbaString) {
    let arr = rgbaString.split(",");

    if (arr.length > 3) {
        let alpha = Number(arr[3].trimStart().slice(0,-1));
        if (alpha < 1) {
            alpha += 0.1;
            arr[3] = " " + alpha + ")";
        }
    }
    return(arr.join(","));
}


function setButtons() {

    //Create & Apend Buttons 
    //------------------------------------------------------------------
    let cleanBtn = document.createElement("button");
    cleanBtn.textContent = "CLEAN";
    cleanBtn.id = "cleanBtn";

    let colorBtn = document.createElement("button");
    colorBtn.textContent = "COLOR";
    colorBtn.className = "colorBtn";
    colorBtn.id = "colorBtn";


    
    let inputContainer = document.querySelector("#inputContainer");
    let buttonsContainer = document.createElement("div");
    buttonsContainer.id = "buttonsContainer";

    buttonsContainer.append(colorBtn);
    buttonsContainer.append(cleanBtn);


    inputContainer.append(buttonsContainer);
    //------------------------------------------------------------------
    
    
    //Clean table with button click
    //------------------------------------------------------------------
    let cells = document.querySelectorAll(".cell")
    
    cleanBtn.addEventListener("click", () => {
        cells.forEach(cell => {
            cell.style.backgroundColor = ""
        });
    })
    //------------------------------------------------------------------
    
    //Color Button event listeners
    //------------------------------------------------------------------
    setColor();

    

}

function setColor() {
    let pencilColor = document.querySelector(".colorBtn");

    pencilColor.addEventListener("click", () => {
        if (pencilColor.textContent === "COLOR") {
            pencilColor.textContent = "B&W";
            pencilColor.id = "bwButton";
        } else {
            pencilColor.textContent = "COLOR";
            pencilColor.id = "colorBtn";
        }
    });
}

createGrid(50);
createSlider(50);
setButtons();
setNewTable();
drawOnTable();


