const status = document.getElementById("gameStatus");

status.innerText = "GAME.JS WORKING";

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

resize();
window.addEventListener("resize", resize);

ctx.fillStyle = "#123456";
ctx.fillRect(0, 0, canvas.width, canvas.height);

ctx.fillStyle = "white";
ctx.font = "30px Arial";
ctx.textAlign = "center";
ctx.fillText(
    "SCI-FI GAME TEST",
    canvas.width / 2,
    canvas.height / 2
);

console.log("GAME.JS TEST SUCCESS");
