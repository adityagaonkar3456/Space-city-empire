import { createGame1 } from "./game1.js";

const canvas = document.getElementById("gameCanvas");
const status = document.getElementById("gameStatus");

const game = createGame1(canvas);

const player = game.player;

let x = 0;

function testButton(id, name) {

    const button = document.getElementById(id);

    if (!button) {
        status.innerText = name + " BUTTON NOT FOUND";
        return;
    }

    button.addEventListener("pointerdown", function(e) {

        e.preventDefault();

        x += 2;

        player.position.x = x;

        status.innerText = name + " WORKING";
    });
}

testButton("moveUp", "UP");
testButton("moveDown", "DOWN");
testButton("moveLeft", "LEFT");
testButton("moveRight", "RIGHT");

function animate() {

    requestAnimationFrame(animate);

    game.renderer.render(
        game.scene,
        game.camera
    );
}

animate();
