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
        console.log(event);
        if (event.buttons == 1) {
            event.target.style.backgroundColor = "black";
        }
    })
}


createGrid(50);
createSlider(50);
watchChange();
drawOnTable();


