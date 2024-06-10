const drawBtn = document.getElementById("draw");
const derivativeBtn = document.getElementById("derivative");
const func = document.getElementById("func");
const c = document.getElementById("canvas");
const ctx = c.getContext("2d");
const scale = 20;
let equation = "";
let der = "";

ctx.font = "italic 28px Times New Roman";
drawBackground();
drawAxes();

drawBtn.addEventListener("click", () => {
    try {
        equation = func.value;
        der = math.derivative(equation, 'x');
        drawBackground();
        drawAxes();
        drawGraph();
    } catch (error) {
        console.error(error);
    }

})

derivativeBtn.addEventListener("click", () => {
    try {
        drawBackground();
        drawAxes();
        drawDerivative();
        drawGraph();
    } catch (error) {
        console.error(error);
    }

})

function drawBackground () {
    ctx.clearRect(0, 0, c.width, c.height);

    ctx.beginPath();

    for (let i = 0; i < 800; i += scale) {

        ctx.strokeStyle = "#ccc";
        ctx.lineWidth = 1;

        ctx.moveTo(i, 0);
        ctx.lineTo(i, 800);
        ctx.moveTo(0, i);
        ctx.lineTo(800, i);

        ctx.stroke();
    }

    ctx.closePath();
}

function drawAxes () {
    ctx.beginPath();

    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;

    ctx.moveTo(400, 0);
    ctx.lineTo(400, 800);
    ctx.moveTo(0, 400);
    ctx.lineTo(800, 400);

    ctx.moveTo(800, 400);
    ctx.lineTo(785, 405);

    ctx.moveTo(800, 400);
    ctx.lineTo(785, 395);

    ctx.moveTo(400, 0);
    ctx.lineTo(395, 15);

    ctx.moveTo(400, 0);
    ctx.lineTo(405, 15);

    ctx.fillText("x", 770, 420);
    ctx.fillText("y", 410, 30);

    ctx.stroke();

    ctx.closePath();
}

function f (x) {
    try {
        return math.evaluate(equation, { x });
    } catch (error) {
        console.error(error);
        return 0;
    }
}

function drawGraph () {
    ctx.save();
    ctx.beginPath();

    ctx.strokeStyle = "red";
    ctx.lineWidth = 3;

    ctx.translate(400, 400);

    for (let x = -400; x < 400; x += 0.5) {
        if (f(x / scale) * scale < 800 && f(x / scale) * scale > -800) {
            ctx.moveTo(x, -f(x / scale) * scale);
            ctx.lineTo(x + 1, -f((x + 1) / scale) * scale);
        }
    }

    ctx.stroke();

    ctx.fillStyle = "rgb(225, 0, 0)";
    ctx.fillText("f(x) = " + equation, -380, -365);

    ctx.closePath();
    ctx.restore();
}

function derivative (x) {
    return der.evaluate({ x });
}

function formatDerivative (derivative) {
    let newString = "";
    derivative = derivative.toString();

    for (let i = 0; i < derivative.length; i++) {
        if (derivative[i] === " " && derivative[i + 1] === "*" && derivative[i + 2] === " ") {
            i += 2;
            continue;
        }
        else {
            newString += derivative[i];
        }
    }
    return newString;
}

function drawDerivative () {
    ctx.save();
    ctx.beginPath();

    ctx.strokeStyle = "blue";
    ctx.lineWidth = 2;

    ctx.translate(400, 400);

    for (let x = -400; x < 400; x++) {
        if (derivative(x / scale) * scale < 800 && derivative(x / scale) * scale > -800) {
            ctx.moveTo(x, -derivative(x / scale) * scale);
            ctx.lineTo(x + 1, -derivative((x + 1) / scale) * scale);
        }
    }

    ctx.fillStyle = "rgb(0, 0, 225)";
    ctx.fillText("f '(x) = " + formatDerivative(der), -380, -315);

    ctx.stroke();

    ctx.closePath();
    ctx.restore();
}