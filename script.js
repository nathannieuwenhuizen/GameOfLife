window.addEventListener("load", function () {
    let speedSlider = document.getElementById("speedSlider");
    let nextButton = document.getElementById("nextButton");
    let gridSize = document.getElementById("gridSize");
    let newGridButton = document.getElementById("newGrid");
    let speed = 0;
    let itteration;
    let canvas = document.getElementById("canvas");
    let context = canvas.getContext('2d');
    let patterns = new PatternsData();
    //canvas.width = window.innerWidth * 0.9;
    //canvas.height = window.innerHeight*0.8;
    let grid = new Grid(canvas.width, canvas.height,100, 100, context);
    canvas.addEventListener("click", function (e) {
        grid.SpawnBlock(new Vector(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop));
        //context.clearRect(0, 0, canvas.width, canvas.height);
        //context.fill();
        grid.renderGrid(context);
    });
    //grid.declareSpecificGridArea(new Vector(5,5),patterns.glidergun);
    newGridButton.onclick = function () {
        grid.makeGrid(gridSize.value, Math.round(gridSize.value * (canvas.height / canvas.width)));
        
        //grid.declareSpecificGridArea(new Vector(5,5),patterns.glidergun);
        grid.renderGrid(context);
    }
    nextButton.onclick = function () {
        update();
    };
    speedSlider.onchange = function () {
        console.log("change");
        clearInterval(itteration);
        if (speedSlider.value != 0) itteration = setInterval(function () {
            update();
        }, 1000 - speedSlider.value * 9.9);
    };
    grid.renderGrid(context);

    function update() {
        //context.clearRect(0,0,canvas.width,canvas.height);
        //context.fill();
        grid.LiveOrDie();
        grid.renderGrid(context);
    }
}, false);