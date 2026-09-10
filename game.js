import { createGame1 } from "./game1.js";

const canvas = document.getElementById("gameCanvas");
const status = document.getElementById("gameStatus");

const game = createGame1(canvas);

const scene = game.scene;
const camera = game.camera;
const renderer = game.renderer;
const player = game.player;

let moving = false;

/* =========================
   UP BUTTON
========================= */

const up = document.getElementById("moveUp");

up.addEventListener("pointerdown", (e) => {

    e.preventDefault();

    moving = true;

    status.innerText = "MOVING...";
});

up.addEventListener("pointerup", () => {

    moving = false;

    status.innerText = "STOPPED";
});

up.addEventListener("pointercancel", () => {
    moving = false;
});

/* =========================
   MOVEMENT
========================= */

function update() {

    if (moving) {

        player.position.z -= 0.15;
    }
}

/* =========================
   CAMERA
========================= */

camera.position.set(
    0,
    6,
    10
);

camera.lookAt(
    0,
    2,
    0
);

/* =========================
   LOOP
========================= */

function animate() {

    requestAnimationFrame(animate);

    update();

    renderer.render(
        scene,
        camera
    );
}

status.innerText = "UP TEST READY";

animate();
