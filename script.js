window.addEventListener("load", function () {
    let speedSlider = document.getElementById("speedSlider");
    let nextButton = document.getElementById("nextButton");
    let gridSize = document.getElementById("gridSize");
    let newGridButton = document.getElementById("newGrid");
    let speed = 0;
    let itteration;
    let canvas = document.getElementById("canvas");
    let context = canvas.getContext('2d');
    //canvas.width = window.innerWidth * 0.9;
    //canvas.height = window.innerHeight*0.8;
    let grid = new Grid(canvas.width, canvas.height, Math.round(canvas.width / 3), Math.round(canvas.height / 2), context);
    canvas.addEventListener("click", function (e) {
        grid.SpawnBlock(new Vector(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop));
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.fill();
        grid.update(context);
    });
    newGridButton.onclick = function () {
        grid.makeGrid(gridSize.value, Math.round(gridSize.value * (canvas.height / canvas.width)));
        grid.update(context);
    }
    nextButton.onclick = function () {
        update();
    };
    speedSlider.onchange = function () {
        console.log("change");
        clearInterval(itteration);
        if (speedSlider.value != 0) itteration = setInterval(function () {
            update();
        }, 1000 - speedSlider.value * 9.5);
    };
    grid.update(context);

    function update() {
        //context.clearRect(0,0,canvas.width,canvas.height);
        //context.fill();
        grid.LiveOrDie();
        grid.update(context);
    }
}, false);