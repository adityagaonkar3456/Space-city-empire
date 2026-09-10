import { createGame1 } from "./game1.js";

const canvas = document.getElementById("gameCanvas");
const status = document.getElementById("gameStatus");

if (!canvas) {
    throw new Error("gameCanvas not found");
}

const game = createGame1(canvas);

const {
    scene,
    camera,
    renderer,
    player
} = game;

/* =========================
   CONTROLS
========================= */

const keys = {};

window.addEventListener("keydown", (event) => {
    keys[event.key.toLowerCase()] = true;
});

window.addEventListener("keyup", (event) => {
    keys[event.key.toLowerCase()] = false;
});

/* Mobile buttons */

function setupButton(id, key) {

    const button = document.getElementById(id);

    if (!button) return;

    button.addEventListener("pointerdown", (event) => {
        event.preventDefault();
        keys[key] = true;
    });

    button.addEventListener("pointerup", (event) => {
        event.preventDefault();
        keys[key] = false;
    });

    button.addEventListener("pointercancel", () => {
        keys[key] = false;
    });
}

setupButton("moveUp", "w");
setupButton("moveDown", "s");
setupButton("moveLeft", "a");
setupButton("moveRight", "d");
setupButton("runButton", "shift");

/* =========================
   PLAYER MOVEMENT
========================= */

function updatePlayer() {

    let speed = 0.12;

    if (keys["shift"]) {
        speed = 0.22;
    }

    if (keys["w"]) {
        player.position.z -= speed;
    }

    if (keys["s"]) {
        player.position.z += speed;
    }

    if (keys["a"]) {
        player.position.x -= speed;
    }

    if (keys["d"]) {
        player.position.x += speed;
    }
}

/* =========================
   CAMERA
========================= */

function updateCamera() {

    camera.position.x = player.position.x;

    camera.position.y = player.position.y + 6;

    camera.position.z = player.position.z + 10;

    camera.lookAt(
        player.position.x,
        player.position.y + 1.5,
        player.position.z
    );
}

/* =========================
   GAME LOOP
========================= */

function animate() {

    requestAnimationFrame(animate);

    updatePlayer();

    updateCamera();

    renderer.render(
        scene,
        camera
    );
}

/* =========================
   STATUS
========================= */

if (status) {
    status.innerText = "V3.0 — GAME READY";
}

/* =========================
   RESIZE
========================= */

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

animate();
