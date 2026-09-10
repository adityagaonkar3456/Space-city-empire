import { createGame1 } from "./game1.js";

const canvas = document.getElementById("gameCanvas");
const status = document.getElementById("gameStatus");

const game = createGame1(canvas);

const scene = game.scene;
const camera = game.camera;
const renderer = game.renderer;
const player = game.player;

const keys = {
    up: false,
    down: false,
    left: false,
    right: false
};

/* =========================
   MOBILE BUTTONS
========================= */

function connectButton(id, key) {

    const button = document.getElementById(id);

    if (!button) return;

    button.addEventListener("pointerdown", (e) => {
        e.preventDefault();
        keys[key] = true;
    });

    button.addEventListener("pointerup", (e) => {
        e.preventDefault();
        keys[key] = false;
    });

    button.addEventListener("pointercancel", () => {
        keys[key] = false;
    });
}

connectButton("moveUp", "up");
connectButton("moveDown", "down");
connectButton("moveLeft", "left");
connectButton("moveRight", "right");

/* =========================
   KEYBOARD
========================= */

window.addEventListener("keydown", (e) => {

    if (e.key === "w" || e.key === "ArrowUp")
        keys.up = true;

    if (e.key === "s" || e.key === "ArrowDown")
        keys.down = true;

    if (e.key === "a" || e.key === "ArrowLeft")
        keys.left = true;

    if (e.key === "d" || e.key === "ArrowRight")
        keys.right = true;
});

window.addEventListener("keyup", (e) => {

    if (e.key === "w" || e.key === "ArrowUp")
        keys.up = false;

    if (e.key === "s" || e.key === "ArrowDown")
        keys.down = false;

    if (e.key === "a" || e.key === "ArrowLeft")
        keys.left = false;

    if (e.key === "d" || e.key === "ArrowRight")
        keys.right = false;
});

/* =========================
   PLAYER
========================= */

function updatePlayer() {

    const speed = 0.15;

    if (keys.up)
        player.position.z -= speed;

    if (keys.down)
        player.position.z += speed;

    if (keys.left)
        player.position.x -= speed;

    if (keys.right)
        player.position.x += speed;
}

/* =========================
   CAMERA FOLLOW
========================= */

function updateCamera() {

    const targetX = player.position.x;
    const targetY = player.position.y + 6;
    const targetZ = player.position.z + 10;

    camera.position.x +=
        (targetX - camera.position.x) * 0.12;

    camera.position.y +=
        (targetY - camera.position.y) * 0.12;

    camera.position.z +=
        (targetZ - camera.position.z) * 0.12;

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

    renderer.render(scene, camera);
}

status.innerText = "PLAYER READY";

animate();

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
