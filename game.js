import { createGame1 } from "./game1.js";

const canvas = document.getElementById("gameCanvas");
const status = document.getElementById("gameStatus");

const game = createGame1(canvas);

const scene = game.scene;
const camera = game.camera;
const renderer = game.renderer;
const player = game.player;

// UP BUTTON
const up = document.getElementById("moveUp");

up.addEventListener("pointerdown", () => {
    player.position.z -= 2;
    status.innerText = "UP WORKING";
});

// DOWN BUTTON
const down = document.getElementById("moveDown");

down.addEventListener("pointerdown", () => {
    player.position.z += 2;
    status.innerText = "DOWN WORKING";
});

// LEFT BUTTON
const left = document.getElementById("moveLeft");

left.addEventListener("pointerdown", () => {
    player.position.x -= 2;
    status.innerText = "LEFT WORKING";
});

// RIGHT BUTTON
const right = document.getElementById("moveRight");

right.addEventListener("pointerdown", () => {
    player.position.x += 2;
    status.innerText = "RIGHT WORKING";
});

// CAMERA - FIXED
camera.position.set(0, 6, 30);

camera.lookAt(
    player.position.x,
    player.position.y + 1.5,
    player.position.z
);

// GAME LOOP
function animate() {

    requestAnimationFrame(animate);

    renderer.render(scene, camera);
}

status.innerText = "MOVEMENT TEST READY";

animate();

// RESIZE
window.addEventListener("resize", () => {

    camera.aspect =
        window.innerWidth /
        window.innerHeight;

    camera.updateProjectionMatrix();

    renderer.setSize(
        window.innerWidth,
        window.innerHeight
    );
});
