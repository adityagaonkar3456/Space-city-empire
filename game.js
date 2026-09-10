import { createGame1 } from "./game1.js";

const canvas = document.getElementById("gameCanvas");
const status = document.getElementById("gameStatus");

const game = createGame1(canvas);

const scene = game.scene;
const camera = game.camera;
const renderer = game.renderer;
const player = game.player;

// =========================
// KEY STATE
// =========================

const keys = {
    w: false,
    a: false,
    s: false,
    d: false,
    shift: false
};

// =========================
// KEYBOARD
// =========================

window.addEventListener("keydown", (e) => {

    const key = e.key.toLowerCase();

    if (key === "w" || e.key === "arrowup") {
        keys.w = true;
    }

    if (key === "a" || e.key === "arrowleft") {
        keys.a = true;
    }

    if (key === "s" || e.key === "arrowdown") {
        keys.s = true;
    }

    if (key === "d" || e.key === "arrowright") {
        keys.d = true;
    }

    if (key === "shift") {
        keys.shift = true;
    }
});

window.addEventListener("keyup", (e) => {

    const key = e.key.toLowerCase();

    if (key === "w" || e.key === "arrowup") {
        keys.w = false;
    }

    if (key === "a" || e.key === "arrowleft") {
        keys.a = false;
    }

    if (key === "s" || e.key === "arrowdown") {
        keys.s = false;
    }

    if (key === "d" || e.key === "arrowright") {
        keys.d = false;
    }

    if (key === "shift") {
        keys.shift = false;
    }
});

// =========================
// MOBILE BUTTON
// =========================

function mobileButton(id, direction) {

    const button = document.getElementById(id);

    if (!button) {
        console.log("Button missing:", id);
        return;
    }

    button.addEventListener("pointerdown", (e) => {

        e.preventDefault();

        keys[direction] = true;

        button.setPointerCapture(e.pointerId);
    });

    button.addEventListener("pointerup", (e) => {

        e.preventDefault();

        keys[direction] = false;
    });

    button.addEventListener("pointercancel", () => {

        keys[direction] = false;
    });
}

// Connect buttons

mobileButton("moveUp", "w");
mobileButton("moveDown", "s");
mobileButton("moveLeft", "a");
mobileButton("moveRight", "d");
mobileButton("runButton", "shift");

// =========================
// PLAYER MOVEMENT
// =========================

function updatePlayer() {

    let speed = 0.12;

    if (keys.shift) {
        speed = 0.24;
    }

    if (keys.w) {
        player.position.z -= speed;
    }

    if (keys.s) {
        player.position.z += speed;
    }

    if (keys.a) {
        player.position.x -= speed;
    }

    if (keys.d) {
        player.position.x += speed;
    }
}

// =========================
// CAMERA
// =========================

function updateCamera() {

    camera.position.set(
        player.position.x,
        player.position.y + 6,
        player.position.z + 10
    );

    camera.lookAt(
        player.position.x,
        player.position.y + 1.5,
        player.position.z
    );
}

// =========================
// STATUS
// =========================

if (status) {
    status.innerText = "PLAYER + CONTROLLER READY";
}

// =========================
// GAME LOOP
// =========================

function animate() {

    requestAnimationFrame(animate);

    updatePlayer();

    updateCamera();

    renderer.render(
        scene,
        camera
    );
}

animate();

// =========================
// RESIZE
// =========================

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
