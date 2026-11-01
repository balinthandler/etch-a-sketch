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

createGrid(5);